import dynamic from "next/dynamic"
import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { AnimatedStats } from "@/components/home/animated-stats"
import { TechnologiesSection } from "@/components/home/technologies-section"
const PromoSection = dynamic(
  () => import("@/components/promo/promo-section").then((mod) => ({ default: mod.PromoSection })),
  {
    loading: () => <div className="py-20 text-center">Loading...</div>,
    ssr: true,
  },
)
const ReviewsCarousel = dynamic(
  () => import("@/components/reviews/reviews-carousel").then((mod) => ({ default: mod.ReviewsCarousel })),
  {
    loading: () => <div className="py-20 text-center">Loading...</div>,
    ssr: true,
  },
)
import { CTASection } from "@/components/home/cta-section"
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
