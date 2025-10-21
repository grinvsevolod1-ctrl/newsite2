"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Gift, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/contexts/locale-context"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { locale } = useLocale()

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    if (!hasSeenWelcome) {
      setTimeout(() => setIsOpen(true), 2000)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem("hasSeenWelcome", "true")
    setIsOpen(false)
  }

  const content = {
    ru: {
      title: "Добро пожаловать в NetNext!",
      subtitle: "Специальное предложение для новых клиентов",
      discount: "10% скидка",
      discountDesc: "на первый проект",
      free: "Бесплатно",
      freeDesc: "3 месяца обслуживания",
      bonus: "Бонус",
      bonusDesc: "Консультация в подарок",
      cta: "Зарегистрироваться и получить",
      later: "Может быть позже",
      promo: "Промокод: FIRST10",
    },
    en: {
      title: "Welcome to NetNext!",
      subtitle: "Special offer for new clients",
      discount: "10% discount",
      discountDesc: "on first project",
      free: "Free",
      freeDesc: "3 months maintenance",
      bonus: "Bonus",
      bonusDesc: "Free consultation",
      cta: "Sign up and get",
      later: "Maybe later",
      promo: "Promo code: FIRST10",
    },
  }

  const t = content[locale]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-primary/20">
        <div className="relative bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

          <DialogHeader className="relative z-10 space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Sparkles className="w-16 h-16 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              </div>
            </div>

            <DialogTitle className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t.title}
            </DialogTitle>

            <DialogDescription className="text-center text-base text-muted-foreground">{t.subtitle}</DialogDescription>
          </DialogHeader>

          <div className="relative z-10 mt-6 space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t.discount}</p>
                  <p className="text-xs text-muted-foreground">{t.discountDesc}</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  -10%
                </Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t.free}</p>
                  <p className="text-xs text-muted-foreground">{t.freeDesc}</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  3M
                </Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t.bonus}</p>
                  <p className="text-xs text-muted-foreground">{t.bonusDesc}</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-sm font-mono font-semibold text-primary">{t.promo}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button asChild className="flex-1 h-11" size="lg">
                <Link href="/auth" onClick={handleClose}>
                  {t.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="ghost" onClick={handleClose} className="h-11">
                {t.later}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
