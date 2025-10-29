"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import useSWR from "swr"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  link: string | null
  is_read: boolean
  created_at: string
}

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClient()

  const fetcher = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch notifications")
    const data = await response.json()
    return data.notifications
  }

  const {
    data: notifications,
    error,
    mutate,
  } = useSWR<Notification[]>("/api/notifications", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  })

  useEffect(() => {
    if (notifications) {
      setUnreadCount(notifications.filter((n) => !n.is_read).length)
    }
  }, [notifications])

  useEffect(() => {
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          mutate()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, mutate])

  const markAsRead = async (notificationIds: string[]) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds }),
      })
      mutate()
    } catch (error) {
      console.error("[v0] Error marking notifications as read:", error)
    }
  }

  const markAllAsRead = async () => {
    if (!notifications) return
    const unreadIds = notifications.filter((n) => !n.is_read).map((n) => n.id)
    if (unreadIds.length > 0) {
      await markAsRead(unreadIds)
    }
  }

  return {
    notifications: notifications || [],
    unreadCount,
    isLoading: !notifications && !error,
    error,
    markAsRead,
    markAllAsRead,
    refresh: mutate,
  }
}
