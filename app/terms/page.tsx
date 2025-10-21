"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"

export default function TermsPage() {
  const { locale } = useLocale()

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center break-words">
          {locale === "ru" ? "Условия использования" : "Terms of Service"}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl break-words">
              {locale === "ru" ? "Принятие условий" : "Acceptance of Terms"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base break-words space-y-4">
            <p className="leading-relaxed">
              {locale === "ru"
                ? "Используя наши услуги, вы соглашаетесь с настоящими условиями использования."
                : "By using our services, you agree to these terms of service."}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4 md:mt-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl break-words">{locale === "ru" ? "Услуги" : "Services"}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base break-words space-y-4">
            <p className="leading-relaxed">
              {locale === "ru"
                ? "NetNext предоставляет услуги разработки программного обеспечения, включая веб-приложения, мобильные приложения, боты и AI решения."
                : "NetNext provides software development services, including web applications, mobile apps, bots, and AI solutions."}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4 md:mt-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl break-words">
              {locale === "ru" ? "Ответственность" : "Liability"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base break-words space-y-4">
            <p className="leading-relaxed">
              {locale === "ru"
                ? "Мы стремимся предоставлять качественные услуги, но не несем ответственности за косвенные убытки."
                : "We strive to provide quality services but are not liable for indirect damages."}
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
                ? "По юридическим вопросам: team@netnext.site"
                : "For legal questions: team@netnext.site"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
