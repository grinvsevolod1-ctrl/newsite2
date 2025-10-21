"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastNotificationProps {
  toast: Toast
  onClose: (id: string) => void
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: "bg-gradient-to-r from-emerald-500/10 to-green-500/10",
    borderColor: "border-emerald-500/50",
    iconColor: "text-emerald-500",
    glowColor: "shadow-emerald-500/20",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-gradient-to-r from-red-500/10 to-rose-500/10",
    borderColor: "border-red-500/50",
    iconColor: "text-red-500",
    glowColor: "shadow-red-500/20",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-gradient-to-r from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/50",
    iconColor: "text-amber-500",
    glowColor: "shadow-amber-500/20",
  },
  info: {
    icon: Info,
    bgColor: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/50",
    iconColor: "text-blue-500",
    glowColor: "shadow-blue-500/20",
  },
}

export function ToastNotification({ toast, onClose }: ToastNotificationProps) {
  const config = toastConfig[toast.type]
  const Icon = config.icon

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onClose(toast.id)
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-xl
        ${config.bgColor} ${config.borderColor} ${config.glowColor}
        shadow-2xl min-w-[320px] max-w-md
      `}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

      <div className="relative p-4 flex items-start gap-3">
        {/* Icon with pulse animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
          className="shrink-0"
        >
          <div className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground mb-1">{toast.title}</h4>
          {toast.message && <p className="text-xs text-muted-foreground leading-relaxed">{toast.message}</p>}
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onClose(toast.id)}
          className="shrink-0 h-6 w-6 rounded-lg hover:bg-background/50"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress bar */}
      {toast.duration && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
          className={`h-1 ${config.iconColor} origin-left`}
          style={{ backgroundColor: "currentColor", opacity: 0.5 }}
        />
      )}
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastNotification toast={toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
