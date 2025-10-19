"use client"

import { useLocale } from "@/contexts/locale-context"
import { Code, Users, Award, Zap } from "lucide-react"

export function StatsSection() {
  const { locale } = useLocale()

  const stats = [
    {
      icon: Users,
      value: "50+",
      label: locale === "ru" ? "Профессиональных разработчиков" : "Professional Developers",
    },
    {
      icon: Code,
      value: "200+",
      label: locale === "ru" ? "Успешных проектов" : "Successful Projects",
    },
    {
      icon: Award,
      value: "15+",
      label: locale === "ru" ? "Стран по всему миру" : "Countries Worldwide",
    },
    {
      icon: Zap,
      value: "24/7",
      label: locale === "ru" ? "Техническая поддержка" : "Technical Support",
    },
  ]

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-6 group">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <stat.icon className="h-12 w-12 text-primary" />
              </div>
              <div className="text-6xl md:text-7xl font-bold gradient-text">{stat.value}</div>
              <div className="text-lg text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
