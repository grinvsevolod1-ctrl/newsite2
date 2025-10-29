import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth/middleware"
import { orderCreateSchema } from "@/lib/validation/schemas"
import { createAuditLog } from "@/lib/logger/audit-log"

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request)
  if (authResult instanceof NextResponse) return authResult

  const { supabase, user } = authResult

  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status") || ""

    // Check if user has permission to view all orders
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    let query = supabase
      .from("orders")
      .select("*, profiles(full_name, email)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    // Non-admin users can only see their own orders
    if (profile?.role !== "admin" && profile?.role !== "manager") {
      query = query.eq("user_id", user.id)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      orders: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("[API] Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request)
  if (authResult instanceof NextResponse) return authResult

  const { supabase, user } = authResult

  try {
    const body = await request.json()
    const validatedData = orderCreateSchema.parse(body)

    const { data, error } = await supabase
      .from("orders")
      .insert({
        ...validatedData,
        user_id: user.id,
        status: "pending",
      })
      .select()
      .single()

    if (error) throw error

    await createAuditLog({
      user_id: user.id,
      action: "order.created",
      resource_type: "order",
      resource_id: data.id,
      details: validatedData,
    })

    return NextResponse.json({ order: data }, { status: 201 })
  } catch (error) {
    console.error("[API] Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
