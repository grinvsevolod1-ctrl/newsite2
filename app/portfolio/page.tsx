import { createClient } from "@/lib/supabase/server"
import { PortfolioContent } from "@/components/portfolio/portfolio-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Портфолио - Наши Проекты и Кейсы разработки в Минске | NetNext",
  description:
    "Портфолио NetNext: более 50 успешных проектов в веб-разработке, мобильных приложениях, Telegram-ботах, AI решениях для бизнеса в Беларуси. Посмотрите наши работы и кейсы клиентов из Минска, Гомеля, Бреста, Гродно.",
  keywords: [
    "портфолио разработки Минск",
    "примеры веб-разработки Беларусь",
    "портфолио мобильных приложений Минск",
    "примеры telegram ботов Беларусь",
    "AI проекты Минск",
    "кейсы разработки РБ",
    "портфолио NetNext Минск",
    "примеры разработки ПО Беларусь",
    "веб-студия портфолио Минск",
    "разработка сайтов примеры Беларусь",
    "успешные IT проекты Минск",
    "кейсы веб-разработки Беларусь",
  ],
  openGraph: {
    title: "Портфолио - Наши Проекты и Кейсы | NetNext Минск",
    description: "Более 50 успешных проектов для бизнеса в Беларуси. Посмотрите наши работы и кейсы клиентов.",
    url: "https://www.netnext.site/portfolio",
    type: "website",
    locale: "ru_BY",
    images: [
      {
        url: "/og-portfolio.png",
        width: 1200,
        height: 630,
        alt: "Портфолио NetNext - Проекты в Минске, Беларусь",
      },
    ],
  },
  alternates: {
    canonical: "https://www.netnext.site/portfolio",
    languages: {
      "ru-BY": "https://www.netnext.site/portfolio",
      en: "https://www.netnext.site/en/portfolio",
    },
  },
}

export default async function PortfolioPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })

  return <PortfolioContent projects={projects || []} />
}
