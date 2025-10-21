import { createClient } from "@supabase/supabase-js"

// Admin client that bypasses RLS using service_role key
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Helper function to check if user is admin
export async function isUserAdmin(userId: string): Promise<boolean> {
  const adminClient = createAdminClient()

  const { data, error } = await adminClient.from("profiles").select("role").eq("id", userId).single()

  if (error || !data) {
    return false
  }

  return data.role === "admin"
}

// Helper function to get user role
export async function getUserRole(userId: string): Promise<string | null> {
  const adminClient = createAdminClient()

  const { data, error } = await adminClient.from("profiles").select("role").eq("id", userId).single()

  if (error || !data) {
    return null
  }

  return data.role
}
