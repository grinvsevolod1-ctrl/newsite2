"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"

export default function PrivacyPage() {
  const { locale } = useLocale()

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center break-words">
          {locale === "ru" ? "Политика конфиденциальности" : "Privacy Policy"}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl break-words">
              {locale === "ru" ? "Сбор информации" : "Information Collection"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base break-words space-y-4">
            <p className="leading-relaxed">
              {locale === "ru"
                ? "Мы собираем информацию, которую вы предоставляете при регистрации, заполнении форм или использовании наших услуг."
                : "We collect information you provide when registering, filling out forms, or using our services."}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4 md:mt-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl break-words">
              {locale === "ru" ? "Использование информации" : "Use of Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base break-words space-y-4">
            <p className="leading-relaxed">
              {locale === "ru"
                ? "Ваша информация используется для предоставления услуг, улучшения качества обслуживания и связи с вами."
                : "Your information is used to provide services, improve service quality, and communicate with you."}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4 md:mt-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl break-words">
              {locale === "ru" ? "Защита данных" : "Data Protection"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base break-words space-y-4">
            <p className="leading-relaxed">
              {locale === "ru"
                ? "Мы применяем современные меры безопасности для защиты ваших персональных данных."
                : "We implement modern security measures to protect your personal data."}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4 md:mt-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl break-words">{locale === "ru" ? "Контакты" : "Contact"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-muted-foreground break-all">
              {locale === "ru"
                ? "По вопросам конфиденциальности: info@netnext.site"
                : "For privacy questions: info@netnext.site"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
