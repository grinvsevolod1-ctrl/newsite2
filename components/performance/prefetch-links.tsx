"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const CRITICAL_ROUTES = ["/portfolio", "/calculator", "/contacts", "/careers"]

export function PrefetchLinks() {
  const router = useRouter()

  useEffect(() => {
    const prefetchRoutes = () => {
      CRITICAL_ROUTES.forEach((route) => {
        router.prefetch(route)
      })
    }

    // Delay prefetching to not block initial render
    const timeoutId = setTimeout(prefetchRoutes, 2000)

    return () => clearTimeout(timeoutId)
  }, [router])

  return null
}
