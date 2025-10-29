import { type NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/auth/middleware"
import { createAuditLog } from "@/lib/logger/audit-log"
import { z } from "zod"

const roleUpdateSchema = z.object({
  role: z.enum(["admin", "manager", "developer", "freelancer", "client", "customer"]),
})

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await requireRole(request, ["admin"])
  if (authResult instanceof NextResponse) return authResult

  const { supabase, user } = authResult
  const userId = params.id

  if (userId === user.id) {
    return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { role } = roleUpdateSchema.parse(body)

    const { data, error } = await supabase.from("profiles").update({ role }).eq("id", userId).select().single()

    if (error) throw error

    await createAuditLog({
      user_id: user.id,
      action: "user.role_changed",
      resource_type: "user",
      resource_id: userId,
      details: { new_role: role },
    })

    return NextResponse.json({ user: data })
  } catch (error) {
    console.error("[API] Error updating user role:", error)
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 })
  }
}
