"use client"

import { useLocale } from "@/contexts/locale-context"

export function TechnologiesSection() {
  const { locale } = useLocale()

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "TensorFlow",
    "PyTorch",
    "OpenAI",
    "AWS",
    "Docker",
    "Kubernetes",
  ]

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            {locale === "ru" ? "Технологии" : "Technologies"}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {locale === "ru"
              ? "Мы работаем с современными технологиями и инструментами"
              : "We work with modern technologies and tools"}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="px-8 py-4 rounded-full bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-default font-medium text-lg group hover:shadow-[0_0_30px_rgba(34,211,238,0.4),0_0_60px_rgba(34,211,238,0.2)]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="group-hover:text-primary transition-colors">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
