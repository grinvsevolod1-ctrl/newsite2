import { type NextRequest, NextResponse } from "next/server"
import { requirePermission } from "@/lib/auth/middleware"

export async function GET(request: NextRequest) {
  const authResult = await requirePermission(request, "users:read")
  if (authResult instanceof NextResponse) return authResult

  const { supabase, user, role } = authResult

  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const roleFilter = searchParams.get("role") || ""

    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    if (roleFilter) {
      query = query.eq("role", roleFilter)
    }

    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      users: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("[API] Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
