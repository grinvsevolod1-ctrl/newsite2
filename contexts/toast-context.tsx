"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { ToastContainer, type Toast, type ToastType } from "@/components/notifications/toast-notification"

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((type: ToastType, title: string, message?: string, duration = 5000) => {
    const id = Math.random().toString(36).substring(7)
    const newToast: Toast = { id, type, title, message, duration }
    setToasts((prev) => [...prev, newToast])
  }, [])

  const success = useCallback((title: string, message?: string) => showToast("success", title, message), [showToast])
  const error = useCallback((title: string, message?: string) => showToast("error", title, message), [showToast])
  const warning = useCallback((title: string, message?: string) => showToast("warning", title, message), [showToast])
  const info = useCallback((title: string, message?: string) => showToast("info", title, message), [showToast])

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}
