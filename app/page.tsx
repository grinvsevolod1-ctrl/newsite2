import type { Metadata } from "next"
import { HomePageClient } from "./home-page-client"

export const metadata: Metadata = {
  title: "Разработка сайтов и приложений в Минске, Беларусь | NetNext - Студия веб-разработки",
  description:
    "Профессиональная разработка сайтов, мобильных приложений, Telegram ботов и AI решений в Минске. 50+ опытных разработчиков. Разработка под ключ для бизнеса в Беларуси и СНГ. ✓ Гарантия качества ✓ Поддержка 24/7 ✓ Цены от 500 BYN",
  keywords: [
    "разработка сайтов Минск",
    "создание сайтов Беларусь",
    "разработка мобильных приложений Минск",
    "веб-студия Минск",
    "разработка под ключ Беларусь",
    "создание интернет-магазина Минск",
    "разработка Telegram ботов Беларусь",
    "AI решения Минск",
    "IT аутсорсинг Минск",
    "веб-разработка РБ",
    "создание сайтов Гомель",
    "разработка приложений Брест",
    "веб-студия Гродно",
    "IT компания Беларусь",
    "NetNext Минск",
    "React разработка Минск",
    "Next.js разработка Беларусь",
    "мобильная разработка iOS Android Минск",
    "разработка SaaS Беларусь",
    "создание MVP Минск",
  ],
  openGraph: {
    title: "NetNext - Разработка сайтов и приложений в Минске, Беларусь",
    description:
      "Профессиональная разработка для бизнеса в Беларуси. 50+ опытных разработчиков. Разработка под ключ. Цены от 500 BYN.",
    url: "https://www.netnext.site",
    type: "website",
    locale: "ru_BY",
    siteName: "NetNext - Студия разработки",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NetNext - Студия разработки в Минске, Беларусь",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetNext - Разработка сайтов и приложений в Минске",
    description: "Профессиональная разработка для бизнеса в Беларуси. 50+ опытных разработчиков.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.netnext.site",
    languages: {
      "ru-BY": "https://www.netnext.site",
      "be-BY": "https://www.netnext.site",
      en: "https://www.netnext.site/en",
    },
  },
}

export default function HomePage() {
  return <HomePageClient />
}
