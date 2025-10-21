import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Отзывы клиентов о NetNext - Разработка в Минске, Беларусь",
  description:
    "Отзывы клиентов NetNext о разработке сайтов, мобильных приложений, ботов в Минске и Беларуси. Рейтинг 4.9/5 на основе 127 отзывов. Читайте реальные истории успеха от клиентов из Минска, Гомеля, Бреста, Гродно.",
  keywords: [
    "отзывы о NetNext Минск",
    "отзывы клиентов разработка Беларусь",
    "рейтинг студии разработки Минск",
    "отзывы о разработчиках РБ",
    "веб-студия отзывы Минск",
    "разработка сайтов отзывы Беларусь",
  ],
  openGraph: {
    title: "Отзывы клиентов о NetNext - Минск, Беларусь",
    description: "Рейтинг 4.9/5 на основе 127 отзывов. Читайте реальные истории успеха от клиентов из Беларуси.",
    url: "https://www.netnext.site/reviews",
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["be_BY"],
  },
  alternates: {
    canonical: "https://www.netnext.site/reviews",
    languages: {
      "ru-BY": "https://www.netnext.site/reviews",
      "be-BY": "https://www.netnext.site/reviews",
    },
  },
  other: {
    "geo.region": "BY",
    "geo.placename": "Minsk",
  },
}

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Александр Петров",
      company: "FlorStroy",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Отличная работа! Команда NetNext разработала для нас корпоративный сайт с каталогом продукции. Все сделано качественно, в срок и по адекватной цене. Особенно порадовала оперативность в коммуникации.",
      project: "Корпоративный сайт",
    },
    {
      name: "Ольга Иванова",
      company: "Olli Beauty",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Заказывали интернет-магазин косметики. Результат превзошел ожидания! Красивый дизайн, удобная админка, быстрая загрузка. Продажи выросли на 40% после запуска нового сайта.",
      project: "Интернет-магазин",
    },
    {
      name: "Дмитрий Соколов",
      company: "TechStart",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Разрабатывали мобильное приложение для нашего стартапа. Команда профессиональная, всегда на связи, предлагали улучшения. Приложение работает стабильно, пользователи довольны.",
      project: "Мобильное приложение",
    },
    {
      name: "Елена Смирнова",
      company: "BeautyPro",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Создали для нас Telegram бота для записи клиентов в салон красоты. Очень удобно, автоматизировали рутинные задачи. Окупилось за первый месяц работы!",
      project: "Telegram бот",
    },
    {
      name: "Максим Волков",
      company: "DataAnalytics",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Заказывали разработку AI решения для анализа данных. Сложный проект, но команда справилась на отлично. Система работает точно и быстро. Рекомендую!",
      project: "AI решение",
    },
    {
      name: "Анна Козлова",
      company: "EduPlatform",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Разработали образовательную платформу с личными кабинетами, видеоуроками и тестами. Все работает идеально, студенты довольны. Спасибо за качественную работу!",
      project: "Образовательная платформа",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Отзывы наших клиентов
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Более 127 довольных клиентов доверили нам разработку своих проектов
          </p>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-primary">4.9/5</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.company}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{review.text}</p>

              <div className="text-xs text-primary font-medium">{review.project}</div>
            </Card>
          ))}
        </div>

        <div className="text-center p-8 border border-primary/20 rounded-lg bg-card max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Хотите стать нашим следующим довольным клиентом?</h2>
          <p className="text-muted-foreground mb-6">
            Свяжитесь с нами для бесплатной консультации и обсуждения вашего проекта
          </p>
          <Button asChild size="lg" className="h-12 sm:h-14 px-6 sm:px-8">
            <Link href="/contacts">Начать проект</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
