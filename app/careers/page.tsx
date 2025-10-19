import { createClient } from "@/lib/supabase/server"
import { CareersContent } from "@/components/careers/careers-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Вакансии - Работа в IT студии NetNext | Карьера разработчика",
  description:
    "Открытые вакансии в NetNext: Frontend, Backend, Mobile разработчики, UI/UX дизайнеры, HR. Удаленная работа, конкурентная зарплата от 2000 BYN, карьерный рост.",
  keywords: [
    "вакансии разработчиков",
    "работа программистом",
    "frontend вакансии",
    "backend вакансии",
    "mobile разработчик вакансии",
    "удаленная работа IT",
    "работа в NetNext",
    "карьера в IT",
  ],
  openGraph: {
    title: "Вакансии - Работа в IT студии NetNext",
    description: "Открытые вакансии: разработчики, дизайнеры, HR. Удаленная работа, от 2000 BYN.",
    url: "https://www.netnext.site/careers",
    type: "website",
  },
  alternates: {
    canonical: "https://www.netnext.site/careers",
  },
}

export default async function CareersPage() {
  const supabase = await createClient()

  const { data: vacancies } = await supabase
    .from("vacancies")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  return (
    <div className="pt-24">
      <CareersContent vacancies={vacancies || []} />
    </div>
  )
}
