"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { CTASection } from "@/components/home/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";

const ServicesSection = dynamic(
  () => import("@/components/home/services-section").then((mod) => ({ default: mod.ServicesSection })),
  {
    loading: () => (
      <div className="min-h-[600px] animate-pulse bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    ),
  }
);

const AnimatedStats = dynamic(
  () => import("@/components/home/animated-stats").then((mod) => ({ default: mod.AnimatedStats })),
  {
    loading: () => (
      <div className="min-h-[400px] animate-pulse bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    ),
  }
);

const TechnologiesSection = dynamic(
  () => import("@/components/home/technologies-section").then((mod) => ({ default: mod.TechnologiesSection })),
  {
    loading: () => (
      <div className="min-h-[500px] animate-pulse bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    ),
  }
);

const PromoSection = dynamic(
  () => import("@/components/promo/promo-section").then((mod) => ({ default: mod.PromoSection })),
  { ssr: false }
);

const ReviewsCarousel = dynamic(
  () => import("@/components/reviews/reviews-carousel").then((mod) => ({ default: mod.ReviewsCarousel })),
  { ssr: false }
);

const WelcomePopup = dynamic(
  () => import("@/components/promo/welcome-popup").then((mod) => ({ default: mod.WelcomePopup })),
  { ssr: false }
);

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
  );
}
