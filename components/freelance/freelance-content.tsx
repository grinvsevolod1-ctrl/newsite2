"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"
import { Users, Briefcase, DollarSign, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export function FreelanceContent() {
  const { locale } = useLocale()

  const benefits = [
    {
      icon: DollarSign,
      title: locale === "ru" ? "Конкурентная оплата" : "Competitive Pay",
      description:
        locale === "ru" ? "Справедливая оплата за ваш труд и опыт" : "Fair compensation for your work and experience",
    },
    {
      icon: Clock,
      title: locale === "ru" ? "Гибкий график" : "Flexible Schedule",
      description: locale === "ru" ? "Работайте когда и откуда удобно" : "Work when and where you want",
    },
    {
      icon: Briefcase,
      title: locale === "ru" ? "Интересные проекты" : "Exciting Projects",
      description: locale === "ru" ? "Работа над разнообразными проектами" : "Work on diverse and challenging projects",
    },
    {
      icon: Users,
      title: locale === "ru" ? "Профессиональная команда" : "Professional Team",
      description:
        locale === "ru" ? "Сотрудничество с опытными специалистами" : "Collaborate with experienced professionals",
    },
  ]

  const requirements = [
    locale === "ru" ? "Опыт коммерческой разработки от 1 года" : "1+ years of commercial development experience",
    locale === "ru" ? "Портфолио выполненных проектов" : "Portfolio of completed projects",
    locale === "ru" ? "Знание современных технологий" : "Knowledge of modern technologies",
    locale === "ru" ? "Ответственность и пунктуальность" : "Responsibility and punctuality",
    locale === "ru" ? "Хорошие коммуникативные навыки" : "Good communication skills",
  ]

  return (
    <div className="min-h-screen pt-24 py-12 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            {locale === "ru" ? "Фрилансерам" : "For Freelancers"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {locale === "ru"
              ? "Присоединяйтесь к нашей сети фрилансеров и работайте над интересными проектами"
              : "Join our network of freelancers and work on exciting projects"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                {locale === "ru" ? "Преимущества работы с нами" : "Benefits"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{benefit.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">{locale === "ru" ? "Требования" : "Requirements"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                {locale === "ru" ? "Готовы начать?" : "Ready to Start?"}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {locale === "ru"
                  ? "Отправьте ваше резюме и портфолио на team@netnext.site"
                  : "Send your resume and portfolio to team@netnext.site"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <Button asChild size="lg" className="w-full h-12 sm:h-14 text-base">
                <a href="mailto:team@netnext.site">{locale === "ru" ? "Отправить резюме" : "Send Resume"}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full h-12 sm:h-14 text-base bg-transparent">
                <Link href="/contacts">{locale === "ru" ? "Связаться с нами" : "Contact Us"}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
