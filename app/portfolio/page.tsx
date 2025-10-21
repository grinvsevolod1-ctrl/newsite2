import { createClient } from "@/lib/supabase/server"
import { PortfolioContent } from "@/components/portfolio/portfolio-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Портфолио - Наши Проекты и Кейсы | NetNext",
  description:
    "Портфолио NetNext: более 50 успешных проектов в веб-разработке, мобильных приложениях, Telegram-ботах, AI решениях. Посмотрите наши работы и кейсы клиентов со всего мира.",
  keywords: [
    "портфолио разработки",
    "примеры веб-разработки",
    "портфолио мобильных приложений",
    "примеры telegram ботов",
    "AI проекты",
    "кейсы",
    "портфолио NetNext",
    "примеры разработки ПО",
    "веб-студия портфолио",
    "разработка сайтов примеры",
  ],
  openGraph: {
    title: "Портфолио - Наши Проекты и Кейсы | NetNext",
    description: "Более 50 успешных проектов. Посмотрите наши работы и кейсы клиентов со всего мира.",
    url: "https://www.netnext.site/portfolio",
    type: "website",
    images: [
      {
        url: "/og-portfolio.png",
        width: 1200,
        height: 630,
        alt: "Портфолио NetNext",
      },
    ],
  },
  alternates: {
    canonical: "https://www.netnext.site/portfolio",
    languages: {
      ru: "https://www.netnext.site/portfolio",
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
