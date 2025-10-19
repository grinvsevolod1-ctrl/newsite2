"use client"

import { Card } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/translations"
import { Globe, Smartphone, Bot, Brain, Monitor, Palette, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { TiltCard } from "@/components/effects/tilt-card"
import { ScrollReveal } from "@/components/effects/scroll-reveal"

export function ServicesSection() {
  const { locale } = useLocale()
  const t = translations[locale]

  const services = [
    {
      icon: Globe,
      title: t.services.web,
      description: t.services.webDesc,
      category: "web",
    },
    {
      icon: Smartphone,
      title: t.services.mobile,
      description: t.services.mobileDesc,
      category: "mobile",
    },
    {
      icon: Bot,
      title: t.services.bot,
      description: t.services.botDesc,
      category: "bot",
    },
    {
      icon: Brain,
      title: t.services.ai,
      description: t.services.aiDesc,
      category: "ai",
    },
    {
      icon: Monitor,
      title: t.services.desktop,
      description: t.services.desktopDesc,
      category: "desktop",
    },
    {
      icon: Palette,
      title: t.services.design,
      description: t.services.designDesc,
      category: "design",
    },
  ]

  return (
    <section className="py-16 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 gradient-text px-2">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            {locale === "ru"
              ? "Полный спектр услуг для цифровой трансформации вашего бизнеса"
              : "Full range of services for your business digital transformation"}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100} direction="up">
              <TiltCard>
                <Link href={`/portfolio?category=${service.category}`} className="block">
                  <Card className="group relative overflow-hidden bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 p-6 sm:p-7 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.4),0_0_60px_rgba(34,211,238,0.2)] cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl sm:rounded-2xl bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/30 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <service.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                        {service.description}
                      </p>
                      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </Card>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
