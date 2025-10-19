"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLocale } from "@/contexts/locale-context"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

interface ApplicationFormProps {
  vacancyId: string
  vacancyTitle: string
  onSuccess: () => void
}

export function ApplicationForm({ vacancyId, vacancyTitle, onSuccess }: ApplicationFormProps) {
  const { locale } = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    portfolioUrl: "",
    coverLetter: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error: submitError } = await supabase.from("job_applications").insert({
        vacancy_id: vacancyId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        resume_url: formData.resumeUrl || null,
        portfolio_url: formData.portfolioUrl || null,
        cover_letter: formData.coverLetter || null,
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
            phone: formData.phone || "Не указано",
            message: `Вакансия: ${vacancyTitle}\n\nРезюме: ${formData.resumeUrl || "Не указано"}\nПортфолио: ${formData.portfolioUrl || "Не указано"}\n\nСопроводительное письмо:\n${formData.coverLetter || "Не указано"}`,
            type: "Отклик на вакансию",
          }),
        })
      } catch (telegramError) {
        console.error("[v0] Failed to send to Telegram:", telegramError)
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-2">{locale === "ru" ? "Отклик на вакансию" : "Apply for Position"}</h3>
      <p className="text-muted-foreground mb-6">{vacancyTitle}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{locale === "ru" ? "Полное имя" : "Full Name"} *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{locale === "ru" ? "Телефон" : "Phone"}</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resumeUrl">{locale === "ru" ? "Ссылка на резюме" : "Resume URL"}</Label>
          <Input
            id="resumeUrl"
            type="url"
            placeholder="https://"
            value={formData.resumeUrl}
            onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolioUrl">{locale === "ru" ? "Ссылка на портфолио" : "Portfolio URL"}</Label>
          <Input
            id="portfolioUrl"
            type="url"
            placeholder="https://"
            value={formData.portfolioUrl}
            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coverLetter">{locale === "ru" ? "Сопроводительное письмо" : "Cover Letter"}</Label>
          <Textarea
            id="coverLetter"
            rows={5}
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {locale === "ru" ? "Отправка..." : "Sending..."}
            </>
          ) : locale === "ru" ? (
            "Отправить отклик"
          ) : (
            "Submit Application"
          )}
        </Button>
      </form>
    </div>
  )
}
