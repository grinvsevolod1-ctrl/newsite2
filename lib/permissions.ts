export type UserRole = "admin" | "manager" | "developer" | "freelancer" | "client" | "customer"

export type Permission =
  | "manage_users"
  | "manage_orders"
  | "manage_payments"
  | "manage_promotions"
  | "view_analytics"
  | "assign_roles"
  | "manage_projects"
  | "assign_tasks"
  | "view_projects"
  | "update_tasks"
  | "view_orders"
  | "view_available_projects"
  | "apply_to_projects"
  | "create_orders"
  | "view_own_orders"
  | "make_payments"
  | "priority_support"
  | "view_discounts"

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "manage_users",
    "manage_orders",
    "manage_payments",
    "manage_promotions",
    "view_analytics",
    "assign_roles",
    "manage_projects",
    "assign_tasks",
    "view_projects",
    "update_tasks",
    "view_orders",
    "create_orders",
    "view_own_orders",
    "make_payments",
  ],
  manager: ["manage_orders", "view_analytics", "manage_projects", "assign_tasks", "view_projects", "view_orders"],
  developer: ["view_projects", "update_tasks", "view_orders"],
  freelancer: ["view_available_projects", "apply_to_projects", "update_tasks"],
  client: ["create_orders", "view_own_orders", "make_payments"],
  customer: ["create_orders", "view_own_orders", "make_payments", "priority_support", "view_discounts"],
}

export const ROLE_LABELS: Record<UserRole, { ru: string; en: string }> = {
  admin: { ru: "Администратор", en: "Administrator" },
  manager: { ru: "Менеджер", en: "Manager" },
  developer: { ru: "Штатный программист", en: "Staff Developer" },
  freelancer: { ru: "Фрилансер", en: "Freelancer" },
  client: { ru: "Клиент", en: "Client" },
  customer: { ru: "Заказчик", en: "Customer" },
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function canAccessAdminPanel(role: UserRole): boolean {
  return role === "admin" || role === "manager"
}

export function canManageUsers(role: UserRole): boolean {
  return hasPermission(role, "manage_users")
}

export function canManageOrders(role: UserRole): boolean {
  return hasPermission(role, "manage_orders")
}

export function canViewAnalytics(role: UserRole): boolean {
  return hasPermission(role, "view_analytics")
}
