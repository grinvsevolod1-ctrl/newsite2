export type UserRole = "admin" | "manager" | "developer" | "freelancer" | "client" | "customer"

export type Permission =
  | "users:read"
  | "users:write"
  | "users:delete"
  | "orders:read"
  | "orders:write"
  | "orders:delete"
  | "projects:read"
  | "projects:write"
  | "projects:delete"
  | "tickets:read"
  | "tickets:write"
  | "tickets:delete"
  | "analytics:read"
  | "settings:write"
  | "promotions:write"

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "users:read",
    "users:write",
    "users:delete",
    "orders:read",
    "orders:write",
    "orders:delete",
    "projects:read",
    "projects:write",
    "projects:delete",
    "tickets:read",
    "tickets:write",
    "tickets:delete",
    "analytics:read",
    "settings:write",
    "promotions:write",
  ],
  manager: [
    "users:read",
    "orders:read",
    "orders:write",
    "projects:read",
    "projects:write",
    "tickets:read",
    "tickets:write",
    "analytics:read",
  ],
  developer: ["projects:read", "projects:write", "tickets:read", "tickets:write"],
  freelancer: ["projects:read", "tickets:read", "tickets:write"],
  client: ["orders:read", "projects:read", "tickets:read", "tickets:write"],
  customer: ["orders:read", "tickets:read", "tickets:write"],
}

export function hasPermission(role: UserRole | null, permission: Permission): boolean {
  if (!role) return false
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: UserRole | null, permissions: Permission[]): boolean {
  if (!role) return false
  return permissions.some((permission) => hasPermission(role, permission))
}

export function hasAllPermissions(role: UserRole | null, permissions: Permission[]): boolean {
  if (!role) return false
  return permissions.every((permission) => hasPermission(role, permission))
}
