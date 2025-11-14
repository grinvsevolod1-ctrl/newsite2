"use client";
import dynamic from "next/dynamic"
import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { CTASection } from "@/components/home/cta-section"
import { TrustBadges } from "@/components/ui/trust-badges"

const ServicesSection = dynamic(
  () => import("@/components/home/services-section").then((mod) => ({ default: mod.ServicesSection })),
  {
    loading: () => <div className="min-h-[600px] animate-pulse bg-gradient-to-b from-transparent via-primary/5 to-transparent" />,
  },
)

const AnimatedStats = dynamic(
  () => import("@/components/home/animated-stats").then((mod) => ({ default: mod.AnimatedStats })),
  {
    loading: () => <div className="min-h-[400px] animate-pulse bg-gradient-to-b from-transparent via-primary/5 to-transparent" />,
  },
)

const TechnologiesSection = dynamic(
  () => import("@/components/home/technologies-section").then((mod) => ({ default: mod.TechnologiesSection })),
  {
    loading: () => <div className="min-h-[500px] animate-pulse bg-gradient-to-b from-transparent via-primary/5 to-transparent" />,
  },
)

const PromoSection = dynamic(
  () => import("@/components/promo/promo-section").then((mod) => ({ default: mod.PromoSection })),
  {
    loading: () => <div className="min-h-[700px] animate-pulse bg-gradient-to-b from-transparent via-primary/5 to-transparent" />,
    ssr: false,
  },
)

const ReviewsCarousel = dynamic(
  () => import("@/components/reviews/reviews-carousel").then((mod) => ({ default: mod.ReviewsCarousel })),
  {
    loading: () => <div className="min-h-[500px] animate-pulse bg-gradient-to-b from-transparent via-primary/5 to-transparent" />,
    ssr: false,
  },
)

const WelcomePopup = dynamic(
  () => import("@/components/promo/welcome-popup").then((mod) => ({ default: mod.WelcomePopup })),
  {
    ssr: false,
  },
)

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
  return (
    <div className="flex flex-col relative">
      <HeroSection />
      
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      <ServicesSection />
      <AnimatedStats />
      <TechnologiesSection />
      <PromoSection />
      <ReviewsCarousel />
      <CTASection />
      <WelcomePopup />
    </div>
  )
}
