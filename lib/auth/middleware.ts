import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { hasPermission, type Permission, type UserRole } from "./permissions"

export async function requireAuth(request: NextRequest) {
  const supabase = await createServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return { user, supabase }
}

export async function requireRole(request: NextRequest, allowedRoles: UserRole[]) {
  const authResult = await requireAuth(request)
  if (authResult instanceof NextResponse) return authResult

  const { user, supabase } = authResult

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || !allowedRoles.includes(profile.role as UserRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return { user, supabase, role: profile.role as UserRole }
}

export async function requirePermission(request: NextRequest, permission: Permission) {
  const authResult = await requireAuth(request)
  if (authResult instanceof NextResponse) return authResult

  const { user, supabase } = authResult

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || !hasPermission(profile.role as UserRole, permission)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return { user, supabase, role: profile.role as UserRole }
}
