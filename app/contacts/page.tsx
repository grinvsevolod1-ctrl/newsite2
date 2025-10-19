import { ContactContent } from "@/components/contacts/contact-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Контакты - Связаться с нами | NetNext",
  description:
    "Свяжитесь с NetNext для обсуждения вашего проекта. Телефон: +375-29-141-45-55, Email: info@netnext.site. Работаем по всему миру. Бесплатная консультация.",
  keywords: [
    "контакты NetNext",
    "связаться с разработчиками",
    "заказать разработку",
    "консультация по разработке",
    "телефон студии разработки",
    "email разработчиков",
  ],
  openGraph: {
    title: "Контакты - Связаться с нами | NetNext",
    description: "Свяжитесь с нами для обсуждения вашего проекта. Бесплатная консультация.",
    url: "https://www.netnext.site/contacts",
    type: "website",
  },
  alternates: {
    canonical: "https://www.netnext.site/contacts",
  },
}

export default function ContactsPage() {
  return <ContactContent />
}
