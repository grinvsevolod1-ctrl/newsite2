import { CalculatorContent } from "@/components/calculator/calculator-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Калькулятор стоимости разработки - Рассчитать цену проекта онлайн | NetNext",
  description:
    "Онлайн калькулятор стоимости разработки веб-приложений, мобильных приложений, Telegram ботов, AI решений. Рассчитайте стоимость вашего проекта за 2 минуты.",
  keywords: [
    "калькулятор стоимости разработки",
    "рассчитать стоимость приложения",
    "цена разработки сайта",
    "стоимость мобильного приложения",
    "цена telegram бота",
    "калькулятор веб-разработки",
    "расчет стоимости проекта",
  ],
  openGraph: {
    title: "Калькулятор стоимости разработки | NetNext",
    description: "Рассчитайте стоимость вашего проекта за 2 минуты онлайн",
    url: "https://www.netnext.site/calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://www.netnext.site/calculator",
  },
}

export default function CalculatorPage() {
  return (
    <div className="pt-24">
      <CalculatorContent />
    </div>
  )
}
