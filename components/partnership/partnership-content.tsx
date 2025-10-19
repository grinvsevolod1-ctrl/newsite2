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
import { createClient } from "@/lib/supabase/client"
import { Handshake, TrendingUp, Globe, Award, Loader2 } from "lucide-react"

export function PartnershipContent() {
  const { locale } = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    partnershipType: "",
    description: "",
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

      const { error: submitError } = await supabase.from("partnership_requests").insert({
        company_name: formData.companyName,
        contact_person: formData.contactPerson,
        email: formData.email,
        phone: formData.phone || null,
        website: formData.website || null,
        partnership_type: formData.partnershipType,
        description: formData.description,
        user_id: user?.id || null,
      })

      if (submitError) throw submitError

      try {
        const partnershipTypeLabels: Record<string, string> = {
          reseller: locale === "ru" ? "Реселлер" : "Reseller",
          technology: locale === "ru" ? "Технологическое партнерство" : "Technology Partnership",
          referral: locale === "ru" ? "Реферальная программа" : "Referral Program",
          investment: locale === "ru" ? "Инвестиции" : "Investment",
          other: locale === "ru" ? "Другое" : "Other",
        }

        await fetch("/api/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.contactPerson,
            email: formData.email,
            phone: formData.phone || "Не указано",
            message: `Компания: ${formData.companyName}\nВеб-сайт: ${formData.website || "Не указан"}\nТип партнерства: ${partnershipTypeLabels[formData.partnershipType] || formData.partnershipType}\n\nОписание:\n${formData.description}`,
            type: "Заявка на партнерство",
          }),
        })
      } catch (telegramError) {
        console.error("[v0] Failed to send to Telegram:", telegramError)
      }

      setSuccess(true)
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        website: "",
        partnershipType: "",
        description: "",
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const partnershipTypes = [
    {
      icon: Handshake,
      title: locale === "ru" ? "Реселлер" : "Reseller",
      description:
        locale === "ru" ? "Продавайте наши услуги и получайте комиссию" : "Sell our services and earn commission",
    },
    {
      icon: TrendingUp,
      title: locale === "ru" ? "Технологическое партнерство" : "Technology Partnership",
      description:
        locale === "ru" ? "Совместная разработка и интеграция решений" : "Joint development and solution integration",
    },
    {
      icon: Globe,
      title: locale === "ru" ? "Реферальная программа" : "Referral Program",
      description: locale === "ru" ? "Рекомендуйте нас и получайте вознаграждение" : "Refer us and get rewarded",
    },
    {
      icon: Award,
      title: locale === "ru" ? "Инвестиции" : "Investment",
      description: locale === "ru" ? "Инвестируйте в наше развитие" : "Invest in our growth",
    },
  ]

  return (
    <div className="min-h-screen pt-24 py-12 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            {locale === "ru" ? "Сотрудничество" : "Partnership"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {locale === "ru"
              ? "Давайте работать вместе для взаимного роста и успеха"
              : "Let's work together for mutual growth and success"}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {partnershipTypes.map((type, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <type.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{type.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{type.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                {locale === "ru" ? "Заявка на партнерство" : "Partnership Request"}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {locale === "ru"
                  ? "Заполните форму и мы свяжемся с вами для обсуждения деталей"
                  : "Fill the form and we'll contact you to discuss details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm sm:text-base">
                      {locale === "ru" ? "Название компании" : "Company Name"} *
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-sm sm:text-base">
                      {locale === "ru" ? "Контактное лицо" : "Contact Person"} *
                    </Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      required
                      className="h-12 text-base"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base">
                      {locale === "ru" ? "Телефон" : "Phone"}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm sm:text-base">
                    {locale === "ru" ? "Веб-сайт" : "Website"}
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partnershipType" className="text-sm sm:text-base">
                    {locale === "ru" ? "Тип партнерства" : "Partnership Type"} *
                  </Label>
                  <Select
                    value={formData.partnershipType}
                    onValueChange={(value) => setFormData({ ...formData, partnershipType: value })}
                  >
                    <SelectTrigger id="partnershipType" className="h-12 text-base">
                      <SelectValue placeholder={locale === "ru" ? "Выберите тип" : "Select type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reseller">{locale === "ru" ? "Реселлер" : "Reseller"}</SelectItem>
                      <SelectItem value="technology">
                        {locale === "ru" ? "Технологическое партнерство" : "Technology Partnership"}
                      </SelectItem>
                      <SelectItem value="referral">
                        {locale === "ru" ? "Реферальная программа" : "Referral Program"}
                      </SelectItem>
                      <SelectItem value="investment">{locale === "ru" ? "Инвестиции" : "Investment"}</SelectItem>
                      <SelectItem value="other">{locale === "ru" ? "Другое" : "Other"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm sm:text-base">
                    {locale === "ru" ? "Описание" : "Description"} *
                  </Label>
                  <Textarea
                    id="description"
                    rows={5}
                    placeholder={
                      locale === "ru"
                        ? "Расскажите о вашей компании и предложении..."
                        : "Tell us about your company and proposal..."
                    }
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="text-base"
                  />
                </div>
                {error && <p className="text-xs sm:text-sm text-destructive">{error}</p>}
                {success && (
                  <p className="text-xs sm:text-sm text-green-600">
                    {locale === "ru" ? "Заявка отправлена успешно!" : "Request sent successfully!"}
                  </p>
                )}
                <Button type="submit" className="w-full h-12 sm:h-14 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      {locale === "ru" ? "Отправка..." : "Sending..."}
                    </>
                  ) : locale === "ru" ? (
                    "Отправить заявку"
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
