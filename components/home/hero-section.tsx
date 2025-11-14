"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"
import { usePerformance } from "@/contexts/performance-context"
import { translations } from "@/lib/translations"
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { locale } = useLocale()
  const { shouldAnimate, shouldUseBlur, performanceMode } = usePerformance()
  const t = translations[locale]
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setMounted(true)
  }, [])

  const animationDuration = performanceMode === "high" ? 800 : performanceMode === "medium" ? 400 : 150

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {!isMobile && performanceMode !== "low" && (
          <>
            {performanceMode === "high" ? (
              <>
                <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[400px] md:w-[600px] h-[200px] sm:h-[400px] md:h-[600px] bg-primary/20 rounded-full animate-glow blur-3xl" />
                <div
                  className="absolute bottom-1/4 right-1/4 w-[150px] sm:w-[300px] md:w-[500px] h-[150px] sm:h-[300px] md:h-[500px] bg-accent/20 rounded-full animate-glow blur-3xl"
                  style={{ animationDelay: "2s" }}
                />
              </>
            ) : (
              <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 rounded-full blur-2xl" />
            )}
          </>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 ${shouldUseBlur ? "backdrop-blur-xl backdrop-saturate-[200%]" : ""} border border-primary/40 text-xs sm:text-sm md:text-base font-semibold shadow-lg shadow-primary/20 ${shouldAnimate ? "transition-all" : ""} ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDuration: shouldAnimate ? `${animationDuration * 0.6}ms` : "0ms" }}
          >
            <Sparkles
              className={`h-4 w-4 sm:h-5 sm:w-5 text-primary ${shouldAnimate ? "animate-pulse" : ""} flex-shrink-0`}
            />
            <span className="gradient-text font-bold whitespace-nowrap">
              {locale === "ru" ? "🏆 50+ профессионалов · 200+ проектов" : "🏆 50+ Professionals · 200+ Projects"}
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.15] sm:leading-[1.1] md:leading-[1.05] text-balance ${shouldAnimate ? "transition-all" : ""} px-2 sm:px-4 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDuration: shouldAnimate ? `${animationDuration}ms` : "0ms",
              transitionDelay: shouldAnimate ? "200ms" : "0ms",
            }}
          >
            <span className="gradient-text">{t.hero.title}</span>
          </h1>

          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed text-balance max-w-4xl mx-auto ${shouldAnimate ? "transition-all" : ""} px-2 sm:px-4 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDuration: shouldAnimate ? `${animationDuration}ms` : "0ms",
              transitionDelay: shouldAnimate ? "400ms" : "0ms",
            }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-stretch sm:items-center pt-2 sm:pt-4 md:pt-8 ${shouldAnimate ? "transition-all" : ""} px-2 sm:px-4 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDuration: shouldAnimate ? `${animationDuration}ms` : "0ms",
              transitionDelay: shouldAnimate ? "600ms" : "0ms",
            }}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base md:text-lg h-11 sm:h-12 md:h-14 lg:h-16 min-w-[180px] sm:min-w-[200px] bg-gradient-to-r from-primary via-accent to-secondary hover:scale-105 transition-all duration-300 rounded-full shadow-lg shadow-primary/50"
            >
              <Link href="/calculator">
                {t.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-sm sm:text-base md:text-lg h-11 sm:h-12 md:h-14 lg:h-16 min-w-[180px] sm:min-w-[200px] bg-white/[0.06] backdrop-blur-xl backdrop-saturate-[200%] border-primary/30 hover:bg-white/[0.08] hover:scale-105 rounded-full transition-all duration-300"
            >
              <Link href="/faq">{locale === "ru" ? "Узнать больше" : "Learn More"}</Link>
            </Button>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 pt-8 sm:pt-10 md:pt-14 max-w-5xl mx-auto ${shouldAnimate ? "transition-all" : ""} ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDuration: shouldAnimate ? `${animationDuration}ms` : "0ms",
              transitionDelay: shouldAnimate ? "700ms" : "0ms",
            }}
          >
            {[
              { value: "50+", label: locale === "ru" ? "Разработчиков" : "Developers", icon: "👨‍💻" },
              { value: "200+", label: locale === "ru" ? "Проектов" : "Projects", icon: "🚀" },
              { value: "15+", label: locale === "ru" ? "Стран" : "Countries", icon: "🌍" },
              { value: "98%", label: locale === "ru" ? "Довольных клиентов" : "Happy Clients", icon: "⭐" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group p-4 sm:p-5 md:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-md backdrop-saturate-[180%] border border-primary/15 hover:border-primary/30 hover:from-white/[0.08] hover:to-white/[0.04] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {shouldAnimate && (
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="flex flex-col items-center gap-1">
            <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
            <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-primary/60 -mt-3" />
            <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-primary/40 -mt-3" />
          </div>
        </div>
      )}
    </section>
  )
}
