"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/translations"
import { ArrowRight, Sparkles, ChevronDown, Play } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { locale } = useLocale()
  const t = translations[locale]
  const [mounted, setMounted] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {videoPlaying ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[400px] md:w-[600px] h-[200px] sm:h-[400px] md:h-[600px] bg-primary/20 rounded-full animate-glow blur-3xl" />
            <div
              className="absolute bottom-1/4 right-1/4 w-[150px] sm:w-[300px] md:w-[500px] h-[150px] sm:h-[300px] md:h-[500px] bg-accent/20 rounded-full animate-glow blur-3xl"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-[120px] sm:w-[250px] md:w-[400px] h-[120px] sm:h-[250px] md:h-[400px] bg-secondary/20 rounded-full animate-glow blur-3xl"
              style={{ animationDelay: "4s" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px] md:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-white/[0.06] backdrop-blur-xl backdrop-saturate-[200%] border border-primary/30 text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary animate-pulse flex-shrink-0" />
            <span className="gradient-text font-semibold whitespace-nowrap">
              {locale === "ru" ? "50+ профессиональных разработчиков" : "50+ Professional Developers"}
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.15] sm:leading-[1.1] md:leading-[1.05] text-balance transition-all duration-1000 delay-200 px-2 sm:px-4 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="gradient-text">{t.hero.title}</span>
          </h1>

          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed text-balance max-w-4xl mx-auto transition-all duration-1000 delay-400 px-2 sm:px-4 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.hero.subtitle}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-stretch sm:items-center pt-2 sm:pt-4 md:pt-8 transition-all duration-1000 delay-600 px-2 sm:px-4 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
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
              <Link href="/portfolio">{t.hero.learnMore}</Link>
            </Button>
          </div>

          {!videoPlaying && (
            <button
              onClick={() => setVideoPlaying(true)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white/[0.06] backdrop-blur-xl backdrop-saturate-[200%] border border-primary/20 rounded-full hover:scale-110 transition-all duration-300 group animate-pulse-glow text-sm sm:text-base ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-accent transition-colors flex-shrink-0" />
              <span className="font-medium">{locale === "ru" ? "Смотреть видео" : "Watch Video"}</span>
            </button>
          )}

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-8 sm:pt-12 md:pt-16 lg:pt-20 max-w-5xl mx-auto transition-all duration-1000 delay-800 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { value: "50+", label: locale === "ru" ? "Разработчиков" : "Developers" },
              { value: "200+", label: locale === "ru" ? "Проектов" : "Projects" },
              { value: "15+", label: locale === "ru" ? "Стран" : "Countries" },
              { value: "98%", label: locale === "ru" ? "Довольных клиентов" : "Happy Clients" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/10 hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-1 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="flex flex-col items-center gap-2">
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-primary -mt-3 sm:-mt-4 opacity-50" />
        </div>
      </div>
    </section>
  )
}
