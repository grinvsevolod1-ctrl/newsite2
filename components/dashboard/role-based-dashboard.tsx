"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { UserRole } from "@/lib/permissions"
import AdminPanel from "./admin-panel"
import ManagerPanel from "./manager-panel"
import DeveloperPanel from "./developer-panel"
import FreelancerPanel from "./freelancer-panel"
import ClientPanel from "./client-panel"
import { Loader2 } from "lucide-react"

export default function RoleBasedDashboard() {
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadUserRole() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

          if (profile) {
            setRole(profile.role as UserRole)
          }
        }
      } catch (error) {
        console.error("Error loading user role:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserRole()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!role) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Не удалось загрузить роль пользователя</p>
      </div>
    )
  }

  // Render appropriate dashboard based on role
  switch (role) {
    case "admin":
      return <AdminPanel />
    case "manager":
      return <ManagerPanel />
    case "developer":
      return <DeveloperPanel />
    case "freelancer":
      return <FreelancerPanel />
    case "client":
    case "customer":
      return <ClientPanel isCustomer={role === "customer"} />
    default:
      return <ClientPanel isCustomer={false} />
  }
}
