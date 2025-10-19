import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Кейсы - Истории успеха наших клиентов",
  description:
    "Детальные истории успешных проектов NetNext. Узнайте, как мы помогаем бизнесу расти с помощью современных технологий.",
}

const caseStudies = [
  {
    slug: "florstroy",
    title: "FlorStroy",
    subtitle: "Промышленные и полимерные полы",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florstroy-RLNvYkjdxZpmag6u6Mc1RMH494PaJq.png",
    category: "Web Development",
    results: "+45% конверсии",
  },
  {
    slug: "ollibeauty",
    title: "Olli Beauty",
    subtitle: "Профессиональный макияж",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ollibeauty-DbT9qonncwoEH7V6TYJXFYPUgtFcCk.png",
    category: "Web Development",
    results: "+70% записей",
  },
  {
    slug: "galavita",
    title: "Galavita Stroy",
    subtitle: "Строительная компания",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/galavita-6rXqCWP3YIZZtpME93udXMLPJnBs87.png",
    category: "Web Development",
    results: "+55% заявок",
  },
  {
    slug: "bvetra",
    title: "Bvetra",
    subtitle: "Корпоративные трансферы",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bistreevetra-dT3BmcTG6oTUTMzWXCePbJQpqPjBAj.png",
    category: "Web Development",
    results: "+80% заказов",
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Истории успеха</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Узнайте, как мы помогаем бизнесу расти с помощью современных технологий
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group">
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                      {study.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold">{study.title}</h3>
                  <p className="mb-4 text-muted-foreground">{study.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{study.results}</span>
                    <Button variant="ghost" size="sm" className="gap-2">
                      Читать кейс
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
