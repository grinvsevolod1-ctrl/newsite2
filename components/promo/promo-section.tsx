"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Gift, Sparkles, TrendingUp, Shield, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@supabase/ssr"
import { useLocale } from "@/contexts/locale-context"

export function PromoSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activePromos, setActivePromos] = useState<any[]>([])
  const router = useRouter()
  const { t, locale } = useLocale()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      // Load active promotions
      const { data: promos } = await supabase
        .from("promotions")
        .select("*")
        .eq("is_active", true)
        .gte("valid_until", new Date().toISOString())
        .lte("valid_from", new Date().toISOString())
        .limit(4)

      if (promos && promos.length > 0) {
        setActivePromos(promos)
      } else {
        // Default promos if none in database
        setActivePromos([
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
        ])
      }
    }

    checkAuth()
  }, [])

  const getPromoIcon = (index: number) => {
    const icons = [Gift, Sparkles, TrendingUp, Shield]
    const Icon = icons[index % icons.length]
    return Icon
  }

  const getPromoGradient = (index: number) => {
    const gradients = [
      "from-cyan-500 to-blue-600",
      "from-purple-500 to-pink-600",
      "from-orange-500 to-red-600",
      "from-green-500 to-emerald-600",
    ]
    return gradients[index % gradients.length]
  }

  if (activePromos.length === 0) return null

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-500/5 to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            {locale === "ru" ? "Специальные предложения" : "Special Offers"}
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {isAuthenticated
              ? locale === "ru"
                ? "Эксклюзивные предложения для вас"
                : "Exclusive offers for you"
              : locale === "ru"
                ? "Начните с выгодой"
                : "Start with benefits"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isAuthenticated
              ? locale === "ru"
                ? "Специальные условия для наших клиентов"
                : "Special conditions for our clients"
              : locale === "ru"
                ? "Зарегистрируйтесь и получите дополнительные бонусы"
                : "Register and get additional bonuses"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {activePromos.map((promo, index) => {
            const Icon = getPromoIcon(index)
            const gradient = getPromoGradient(index)

            return (
              <Card
                key={promo.id}
                className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-cyan-500/50"
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
                />

                <div className="relative p-6 space-y-4">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">
                      {promo.discount_type === "percentage" && promo.discount_value > 0
                        ? `${promo.discount_value}% ${locale === "ru" ? "скидка" : "discount"}`
                        : locale === "ru"
                          ? "Бесплатно"
                          : "Free"}
                    </h3>
                    <p className="text-muted-foreground">
                      {locale === "ru" ? promo.description_ru : promo.description_en}
                    </p>
                  </div>

                  {/* Promo code */}
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">{locale === "ru" ? "Промокод:" : "Code:"}</span>
                    <code className="flex-1 font-mono font-bold text-sm">{promo.code}</code>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          {isAuthenticated ? (
            <Button
              size="lg"
              onClick={() => router.push("/order")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white group"
            >
              {locale === "ru" ? "Оформить заказ" : "Place order"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => router.push("/auth")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white group"
              >
                {locale === "ru" ? "Зарегистрироваться" : "Sign up"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/order")}>
                {locale === "ru" ? "Заказать без регистрации" : "Order without registration"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
