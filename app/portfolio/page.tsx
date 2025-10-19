import { createClient } from "@/lib/supabase/server"
import { PortfolioContent } from "@/components/portfolio/portfolio-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio - Our Projects & Case Studies | NetNext",
  description:
    "NetNext Portfolio: 50+ successful projects in web development, mobile apps, Telegram bots, AI solutions. View our work and case studies from clients worldwide.",
  keywords: [
    "development portfolio",
    "web development examples",
    "mobile app portfolio",
    "telegram bot examples",
    "AI projects",
    "case studies",
    "NetNext portfolio",
    "software development showcase",
  ],
  openGraph: {
    title: "Portfolio - Our Projects & Case Studies | NetNext",
    description: "50+ successful projects. View our work and case studies from clients worldwide.",
    url: "https://www.netnext.site/portfolio",
    type: "website",
    images: [
      {
        url: "/og-portfolio.png",
        width: 1200,
        height: 630,
        alt: "NetNext Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "https://www.netnext.site/portfolio",
    languages: {
      ru: "https://www.netnext.site/ru/portfolio",
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
