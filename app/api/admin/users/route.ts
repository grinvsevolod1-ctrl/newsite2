import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { requireAuth, requireRole } from "@/lib/auth/middleware"
import { logAuditAction } from "@/lib/logger/audit-log"
import { z } from "zod"

const updateUserSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["admin", "manager", "developer", "freelancer", "client", "customer"]),
  full_name: z.string().optional(),
  phone: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const roleCheck = await requireRole(authResult.user.id, ["admin", "manager"])
    if (!roleCheck.success) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""

    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    if (role && role !== "all") {
      query = query.eq("role", role)
    }

    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      users: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error: any) {
    console.error("[v0] Error fetching users:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const roleCheck = await requireRole(authResult.user.id, ["admin"])
    if (!roleCheck.success) {
      return NextResponse.json({ error: "Only admins can update user roles" }, { status: 403 })
    }

    const body = await request.json()
    const validated = updateUserSchema.parse(body)

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("profiles")
      .update({
        role: validated.role,
        ...(validated.full_name && { full_name: validated.full_name }),
        ...(validated.phone && { phone: validated.phone }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", validated.userId)
      .select()
      .single()

    if (error) throw error

    await logAuditAction({
      userId: authResult.user.id,
      action: "update_user_role",
      entityType: "user",
      entityId: validated.userId,
      changes: { role: validated.role },
    })

    return NextResponse.json({ user: data })
  } catch (error: any) {
    console.error("[v0] Error updating user:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
