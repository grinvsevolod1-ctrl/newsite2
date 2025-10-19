import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ - Часто задаваемые вопросы | NetNext",
  description:
    "Ответы на часто задаваемые вопросы о разработке веб-приложений, мобильных приложений, ботов. Сроки, стоимость, процесс работы с NetNext.",
  keywords: [
    "FAQ разработка",
    "вопросы о разработке",
    "стоимость разработки",
    "сроки разработки",
    "как заказать разработку",
  ],
  openGraph: {
    title: "FAQ - Часто задаваемые вопросы | NetNext",
    description: "Ответы на вопросы о разработке, сроках, стоимости и процессе работы.",
    url: "https://www.netnext.site/faq",
    type: "website",
  },
  alternates: {
    canonical: "https://www.netnext.site/faq",
  },
}

export default function FAQPage() {
  const faqs = [
    {
      question: "Сколько стоит разработка веб-приложения?",
      answer:
        "Стоимость разработки зависит от сложности проекта, функционала и сроков. Простое веб-приложение начинается от 3000 BYN, средней сложности - от 8000 BYN, сложные корпоративные решения - от 20000 BYN. Используйте наш калькулятор для предварительного расчета стоимости.",
    },
    {
      question: "Какие сроки разработки проекта?",
      answer:
        "Сроки зависят от объема и сложности проекта. Простой лендинг - 1-2 недели, веб-приложение средней сложности - 1-3 месяца, крупный проект - 3-6 месяцев. Мы всегда согласовываем сроки на этапе планирования и придерживаемся дедлайнов.",
    },
    {
      question: "Какой процесс работы над проектом?",
      answer:
        "1) Бесплатная консультация и обсуждение требований. 2) Составление технического задания и оценка. 3) Подписание договора и предоплата. 4) Разработка с еженедельными отчетами. 5) Тестирование и исправление замечаний. 6) Запуск проекта и передача исходного кода. 7) Техническая поддержка.",
    },
    {
      question: "Предоставляете ли вы техническую поддержку после запуска?",
      answer:
        "Да, мы предоставляем гарантийную поддержку 3 месяца после запуска проекта бесплатно. Также предлагаем платные пакеты технической поддержки и развития проекта на постоянной основе.",
    },
    {
      question: "Можно ли увидеть примеры ваших работ?",
      answer:
        "Конечно! В нашем портфолио представлено более 50 успешных проектов различной сложности: веб-приложения, мобильные приложения, Telegram боты, AI решения. Мы также можем предоставить контакты клиентов для получения отзывов.",
    },
    {
      question: "Работаете ли вы с клиентами из других стран?",
      answer:
        "Да, мы работаем с клиентами по всему миру. Наша команда говорит на русском, английском и белорусском языках. Мы используем удобные инструменты для удаленной коммуникации и управления проектами.",
    },
    {
      question: "Какие технологии вы используете?",
      answer:
        "Мы работаем с современным стеком технологий: React, Next.js, Node.js, TypeScript для веб-разработки; React Native, Flutter для мобильной разработки; Python, TensorFlow для AI решений; PostgreSQL, MongoDB для баз данных. Выбор технологий зависит от требований проекта.",
    },
    {
      question: "Как происходит оплата?",
      answer:
        "Мы работаем по предоплате 50% при подписании договора, остальные 50% после завершения проекта. Для крупных проектов возможна поэтапная оплата. Принимаем оплату банковским переводом, картой, криптовалютой.",
    },
    {
      question: "Можно ли внести изменения в проект во время разработки?",
      answer:
        "Да, мы используем гибкую методологию разработки (Agile), которая позволяет вносить изменения на любом этапе. Небольшие правки включены в стоимость, значительные изменения оцениваются дополнительно.",
    },
    {
      question: "Предоставляете ли вы исходный код?",
      answer:
        "Да, после полной оплаты проекта мы передаем вам все исходные коды, документацию и права на проект. Вы получаете полный контроль над своим продуктом.",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Ответы на популярные вопросы о разработке и сотрудничестве с NetNext
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-primary/20 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="text-base sm:text-lg font-semibold pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center p-8 border border-primary/20 rounded-lg bg-card">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
          <p className="text-muted-foreground mb-6">Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы</p>
          <Button asChild size="lg" className="h-12 sm:h-14 px-6 sm:px-8">
            <Link href="/contacts">Задать вопрос</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
