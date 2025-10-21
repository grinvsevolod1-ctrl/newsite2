"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { createBrowserClient } from "@supabase/ssr"

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkNewUser = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Check if user registered in last 24 hours
        const userCreatedAt = new Date(user.created_at)
        const now = new Date()
        const hoursSinceCreation = (now.getTime() - userCreatedAt.getTime()) / (1000 * 60 * 60)

        if (hoursSinceCreation < 24) {
          // Check if popup was already shown
          const popupShown = localStorage.getItem("welcome_popup_shown")
          if (!popupShown) {
            setIsNewUser(true)
            setTimeout(() => setIsOpen(true), 1000)
            localStorage.setItem("welcome_popup_shown", "true")
          }
        }
      }
    }

    checkNewUser()
  }, [])

  if (!isNewUser) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center space-y-6 pt-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-4">
                <Gift className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              Добро пожаловать! <Sparkles className="h-5 w-5 text-yellow-500" />
            </h2>
            <p className="text-muted-foreground">Спасибо за регистрацию! Мы подготовили для вас специальные бонусы</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-lg p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-1.5 mt-0.5">
                  <Gift className="h-4 w-4 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold">15% скидка на первый заказ</p>
                  <p className="text-sm text-muted-foreground">
                    Используйте промокод: <span className="font-mono font-bold text-cyan-600">WELCOME15</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-1.5 mt-0.5">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold">Бесплатная консультация</p>
                  <p className="text-sm text-muted-foreground">30 минут с нашим экспертом</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-1.5 mt-0.5">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold">Бесплатный перенос сайта</p>
                  <p className="text-sm text-muted-foreground">При заказе разработки</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-1.5 mt-0.5">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold">3 месяца бесплатной поддержки</p>
                  <p className="text-sm text-muted-foreground">Техническая поддержка и обновления</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setIsOpen(false)
                router.push("/order")
              }}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Оформить заказ
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="outline" className="flex-1">
              Позже
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">Предложение действительно в течение 7 дней после регистрации</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { WelcomePopup as default }
