"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return
    }

    // Check if user dismissed before
    const dismissed = localStorage.getItem("pwa-install-dismissed")
    if (dismissed) {
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after 30 seconds
      setTimeout(() => setShowPrompt(true), 30000)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Service Worker is only needed for offline support and push notifications
    // The manifest.json and meta tags are sufficient for installation

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-install-dismissed", "true")
  }

  if (!showPrompt || !deferredPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:w-96 animate-in slide-in-from-bottom-5">
      <Card className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 backdrop-blur-sm">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Download className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Установить NetNext</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Добавьте приложение на главный экран для быстрого доступа
            </p>

            <div className="flex gap-2">
              <Button onClick={handleInstall} size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Установить
              </Button>
              <Button onClick={handleDismiss} size="sm" variant="ghost" className="text-xs">
                Не сейчас
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
