import { CalculatorContent } from "@/components/calculator/calculator-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Калькулятор стоимости разработки сайтов и приложений в Минске | NetNext",
  description:
    "Онлайн калькулятор стоимости разработки сайтов, веб-приложений, мобильных приложений, Telegram ботов, AI решений в Беларуси. Рассчитайте стоимость вашего проекта за 2 минуты. Цены от 300 BYN. Прозрачное ценообразование для бизнеса в Минске.",
  keywords: [
    "калькулятор стоимости разработки Минск",
    "рассчитать стоимость приложения Беларусь",
    "цена разработки сайта Минск",
    "стоимость мобильного приложения Беларусь",
    "цена telegram бота Минск",
    "калькулятор веб-разработки РБ",
    "расчет стоимости проекта Минск",
    "сколько стоит разработка сайта Беларусь",
    "цены на разработку Минск",
    "стоимость создания приложения Беларусь",
    "калькулятор разработки BYN",
  ],
  openGraph: {
    title: "Калькулятор стоимости разработки | NetNext Минск",
    description: "Рассчитайте стоимость вашего проекта за 2 минуты онлайн. Цены от 300 BYN.",
    url: "https://www.netnext.site/calculator",
    type: "website",
    locale: "ru_BY",
  },
  alternates: {
    canonical: "https://www.netnext.site/calculator",
    languages: {
      "ru-BY": "https://www.netnext.site/calculator",
      en: "https://www.netnext.site/en/calculator",
    },
  },
}

export default function CalculatorPage() {
  return (
    <div className="pt-24">
      <CalculatorContent />
    </div>
  )
}
