import type { Metadata } from "next"
import { OrderForm } from "@/components/order/order-form"
import { Sparkles } from "lucide-react"

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
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="container max-w-3xl lg:max-w-4xl relative">
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-3 sm:mb-4">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Оформление заказа
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Заполните форму ниже, выберите подходящий пакет услуг и примените промокод для получения скидки
          </p>
        </div>

        <div className="mb-8 sm:mb-12">
          <OrderForm />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <div className="text-center p-4 rounded-xl bg-muted/50">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-1">100%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Безопасная оплата</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/50">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Поддержка клиентов</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/50">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-1">50+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Успешных проектов</div>
          </div>
        </div>
      </div>
    </div>
  )
}
