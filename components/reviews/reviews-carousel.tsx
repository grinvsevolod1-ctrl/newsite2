"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Александр Петров",
    company: "FlorStroy",
    rating: 5,
    text: "NetNext создали для нас отличный сайт! Профессиональный подход, соблюдение сроков и отличное качество. Рекомендуем!",
    avatar: "/business-man-avatar.png",
  },
  {
    id: 2,
    name: "Ольга Иванова",
    company: "Olli Beauty",
    rating: 5,
    text: "Замечательная команда! Сделали красивый и функциональный сайт для моего бизнеса. Все пожелания были учтены.",
    avatar: "/business-woman-avatar.png",
  },
  {
    id: 3,
    name: "Дмитрий Сидоров",
    company: "Galavita Stroy",
    rating: 5,
    text: "Отличная работа! Сайт получился современным и удобным. Клиенты довольны, заявок стало больше.",
    avatar: "/professional-man-avatar.png",
  },
  {
    id: 4,
    name: "Елена Смирнова",
    company: "Bvetra",
    rating: 5,
    text: "Профессионалы своего дела! Создали для нас платформу для корпоративных трансферов. Все работает отлично!",
    avatar: "/professional-woman-avatar.png",
  },
]

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const currentReview = reviews[currentIndex]

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl lg:text-5xl">Отзывы наших клиентов</h2>

        <div className="relative mx-auto max-w-4xl">
          {/* Review Card */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 md:p-12">
            <div className="mb-6 flex items-center gap-4">
              <img
                src={currentReview.avatar || "/placeholder.svg"}
                alt={currentReview.name}
                className="h-16 w-16 rounded-full object-cover md:h-20 md:w-20"
              />
              <div>
                <h3 className="text-lg font-semibold md:text-xl">{currentReview.name}</h3>
                <p className="text-sm text-muted-foreground md:text-base">{currentReview.company}</p>
              </div>
            </div>

            <div className="mb-4 flex gap-1">
              {Array.from({ length: currentReview.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary md:h-6 md:w-6" />
              ))}
            </div>

            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">"{currentReview.text}"</p>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={goToPrevious} className="h-12 w-12 bg-transparent">
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={goToNext} className="h-12 w-12 bg-transparent">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
