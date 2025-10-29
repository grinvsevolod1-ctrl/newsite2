import { createServerClient } from "@/lib/supabase/server"

export type AuditAction =
  | "user.created"
  | "user.updated"
  | "user.deleted"
  | "user.role_changed"
  | "order.created"
  | "order.updated"
  | "order.deleted"
  | "project.created"
  | "project.updated"
  | "project.deleted"
  | "ticket.created"
  | "ticket.updated"
  | "ticket.closed"
  | "promo.created"
  | "promo.updated"
  | "promo.deleted"
  | "settings.updated"
  | "auth.login"
  | "auth.logout"
  | "auth.failed"

export interface AuditLogEntry {
  user_id: string
  action: AuditAction
  resource_type: string
  resource_id?: string
  details?: Record<string, any>
  ip_address?: string
  user_agent?: string
}

export async function createAuditLog(entry: AuditLogEntry) {
  try {
    const supabase = await createServerClient()

    const { error } = await supabase.from("audit_logs").insert({
      user_id: entry.user_id,
      action: entry.action,
      resource_type: entry.resource_type,
      resource_id: entry.resource_id,
      details: entry.details,
      ip_address: entry.ip_address,
      user_agent: entry.user_agent,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[Audit Log] Failed to create log:", error)
    }
  } catch (error) {
    console.error("[Audit Log] Error:", error)
  }
}

export async function getAuditLogs(filters?: {
  user_id?: string
  action?: AuditAction
  resource_type?: string
  from_date?: string
  to_date?: string
  limit?: number
}) {
  const supabase = await createServerClient()

  let query = supabase
    .from("audit_logs")
    .select("*, profiles(full_name, email)")
    .order("created_at", { ascending: false })

  if (filters?.user_id) {
    query = query.eq("user_id", filters.user_id)
  }
  if (filters?.action) {
    query = query.eq("action", filters.action)
  }
  if (filters?.resource_type) {
    query = query.eq("resource_type", filters.resource_type)
  }
  if (filters?.from_date) {
    query = query.gte("created_at", filters.from_date)
  }
  if (filters?.to_date) {
    query = query.lte("created_at", filters.to_date)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("[Audit Log] Failed to fetch logs:", error)
    return []
  }

  return data
}

export async function logAuditAction(params: {
  userId: string
  action: string
  entityType: string
  entityId?: string
  changes?: Record<string, any>
  ipAddress?: string
  userAgent?: string
}) {
  const actionMap: Record<string, AuditAction> = {
    create_user: "user.created",
    update_user: "user.updated",
    update_user_role: "user.role_changed",
    delete_user: "user.deleted",
    create_order: "order.created",
    update_order: "order.updated",
    delete_order: "order.deleted",
    create_project: "project.created",
    update_project: "project.updated",
    delete_project: "project.deleted",
    create_ticket: "ticket.created",
    update_ticket: "ticket.updated",
    close_ticket: "ticket.closed",
    create_promo: "promo.created",
    update_promo: "promo.updated",
    delete_promo: "promo.deleted",
    update_settings: "settings.updated",
    login: "auth.login",
    logout: "auth.logout",
    login_failed: "auth.failed",
  }

  const mappedAction = actionMap[params.action] || (params.action as AuditAction)

  await createAuditLog({
    user_id: params.userId,
    action: mappedAction,
    resource_type: params.entityType,
    resource_id: params.entityId,
    details: params.changes,
    ip_address: params.ipAddress,
    user_agent: params.userAgent,
  })
}
