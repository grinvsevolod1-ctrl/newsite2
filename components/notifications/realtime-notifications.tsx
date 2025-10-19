"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Bell, X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function RealtimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showPanel, setShowPanel] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const supabase = createClient()

    // Subscribe to realtime updates
    const channel = supabase
      .channel("notifications")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, (payload) => {
        console.log("[v0] Realtime notification received:", payload)

        if (payload.eventType === "INSERT") {
          const newNotification: Notification = {
            id: payload.new.id,
            type: payload.new.type || "info",
            title: payload.new.title,
            message: payload.new.message,
            timestamp: new Date(payload.new.created_at),
            read: false,
          }

          setNotifications((prev) => [newNotification, ...prev])
          setUnreadCount((prev) => prev + 1)

          // Show toast notification
          showToast(newNotification)
        }
      })
      .subscribe()

    // Load existing notifications
    loadNotifications()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadNotifications = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)

    if (data) {
      const mapped = data.map((n) => ({
        id: n.id,
        type: n.type || "info",
        title: n.title,
        message: n.message,
        timestamp: new Date(n.created_at),
        read: n.read || false,
      }))
      setNotifications(mapped)
      setUnreadCount(mapped.filter((n) => !n.read).length)
    }
  }

  const showToast = (notification: Notification) => {
    // This would show a toast notification
    console.log("[v0] Showing toast:", notification)
  }

  const markAsRead = async (id: string) => {
    const supabase = createClient()
    await supabase.from("notifications").update({ read: true }).eq("id", id)

    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = async () => {
    const supabase = createClient()
    await supabase.from("notifications").update({ read: true }).eq("read", false)

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <>
      {/* Notification bell button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative rounded-full p-2 transition-colors hover:bg-muted"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 top-full mt-2 w-96 max-h-[500px] overflow-y-auto rounded-2xl border border-primary/20 bg-background shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-background/95 p-4 backdrop-blur-sm">
              <h3 className="font-semibold text-foreground">Уведомления</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-sm text-primary hover:underline">
                  Прочитать все
                </button>
              )}
            </div>

            <div className="divide-y divide-primary/10">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">Нет уведомлений</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn("p-4 transition-colors hover:bg-muted/50", !notification.read && "bg-primary/5")}
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-foreground">{notification.title}</h4>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="shrink-0 text-primary hover:text-primary/80"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {notification.timestamp.toLocaleString("ru-RU")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
