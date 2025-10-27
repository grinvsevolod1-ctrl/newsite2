"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLocale } from "@/contexts/locale-context"
import { convertCurrency, formatCurrency } from "@/lib/i18n"
import { createClient } from "@/lib/supabase/client"
import { Calculator, Loader2, Save } from "lucide-react"

interface ProjectFeature {
  id: string
  name: { ru: string; en: string }
  price: number
  category: string
}

export function CalculatorContent() {
  const { locale, currency } = useLocale()
  const [projectType, setProjectType] = useState<string>("web")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "", notes: "" })
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const projectTypes = [
    { value: "web", label: locale === "ru" ? "Сайт" : "Web Application", basePrice: 300 },
    { value: "mobile", label: locale === "ru" ? "Мобильное приложение" : "Mobile App", basePrice: 3000 },
    { value: "bot", label: locale === "ru" ? "Telegram бот" : "Telegram Bot", basePrice: 800 },
    { value: "ai", label: locale === "ru" ? "AI решение" : "AI Solution", basePrice: 4000 },
    { value: "desktop", label: locale === "ru" ? "Десктопное приложение" : "Desktop App", basePrice: 2500 },
    { value: "design", label: locale === "ru" ? "Дизайн проект" : "Design Project", basePrice: 1500 },
  ]

  const features: ProjectFeature[] = [
    {
      id: "auth",
      name: { ru: "Система авторизации", en: "Authentication System" },
      price: 500,
      category: "web,mobile,desktop",
    },
    {
      id: "admin",
      name: { ru: "Админ панель", en: "Admin Panel" },
      price: 800,
      category: "web,mobile,bot",
    },
    {
      id: "payment",
      name: { ru: "Платежная система", en: "Payment System" },
      price: 1000,
      category: "web,mobile,bot",
    },
    {
      id: "api",
      name: { ru: "REST API", en: "REST API" },
      price: 600,
      category: "web,mobile,desktop",
    },
    {
      id: "realtime",
      name: { ru: "Реалтайм функции", en: "Real-time Features" },
      price: 700,
      category: "web,mobile",
    },
    {
      id: "analytics",
      name: { ru: "Аналитика", en: "Analytics" },
      price: 400,
      category: "web,mobile,bot",
    },
    {
      id: "notifications",
      name: { ru: "Push уведомления", en: "Push Notifications" },
      price: 500,
      category: "web,mobile,bot",
    },
    {
      id: "multilang",
      name: { ru: "Мультиязычность", en: "Multi-language" },
      price: 400,
      category: "web,mobile,desktop",
    },
    {
      id: "seo",
      name: { ru: "SEO оптимизация", en: "SEO Optimization" },
      price: 600,
      category: "web",
    },
    {
      id: "cms",
      name: { ru: "CMS система", en: "CMS System" },
      price: 900,
      category: "web",
    },
    {
      id: "chat",
      name: { ru: "Чат/Мессенджер", en: "Chat/Messenger" },
      price: 1200,
      category: "web,mobile",
    },
    {
      id: "ai-integration",
      name: { ru: "AI интеграция", en: "AI Integration" },
      price: 1500,
      category: "web,mobile,bot,desktop",
    },
    {
      id: "social",
      name: { ru: "Социальные функции", en: "Social Features" },
      price: 800,
      category: "web,mobile",
    },
    {
      id: "maps",
      name: { ru: "Карты/Геолокация", en: "Maps/Geolocation" },
      price: 600,
      category: "web,mobile",
    },
    {
      id: "video",
      name: { ru: "Видео функции", en: "Video Features" },
      price: 1000,
      category: "web,mobile",
    },
  ]

  const currentProjectType = projectTypes.find((pt) => pt.value === projectType)
  const availableFeatures = features.filter((f) => f.category.includes(projectType))

  const calculateTotal = () => {
    const basePrice = currentProjectType?.basePrice || 0
    const featuresPrice = selectedFeatures.reduce((sum, featureId) => {
      const feature = features.find((f) => f.id === featureId)
      return sum + (feature?.price || 0)
    }, 0)
    return convertCurrency(basePrice + featuresPrice, "byn", currency)
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaved(false)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const featuresData = selectedFeatures.map((id) => {
        const feature = features.find((f) => f.id === id)
        return {
          id,
          name: feature?.name[locale],
          price: feature?.price,
        }
      })

      await supabase.from("price_calculations").insert({
        user_id: user?.id || null,
        project_type: projectType,
        features: featuresData,
        estimated_price: calculateTotal(),
        currency: currency,
        contact_email: contactInfo.email || null,
        contact_phone: contactInfo.phone || null,
        notes: contactInfo.notes || null,
      })

      try {
        const featuresList = selectedFeatures
          .map((id) => {
            const feature = features.find((f) => f.id === id)
            return `- ${feature?.name[locale]} (+${formatCurrency(convertCurrency(feature?.price || 0, "byn", currency), currency)})`
          })
          .join("\n")

        await fetch("/api/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: contactInfo.email || "Не указано",
            email: contactInfo.email || "Не указано",
            phone: contactInfo.phone || "Не указано",
            message: `Тип проекта: ${currentProjectType?.label}\n\nВыбранные функции:\n${featuresList || "Нет"}\n\nДополнительные пожелания: ${contactInfo.notes || "Нет"}\n\nИтоговая стоимость: ${formatCurrency(calculateTotal(), currency)}`,
            type: "Расчет стоимости проекта",
          }),
        })
      } catch (telegramError) {
        console.error("[v0] Failed to send to Telegram:", telegramError)
      }

      setSaved(true)
    } catch (error) {
      console.error("[v0] Error saving calculation:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4">
            <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{locale === "ru" ? "Калькулятор стоимости" : "Price Calculator"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-4">
            {locale === "ru" ? "Рассчитайте стоимость проекта" : "Calculate Project Cost"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {locale === "ru"
              ? "Выберите тип проекта и необходимые функции для расчета примерной стоимости"
              : "Select project type and required features to estimate the cost"}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    {locale === "ru" ? "Тип проекта" : "Project Type"}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {locale === "ru"
                      ? "Выберите тип проекта, который вы хотите разработать"
                      : "Select the type of project you want to develop"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setProjectType(type.value)}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left min-h-[80px] ${
                          projectType === type.value
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                            : "border-border hover:border-primary/50 hover:bg-muted/50 active:scale-95"
                        }`}
                      >
                        <div className="font-semibold text-sm sm:text-base">{type.label}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {locale === "ru" ? "от" : "from"}{" "}
                          {formatCurrency(convertCurrency(type.basePrice, "byn", currency), currency)}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    {locale === "ru" ? "Функции и возможности" : "Features & Capabilities"}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {locale === "ru"
                      ? "Выберите необходимые функции для вашего проекта"
                      : "Select required features for your project"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {availableFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg hover:bg-muted/50 transition-colors min-h-[60px]"
                      >
                        <Checkbox
                          id={feature.id}
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={feature.id} className="cursor-pointer font-medium text-sm sm:text-base">
                            {feature.name[locale]}
                          </Label>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            +{formatCurrency(convertCurrency(feature.price, "byn", currency), currency)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    {locale === "ru" ? "Контактная информация" : "Contact Information"}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {locale === "ru"
                      ? "Оставьте контакты для получения детального предложения"
                      : "Leave your contacts to receive a detailed proposal"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
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
                      placeholder="+375291414555"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm sm:text-base">
                      {locale === "ru" ? "Дополнительные пожелания" : "Additional Notes"}
                    </Label>
                    <Input
                      id="notes"
                      placeholder={locale === "ru" ? "Опишите ваши пожелания..." : "Describe your requirements..."}
                      value={contactInfo.notes}
                      onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    {locale === "ru" ? "Итоговая стоимость" : "Total Cost"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-muted-foreground">
                        {locale === "ru" ? "Базовая стоимость" : "Base Price"}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(convertCurrency(currentProjectType?.basePrice || 0, "byn", currency), currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-muted-foreground">
                        {locale === "ru" ? "Дополнительные функции" : "Additional Features"}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(
                          convertCurrency(
                            selectedFeatures.reduce((sum, id) => {
                              const feature = features.find((f) => f.id === id)
                              return sum + (feature?.price || 0)
                            }, 0),
                            "byn",
                            currency,
                          ),
                          currency,
                        )}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-base sm:text-lg">
                          {locale === "ru" ? "Итого" : "Total"}
                        </span>
                        <span className="font-bold text-xl sm:text-2xl text-primary">
                          {formatCurrency(calculateTotal(), currency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleSave}
                      className="w-full h-12 sm:h-14 text-base sm:text-lg"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          {locale === "ru" ? "Сохранение..." : "Saving..."}
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          {locale === "ru" ? "Сохранить расчет" : "Save Calculation"}
                        </>
                      )}
                    </Button>
                    {saved && (
                      <p className="text-xs sm:text-sm text-green-600 text-center">
                        {locale === "ru" ? "Расчет сохранен!" : "Calculation saved!"}
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      {locale === "ru"
                        ? "* Указанная стоимость является приблизительной"
                        : "* The indicated cost is approximate"}
                    </p>
                    <p>
                      {locale === "ru"
                        ? "* Финальная цена зависит от сложности и требований проекта"
                        : "* Final price depends on project complexity and requirements"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
