import { FreelanceContent } from "@/components/freelance/freelance-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Для фрилансеров - Сотрудничество с NetNext | Удаленная работа",
  description:
    "Присоединяйтесь к сети фрилансеров NetNext. Интересные проекты, стабильные выплаты, удаленная работа. Ищем разработчиков, дизайнеров, тестировщиков.",
  keywords: [
    "фриланс разработка",
    "удаленная работа программист",
    "фриланс проекты",
    "работа для фрилансеров",
    "сотрудничество с разработчиками",
    "фриланс IT",
  ],
  openGraph: {
    title: "Для фрилансеров - Сотрудничество с NetNext",
    description: "Интересные проекты, стабильные выплаты, удаленная работа для разработчиков.",
    url: "https://www.netnext.site/freelance",
    type: "website",
  },
  alternates: {
    canonical: "https://www.netnext.site/freelance",
  },
}

export default function FreelancePage() {
  return <FreelanceContent />
}
