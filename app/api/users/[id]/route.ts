import { type NextRequest, NextResponse } from "next/server"
import { requirePermission } from "@/lib/auth/middleware"
import { userUpdateSchema } from "@/lib/validation/schemas"
import { createAuditLog } from "@/lib/logger/audit-log"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await requirePermission(request, "users:read")
  if (authResult instanceof NextResponse) return authResult

  const { supabase } = authResult
  const userId = params.id

  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) throw error
    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: data })
  } catch (error) {
    console.error("[API] Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await requirePermission(request, "users:write")
  if (authResult instanceof NextResponse) return authResult

  const { supabase, user } = authResult
  const userId = params.id

  try {
    const body = await request.json()
    const validatedData = userUpdateSchema.parse(body)

    const { data, error } = await supabase.from("profiles").update(validatedData).eq("id", userId).select().single()

    if (error) throw error

    await createAuditLog({
      user_id: user.id,
      action: "user.updated",
      resource_type: "user",
      resource_id: userId,
      details: validatedData,
    })

    return NextResponse.json({ user: data })
  } catch (error) {
    console.error("[API] Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await requirePermission(request, "users:delete")
  if (authResult instanceof NextResponse) return authResult

  const { supabase, user } = authResult
  const userId = params.id

  if (userId === user.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 })
  }

  try {
    const { error } = await supabase.from("profiles").delete().eq("id", userId)

    if (error) throw error

    await createAuditLog({
      user_id: user.id,
      action: "user.deleted",
      resource_type: "user",
      resource_id: userId,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[API] Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
