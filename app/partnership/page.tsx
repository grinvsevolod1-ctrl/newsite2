import { PartnershipContent } from "@/components/partnership/partnership-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Партнерство и сотрудничество - Бизнес с NetNext | B2B",
  description:
    "Партнерская программа NetNext: реферальные бонусы, совместные проекты, аутстаффинг команд. Выгодные условия для агентств, стартапов и бизнеса.",
  keywords: [
    "партнерство IT",
    "сотрудничество разработка",
    "аутстаффинг разработчиков",
    "B2B IT услуги",
    "партнерская программа",
    "совместные проекты",
  ],
  openGraph: {
    title: "Партнерство и сотрудничество с NetNext",
    description: "Выгодные условия для агентств, стартапов и бизнеса. Реферальные бонусы.",
    url: "https://www.netnext.site/partnership",
    type: "website",
  },
  alternates: {
    canonical: "https://www.netnext.site/partnership",
  },
}

export default function PartnershipPage() {
  return <PartnershipContent />
}
