"use client"

import dynamic from "next/dynamic"
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

export function HomePageClient() {
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
