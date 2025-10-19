import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { AnimatedStats } from "@/components/home/animated-stats"
import { TechnologiesSection } from "@/components/home/technologies-section"
import { ReviewsCarousel } from "@/components/reviews/reviews-carousel"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col relative">
      <HeroSection />
      <ServicesSection />
      <AnimatedStats />
      <TechnologiesSection />
      <ReviewsCarousel />
      <CTASection />
    </div>
  )
}
