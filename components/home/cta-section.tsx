"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"
import { ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const { locale } = useLocale()

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full animate-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-bold text-balance gradient-text leading-tight">
            {locale === "ru" ? "Готовы начать свой проект?" : "Ready to Start Your Project?"}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {locale === "ru"
              ? "Свяжитесь с нами сегодня и получите бесплатную консультацию по вашему проекту"
              : "Contact us today and get a free consultation for your project"}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-10 h-16 group hover-glow rounded-full">
              <Link href="/contacts">
                {locale === "ru" ? "Связаться с нами" : "Contact Us"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-10 h-16 bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/30 hover:bg-primary/10 rounded-full group bg-transparent"
            >
              <a href="https://t.me/+375291414555" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Telegram
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-10 h-16 bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/30 hover:bg-primary/10 rounded-full bg-transparent"
            >
              <Link href="/calculator">{locale === "ru" ? "Рассчитать стоимость" : "Calculate Price"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
