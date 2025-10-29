"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useNotifications } from "@/hooks/use-notifications"
import { useRouter } from "next/navigation"
import { useLocale } from "@/contexts/locale-context"

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const router = useRouter()
  const { locale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const handleNotificationClick = async (notification: any) => {
    await markAsRead([notification.id])
    if (notification.link) {
      router.push(notification.link)
    }
    setIsOpen(false)
  }

  const content = {
    ru: {
      notifications: "Уведомления",
      markAllRead: "Отметить все как прочитанные",
      noNotifications: "Нет уведомлений",
    },
    en: {
      notifications: "Notifications",
      markAllRead: "Mark all as read",
      noNotifications: "No notifications",
    },
  }

  const t = content[locale]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>{t.notifications}</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-1 text-xs">
              {t.markAllRead}
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">{t.noNotifications}</div>
          ) : (
            notifications.slice(0, 10).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`flex flex-col items-start p-3 cursor-pointer ${!notification.is_read ? "bg-accent/50" : ""}`}
              >
                <div className="flex items-start justify-between w-full">
                  <span className="font-medium text-sm">{notification.title}</span>
                  {!notification.is_read && <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />}
                </div>
                <span className="text-xs text-muted-foreground mt-1">{notification.message}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
