import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

const caseStudies = {
  florstroy: {
    title: "FlorStroy - Промышленные и полимерные полы",
    client: "FlorStroy",
    category: "web",
    date: "2024",
    url: "https://florstroy.ru",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florstroy-RLNvYkjdxZpmag6u6Mc1RMH494PaJq.png",
    description:
      "Разработка современного корпоративного сайта для компании, специализирующейся на промышленных и полимерных полах.",
    challenge:
      "Клиенту требовался профессиональный сайт, который бы отражал масштаб компании и демонстрировал портфолио выполненных работ. Важно было создать удобную навигацию и интуитивно понятный интерфейс.",
    solution:
      "Мы разработали современный сайт с акцентом на визуальную составляющую. Реализовали удобную систему навигации, интегрировали форму обратной связи и создали адаптивный дизайн для всех устройств.",
    results: [
      "Увеличение конверсии на 45%",
      "Рост органического трафика на 60%",
      "Снижение показателя отказов на 30%",
      "Увеличение времени на сайте на 2 минуты",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    testimonial: {
      text: "NetNext создали для нас отличный сайт! Профессиональный подход, соблюдение сроков и отличное качество.",
      author: "Александр Петров",
      position: "Директор FlorStroy",
    },
  },
  ollibeauty: {
    title: "Olli Beauty - Профессиональный макияж",
    client: "Olli Beauty",
    category: "web",
    date: "2024",
    url: "https://ollibeauty.site",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ollibeauty-DbT9qonncwoEH7V6TYJXFYPUgtFcCk.png",
    description: "Создание элегантного сайта для мастера по профессиональному макияжу в Санкт-Петербурге.",
    challenge:
      "Необходимо было создать сайт, который бы отражал премиальность услуг и привлекал целевую аудиторию. Важно было продемонстрировать портфолио работ и упростить процесс записи.",
    solution:
      "Разработали элегантный дизайн с акцентом на визуальную составляющую. Интегрировали систему онлайн-записи, галерею работ и форму обратной связи.",
    results: [
      "Увеличение количества записей на 70%",
      "Рост узнаваемости бренда",
      "Положительные отзывы клиентов",
      "Увеличение среднего чека на 25%",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    testimonial: {
      text: "Замечательная команда! Сделали красивый и функциональный сайт для моего бизнеса.",
      author: "Ольга Иванова",
      position: "Основатель Olli Beauty",
    },
  },
  galavita: {
    title: "Galavita Stroy - Строительная компания",
    client: "Galavita Stroy",
    category: "web",
    date: "2024",
    url: "https://galavita.vercel.app",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/galavita-6rXqCWP3YIZZtpME93udXMLPJnBs87.png",
    description:
      "Разработка корпоративного сайта для строительной компании, специализирующейся на проектировании и общестроительных работах.",
    challenge:
      "Клиенту требовался надежный и профессиональный сайт, который бы вызывал доверие у потенциальных заказчиков и демонстрировал опыт компании.",
    solution:
      "Создали минималистичный и профессиональный дизайн с акцентом на надежность. Реализовали систему демонстрации проектов и удобную форму для расчета стоимости.",
    results: [
      "Увеличение количества заявок на 55%",
      "Рост доверия к бренду",
      "Улучшение имиджа компании",
      "Привлечение крупных заказчиков",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    testimonial: {
      text: "Отличная работа! Сайт получился современным и удобным. Клиенты довольны.",
      author: "Дмитрий Сидоров",
      position: "Директор Galavita Stroy",
    },
  },
  bvetra: {
    title: "Bvetra - Корпоративные трансферы",
    client: "Bvetra",
    category: "web",
    date: "2024",
    url: "https://bistrievetra.vercel.app",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bistreevetra-dT3BmcTG6oTUTMzWXCePbJQpqPjBAj.png",
    description: "Создание платформы для заказа корпоративных трансферов с удобной системой бронирования.",
    challenge:
      "Необходимо было создать удобную платформу для заказа трансферов с интуитивно понятным интерфейсом и системой онлайн-бронирования.",
    solution:
      "Разработали премиальный дизайн с удобной системой бронирования. Интегрировали онлайн-чат, личный кабинет и систему управления заказами.",
    results: [
      "Автоматизация процесса бронирования",
      "Увеличение количества заказов на 80%",
      "Улучшение качества обслуживания",
      "Положительные отзывы клиентов",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    testimonial: {
      text: "Профессионалы своего дела! Создали для нас платформу для корпоративных трансферов.",
      author: "Елена Смирнова",
      position: "Основатель Bvetra",
    },
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = caseStudies[params.slug as keyof typeof caseStudies]

  if (!caseStudy) {
    return {
      title: "Кейс не найден",
    }
  }

  return {
    title: caseStudy.title,
    description: caseStudy.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      images: [caseStudy.image],
    },
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = caseStudies[params.slug as keyof typeof caseStudies]

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <Link href="/portfolio">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Назад к портфолио
          </Button>
        </Link>

        {/* Hero section */}
        <div className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {caseStudy.date}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {caseStudy.category}
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{caseStudy.title}</h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl">{caseStudy.description}</p>

          <a href={caseStudy.url} target="_blank" rel="noopener noreferrer">
            <Button className="gap-2">
              Посетить сайт
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Main image */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-border/50">
          <img
            src={caseStudy.image || "/placeholder.svg"}
            alt={caseStudy.title}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Content grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Задача</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{caseStudy.challenge}</p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Решение</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{caseStudy.solution}</p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Результаты</h2>
              <ul className="space-y-3">
                {caseStudy.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span className="text-lg text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Testimonial */}
            <section className="rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
              <p className="mb-4 text-lg italic leading-relaxed">"{caseStudy.testimonial.text}"</p>
              <div>
                <p className="font-semibold">{caseStudy.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{caseStudy.testimonial.position}</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold">Клиент</h3>
              <p className="text-muted-foreground">{caseStudy.client}</p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold">Технологии</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech) => (
                  <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold">Категория</h3>
              <p className="capitalize text-muted-foreground">{caseStudy.category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
