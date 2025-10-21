import type { Metadata } from "next"
import { OrderForm } from "@/components/order/order-form"

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
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Оформление заказа</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Заполните форму и мы свяжемся с вами в ближайшее время
          </p>
        </div>

        <OrderForm />
      </div>
    </div>
  )
}
