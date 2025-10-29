import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { requireAuth, requireRole } from "@/lib/auth/middleware"

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
    const period = searchParams.get("period") || "30d"

    const now = new Date()
    const startDate = new Date()

    switch (period) {
      case "7d":
        startDate.setDate(now.getDate() - 7)
        break
      case "30d":
        startDate.setDate(now.getDate() - 30)
        break
      case "90d":
        startDate.setDate(now.getDate() - 90)
        break
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1)
        break
    }

    const [usersResult, ordersResult, revenueResult, ticketsResult] = await Promise.all([
      supabase.from("profiles").select("created_at", { count: "exact" }).gte("created_at", startDate.toISOString()),
      supabase.from("orders").select("*", { count: "exact" }).gte("created_at", startDate.toISOString()),
      supabase
        .from("orders")
        .select("final_price, created_at")
        .eq("payment_status", "paid")
        .gte("created_at", startDate.toISOString()),
      supabase
        .from("support_tickets")
        .select("status, created_at", { count: "exact" })
        .gte("created_at", startDate.toISOString()),
    ])

    const newUsers = usersResult.count || 0
    const totalOrders = ordersResult.count || 0
    const revenue = revenueResult.data?.reduce((sum, order) => sum + Number(order.final_price || 0), 0) || 0
    const openTickets = ticketsResult.data?.filter((t) => t.status === "open").length || 0

    const revenueByDay = revenueResult.data?.reduce(
      (acc, order) => {
        const date = new Date(order.created_at).toISOString().split("T")[0]
        acc[date] = (acc[date] || 0) + Number(order.final_price || 0)
        return acc
      },
      {} as Record<string, number>,
    )

    const ordersByStatus = ordersResult.data?.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return NextResponse.json({
      period,
      stats: {
        newUsers,
        totalOrders,
        revenue: revenue / 100,
        openTickets,
      },
      charts: {
        revenueByDay,
        ordersByStatus,
      },
    })
  } catch (error: any) {
    console.error("[v0] Error fetching analytics:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
