"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"

export default function PrivacyPage() {
  const { locale } = useLocale()

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          {locale === "ru" ? "Политика конфиденциальности" : "Privacy Policy"}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>{locale === "ru" ? "Сбор информации" : "Information Collection"}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              {locale === "ru"
                ? "Мы собираем информацию, которую вы предоставляете при регистрации, заполнении форм или использовании наших услуг."
                : "We collect information you provide when registering, filling out forms, or using our services."}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{locale === "ru" ? "Использование информации" : "Use of Information"}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              {locale === "ru"
                ? "Ваша информация используется для предоставления услуг, улучшения качества обслуживания и связи с вами."
                : "Your information is used to provide services, improve service quality, and communicate with you."}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{locale === "ru" ? "Защита данных" : "Data Protection"}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              {locale === "ru"
                ? "Мы применяем современные меры безопасности для защиты ваших персональных данных."
                : "We implement modern security measures to protect your personal data."}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{locale === "ru" ? "Контакты" : "Contact"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
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
