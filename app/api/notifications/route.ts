import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/auth/middleware"

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get("unread") === "true"

    let query = supabase
      .from("notifications")
      .select("*")
      .eq("user_id", authResult.user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    if (unreadOnly) {
      query = query.eq("is_read", false)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ notifications: data })
  } catch (error: any) {
    console.error("[v0] Error fetching notifications:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { notificationIds } = await request.json()

    const supabase = createServerClient()
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .in("id", notificationIds)
      .eq("user_id", authResult.user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error marking notifications as read:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { userId, title, message, type, link } = await request.json()

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: userId,
          title,
          message,
          type: type || "info",
          link: link || null,
          is_read: false,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ notification: data })
  } catch (error: any) {
    console.error("[v0] Error creating notification:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
