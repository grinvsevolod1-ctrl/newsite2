"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLocale } from "@/contexts/locale-context"
import { formatCurrency } from "@/lib/i18n"
import { Briefcase, MapPin, DollarSign, TrendingUp, Users, Award } from "lucide-react"
import { ApplicationForm } from "./application-form"

interface Vacancy {
  id: string
  title_ru: string
  title_en: string
  description_ru: string
  description_en: string
  requirements_ru: string[]
  requirements_en: string[]
  responsibilities_ru: string[]
  responsibilities_en: string[]
  employment_type: string
  experience_level: string
  location: string
  salary_min: number | null
  salary_max: number | null
  salary_currency: string
}

interface CareersContentProps {
  vacancies: Vacancy[]
}

export function CareersContent({ vacancies }: CareersContentProps) {
  const { locale, currency } = useLocale()
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const employmentTypeLabels: Record<string, { ru: string; en: string }> = {
    "full-time": { ru: "Полная занятость", en: "Full-time" },
    "part-time": { ru: "Частичная занятость", en: "Part-time" },
    contract: { ru: "Контракт", en: "Contract" },
    freelance: { ru: "Фриланс", en: "Freelance" },
  }

  const experienceLevelLabels: Record<string, { ru: string; en: string }> = {
    junior: { ru: "Junior", en: "Junior" },
    middle: { ru: "Middle", en: "Middle" },
    senior: { ru: "Senior", en: "Senior" },
    lead: { ru: "Lead", en: "Lead" },
  }

  return (
    <div className="min-h-screen pb-12 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4">
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{locale === "ru" ? "Присоединяйтесь к команде" : "Join Our Team"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            {locale === "ru" ? "Вакансии" : "Careers"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {locale === "ru"
              ? "Присоединяйтесь к команде из 50+ профессионалов и работайте над интересными проектами по всему миру"
              : "Join our team of 50+ professionals and work on exciting projects worldwide"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
          <Card className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 text-center">
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
              <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold text-base sm:text-lg mb-2">
                {locale === "ru" ? "Карьерный рост" : "Career Growth"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {locale === "ru"
                  ? "Возможность роста до Team Lead и выше"
                  : "Opportunity to grow to Team Lead and beyond"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 text-center">
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold text-base sm:text-lg mb-2">
                {locale === "ru" ? "Международные проекты" : "Global Projects"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {locale === "ru" ? "Работа с клиентами по всему миру" : "Work with clients worldwide"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 text-center">
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
              <Award className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold text-base sm:text-lg mb-2">
                {locale === "ru" ? "Конкурентная зарплата" : "Competitive Salary"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {locale === "ru" ? "Оклад + бонусы за проекты" : "Salary + project bonuses"}
              </p>
            </CardContent>
          </Card>
        </div>

        {vacancies.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                {locale === "ru"
                  ? "В данный момент открытых вакансий нет. Отправьте резюме на team@netnext.site"
                  : "No open positions at the moment. Send your resume to team@netnext.site"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {vacancies.map((vacancy) => (
              <Card
                key={vacancy.id}
                className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.4),0_0_60px_rgba(34,211,238,0.2)] transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">
                      {locale === "ru" ? vacancy.title_ru : vacancy.title_en}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {experienceLevelLabels[vacancy.experience_level][locale]}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    {locale === "ru" ? vacancy.description_ru : vacancy.description_en}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">{employmentTypeLabels[vacancy.employment_type][locale]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">{vacancy.location}</span>
                    </div>
                    {vacancy.salary_min && vacancy.salary_max && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="truncate">
                          {formatCurrency(vacancy.salary_min, vacancy.salary_currency as any)} -{" "}
                          {formatCurrency(vacancy.salary_max, vacancy.salary_currency as any)}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedVacancy(vacancy)
                      setShowApplicationForm(false)
                    }}
                    className="w-full h-12 text-base"
                  >
                    {locale === "ru" ? "Подробнее" : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedVacancy} onOpenChange={() => setSelectedVacancy(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedVacancy && !showApplicationForm && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">
                  {locale === "ru" ? selectedVacancy.title_ru : selectedVacancy.title_en}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {locale === "ru" ? selectedVacancy.description_ru : selectedVacancy.description_en}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">{locale === "ru" ? "Требования" : "Requirements"}</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {(locale === "ru" ? selectedVacancy.requirements_ru : selectedVacancy.requirements_en).map(
                      (req, index) => (
                        <li key={index}>{req}</li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">{locale === "ru" ? "Обязанности" : "Responsibilities"}</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {(locale === "ru" ? selectedVacancy.responsibilities_ru : selectedVacancy.responsibilities_en).map(
                      (resp, index) => (
                        <li key={index}>{resp}</li>
                      ),
                    )}
                  </ul>
                </div>
                <Button onClick={() => setShowApplicationForm(true)} className="w-full" size="lg">
                  {locale === "ru" ? "Откликнуться" : "Apply Now"}
                </Button>
              </div>
            </>
          )}
          {selectedVacancy && showApplicationForm && (
            <ApplicationForm
              vacancyId={selectedVacancy.id}
              vacancyTitle={locale === "ru" ? selectedVacancy.title_ru : selectedVacancy.title_en}
              onSuccess={() => {
                setSelectedVacancy(null)
                setShowApplicationForm(false)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
