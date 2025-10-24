import type { Metadata } from "next"
import { OrderForm } from "@/components/order/order-form"
import { Sparkles, Shield, Clock, Headphones, Award, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Оформление заказа | NetNext Studio",
  description:
    "Оформите заказ на разработку сайта, веб-приложения или мобильного приложения с применением скидок и промокодов",
  keywords: "заказать сайт, разработка сайта, веб-разработка, заказ, оплата онлайн, промокод, скидка",
  openGraph: {
    title: "Оформление заказа | NetNext Studio",
    description: "Оформите заказ на разработку с применением скидок и промокодов",
    type: "website",
  },
}

export const dynamic = "force-dynamic"

export default function OrderPage() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="container max-w-7xl relative">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 mb-4 shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Оформление заказа
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Заполните форму, выберите подходящий пакет и получите скидку по промокоду
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Main form */}
          <div className="lg:col-span-2">
            <OrderForm />
          </div>

          {/* Sidebar with benefits - hidden on mobile */}
          <div className="hidden lg:block space-y-6">
            <Card className="border-2 border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-600" />
                    Почему выбирают нас
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">Быстрая разработка</div>
                        <div className="text-xs text-muted-foreground">Сроки от 7 дней</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Headphones className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">Поддержка 24/7</div>
                        <div className="text-xs text-muted-foreground">Всегда на связи</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <Award className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">Гарантия качества</div>
                        <div className="text-xs text-muted-foreground">100% возврат средств</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">Современные технологии</div>
                        <div className="text-xs text-muted-foreground">React, Next.js, Node.js</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Активные промокоды:</div>
                  <div className="space-y-2">
                    <div className="text-xs bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 px-3 py-2 rounded-lg font-mono">
                      WELCOME15 - 15% скидка
                    </div>
                    <div className="text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg font-mono">
                      NEWYEAR2025 - 20% скидка
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <Card className="border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Безопасная оплата</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Поддержка</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors col-span-2 sm:col-span-1">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Успешных проектов</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
