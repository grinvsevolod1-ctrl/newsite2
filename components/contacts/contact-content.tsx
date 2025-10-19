"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/translations"
import { createClient } from "@/lib/supabase/client"
import { Mail, Phone, MapPin, Instagram, MessageCircle, Loader2 } from "lucide-react"

export function ContactContent() {
  const { locale } = useLocale()
  const t = translations[locale]
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error: submitError } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        service_type: formData.serviceType || null,
        message: formData.message,
        user_id: user?.id || null,
      })

      if (submitError) throw submitError

      try {
        await fetch("/api/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            type: formData.serviceType || "Обратная связь",
          }),
        })
      } catch (telegramError) {
        console.error("Failed to send to Telegram:", telegramError)
        // Don't fail the whole submission if Telegram fails
      }

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceType: "",
        message: "",
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: t.contact.phone,
      value: "+375 29 141 45 55",
      link: "tel:+375291414555",
    },
    {
      icon: Mail,
      title: locale === "ru" ? "Техподдержка" : "Support",
      value: "info@netnext.site",
      link: "mailto:info@netnext.site",
    },
    {
      icon: Mail,
      title: locale === "ru" ? "Сотрудничество" : "Partnership",
      value: "team@netnext.site",
      link: "mailto:team@netnext.site",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@netnext.site",
      link: "https://instagram.com/netnext.site",
    },
    {
      icon: MessageCircle,
      title: "Telegram",
      value: locale === "ru" ? "Написать в Telegram" : "Message on Telegram",
      link: "https://t.me/+375291414555",
    },
    {
      icon: MapPin,
      title: locale === "ru" ? "Локация" : "Location",
      value: locale === "ru" ? "Работаем по всему миру" : "Worldwide",
      link: null,
    },
  ]

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full animate-glow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text">
            {t.contact.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {locale === "ru"
              ? "Свяжитесь с нами любым удобным способом. Мы ответим в течение 24 часов"
              : "Contact us in any convenient way. We'll respond within 24 hours"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.4),0_0_60px_rgba(34,211,238,0.2)] transition-all">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                {locale === "ru" ? "Отправить сообщение" : "Send Message"}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {locale === "ru" ? "Заполните форму и мы свяжемся с вами" : "Fill the form and we'll contact you"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">
                    {t.contact.name} *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 h-12 sm:h-14 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">
                    {t.contact.email} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 h-12 sm:h-14 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm sm:text-base">
                    {t.contact.phone}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 h-12 sm:h-14 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm sm:text-base">
                    {t.contact.company}
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 h-12 sm:h-14 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-sm sm:text-base">
                    {locale === "ru" ? "Тип услуги" : "Service Type"}
                  </Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                  >
                    <SelectTrigger
                      id="serviceType"
                      className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 h-12 sm:h-14 text-base"
                    >
                      <SelectValue placeholder={locale === "ru" ? "Выберите услугу" : "Select service"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white/[0.06] backdrop-blur-xl backdrop-saturate-[200%] border-primary/20">
                      <SelectItem value="web">{locale === "ru" ? "Веб-разработка" : "Web Development"}</SelectItem>
                      <SelectItem value="mobile">{locale === "ru" ? "Мобильные приложения" : "Mobile Apps"}</SelectItem>
                      <SelectItem value="bot">{locale === "ru" ? "Telegram боты" : "Telegram Bots"}</SelectItem>
                      <SelectItem value="ai">{locale === "ru" ? "AI решения" : "AI Solutions"}</SelectItem>
                      <SelectItem value="desktop">
                        {locale === "ru" ? "Десктопные приложения" : "Desktop Apps"}
                      </SelectItem>
                      <SelectItem value="design">{locale === "ru" ? "Дизайн" : "Design"}</SelectItem>
                      <SelectItem value="other">{locale === "ru" ? "Другое" : "Other"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base">
                    {t.contact.message} *
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 text-base"
                  />
                </div>
                {error && <p className="text-xs sm:text-sm text-destructive">{error}</p>}
                {success && (
                  <p className="text-xs sm:text-sm text-primary font-medium">
                    {locale === "ru"
                      ? "✓ Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время."
                      : "✓ Message sent successfully! We'll contact you soon."}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full h-12 sm:h-14 text-base sm:text-lg hover-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      {locale === "ru" ? "Отправка..." : "Sending..."}
                    </>
                  ) : (
                    t.contact.send
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.4),0_0_60px_rgba(34,211,238,0.2)] transition-all">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  {locale === "ru" ? "Контактная информация" : "Contact Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4 group">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-primary/50 transition-all">
                      <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold mb-1 text-sm sm:text-base">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground break-words">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.4),0_0_60px_rgba(34,211,238,0.2)] transition-all">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  {locale === "ru" ? "Режим работы" : "Working Hours"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {locale === "ru"
                    ? "Мы работаем 24/7 и готовы ответить на ваши вопросы в любое время"
                    : "We work 24/7 and ready to answer your questions anytime"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
