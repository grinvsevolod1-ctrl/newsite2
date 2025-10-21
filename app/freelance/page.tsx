import { FreelanceContent } from "@/components/freelance/freelance-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Для фрилансеров - Сотрудничество с NetNext Минск | Удаленная работа в Беларуси",
  description:
    "Присоединяйтесь к сети фрилансеров NetNext в Минске. Интересные проекты, стабильные выплаты, удаленная работа по всей Беларуси. Ищем разработчиков, дизайнеров, тестировщиков в Минске, Гомеле, Бресте, Гродно, Витебске, Могилеве.",
  keywords: [
    "фриланс разработка Минск",
    "удаленная работа программист Беларусь",
    "фриланс проекты Минск",
    "работа для фрилансеров РБ",
    "сотрудничество с разработчиками Беларусь",
    "фриланс IT Минск",
    "удаленная работа веб-разработчик",
    "фриланс вакансии Беларусь",
  ],
  openGraph: {
    title: "Для фрилансеров - Сотрудничество с NetNext Минск",
    description: "Интересные проекты, стабильные выплаты, удаленная работа для разработчиков по всей Беларуси.",
    url: "https://www.netnext.site/freelance",
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["be_BY"],
  },
  alternates: {
    canonical: "https://www.netnext.site/freelance",
    languages: {
      "ru-BY": "https://www.netnext.site/freelance",
      "be-BY": "https://www.netnext.site/freelance",
    },
  },
  other: {
    "geo.region": "BY",
    "geo.placename": "Minsk",
  },
}

export default function FreelancePage() {
  return <FreelanceContent />
}
