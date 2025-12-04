"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Gift, Sparkles, TrendingUp, Shield, ArrowRight, Check, Zap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/contexts/locale-context"
import { usePerformance } from "@/contexts/performance-context"

export function PromoSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { locale } = useLocale()
  const { performanceMode } = usePerformance()

  // 🔥 Промо теперь всегда берутся из кода
  const activePromos = [
    {
      id: 1,
      code: "WELCOME15",
      discount_type: "percentage",
      discount_value: 15,
      description_ru: "Скидка на первый заказ",
      description_en: "Discount on first order",
    },
    {
      id: 2,
      code: "TRANSFER2024",
      discount_type: "fixed",
      discount_value: 0,
      description_ru: "Бесплатный перенос сайта",
      description_en: "Free website migration",
    },
    {
      id: 3,
      code: "SUPPORT3M",
      discount_type: "fixed",
      discount_value: 0,
      description_ru: "3 месяца бесплатной поддержки",
      description_en: "3 months free support",
    },
    {
      id: 4,
      code: "h0mnp5xdoz9g79bf",
      discount_type: "percentage",
      discount_value: 10,
      description_ru: "Скидка на рекламу в яндексе",
      description_en: "Discount on Yandex Direct",
    },
    {
      id: 5,
      code: "NEWYEAR2025",
      discount_type: "percentage",
      discount_value: 20,
      description_ru: "Новогодняя акция 2025",
      description_en: "New Year 2025 promotion",
    },
    {
      id: 6,
      code: "AUDIT2025",
      discount_type: "fixed",
      discount_value: 0,
      description_ru: "Бесплатный аудит сайта и консультация",
      description_en: "Free website audit and consultation",
    },
  ]

  const getPromoIcon = (index: number) => {
    const icons = [Gift, Sparkles, TrendingUp, Shield, Zap, Award]
    const Icon = icons[index % icons.length]
    return Icon
  }

  const getPromoGradient = (index: number) => {
    const gradients = [
      "from-cyan-500 to-blue-600",
      "from-purple-500 to-pink-600",
      "from-orange-500 to-red-600",
      "from-green-500 to-emerald-600",
      "from-yellow-500 to-orange-600",
      "from-indigo-500 to-purple-600",
    ]
    return gradients[index % gradients.length]
  }

  const shouldAnimate = performanceMode !== "low"

  if (activePromos.length === 0) return null

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      {shouldAnimate && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-500/5 to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </>
      )}

      <div className="container relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <Badge className="mb-4 sm:mb-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 text-xs sm:text-sm px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            {locale === "ru" ? "Специальные предложения" : "Special Offers"}
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 px-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {isAuthenticated
              ? locale === "ru"
                ? "Эксклюзивные предложения для вас"
                : "Exclusive offers for you"
              : locale === "ru"
                ? "Начните с выгодой"
                : "Start with benefits"}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
            {isAuthenticated
              ? locale === "ru"
                ? "Специальные условия для наших клиентов"
                : "Special conditions for our clients"
              : locale === "ru"
                ? "Зарегистрируйтесь и получите дополнительные бонусы"
                : "Register and get additional bonuses"}
          </p>
        </div>

        <div className="mb-10 sm:mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {activePromos.map((promo, index) => {
              const Icon = getPromoIcon(index)
              const gradient = getPromoGradient(index)

              return (
                <Card
                  key={promo.id}
                  className={`relative overflow-hidden group border-2 h-full flex flex-col ${
                    shouldAnimate
                      ? "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-cyan-500/50"
                      : "shadow-lg"
                  }`}
                >
                  {shouldAnimate && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
                    />
                  )}

                  <div className="relative p-6 sm:p-7 space-y-4 sm:space-y-5 flex-1 flex flex-col">
                    <div
                      className={`inline-flex p-3 sm:p-3.5 rounded-xl bg-gradient-to-br ${gradient} w-fit shadow-lg`}
                    >
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>

                    <div className="space-y-2.5 flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                        {promo.discount_type === "percentage" && promo.discount_value > 0
                          ? `${promo.discount_value}% ${locale === "ru" ? "скидка" : "discount"}`
                          : locale === "ru"
                            ? "Бесплатно"
                            : "Free"}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed min-h-[2.5rem]">
                        {locale === "ru" ? promo.description_ru : promo.description_en}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-muted/50 rounded-lg mt-auto border border-border/50">
                      <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap font-medium">
                        {locale === "ru" ? "Промокод:" : "Code:"}
                      </span>
                      <code className="flex-1 font-mono font-bold text-sm sm:text-base truncate">{promo.code}</code>
                      <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-green-500 flex-shrink-0" />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center items-center px-4">
          {isAuthenticated ? (
            <Button
              size="lg"
              onClick={() => router.push("/order")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white group w-full sm:w-auto text-base sm:text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              {locale === "ru" ? "Оформить заказ" : "Place order"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto max-w-2xl">
              <Button
                size="lg"
                onClick={() => router.push("/auth")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white group w-full sm:w-auto text-base sm:text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                {locale === "ru" ? "Зарегистрироваться" : "Sign up"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/order")}
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-6 border-2 hover:bg-muted transition-all"
              >
                {locale === "ru" ? "Заказать" : "Order"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}