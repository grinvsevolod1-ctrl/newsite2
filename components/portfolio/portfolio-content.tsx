"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useLocale } from "@/contexts/locale-context"
import { Filter, ArrowUpRight, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface Project {
  id: string
  title_ru: string
  title_en: string
  description_ru: string
  description_en: string
  category: string
  technologies: string[]
  image_url: string | null
  project_url: string | null
  client_name: string | null
  completion_date: string | null
  featured: boolean
}

interface PortfolioContentProps {
  projects: Project[]
}

export function PortfolioContent({ projects }: PortfolioContentProps) {
  const { locale } = useLocale()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category")
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  const categories = useMemo(
    () => [
      { value: "all", label: locale === "ru" ? "Все проекты" : "All Projects" },
      { value: "web", label: locale === "ru" ? "Веб" : "Web" },
      { value: "mobile", label: locale === "ru" ? "Мобильные" : "Mobile" },
      { value: "bot", label: locale === "ru" ? "Боты" : "Bots" },
      { value: "ai", label: locale === "ru" ? "AI" : "AI" },
      { value: "desktop", label: locale === "ru" ? "Десктоп" : "Desktop" },
      { value: "design", label: locale === "ru" ? "Дизайн" : "Design" },
    ],
    [locale],
  )

  const sortedProjects = useMemo(() => {
    const filtered = selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)
    return [...filtered].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
  }, [projects, selectedCategory])

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value)
  }, [])

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredProject(id)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredProject(null)
  }, [])

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-primary/10 mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              {locale === "ru" ? "Наши лучшие работы" : "Our Best Work"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            {locale === "ru" ? "Портфолио" : "Portfolio"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {locale === "ru"
              ? "Успешные проекты, которые мы реализовали для наших клиентов по всему миру"
              : "Successful projects we've delivered for our clients worldwide"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12 sm:mb-16 items-center px-2">
          <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 min-h-[44px] ${
                selectedCategory === category.value
                  ? "bg-gradient-to-r from-primary to-accent text-black shadow-lg shadow-primary/25 scale-105"
                  : "bg-white/[0.04] backdrop-blur-md border border-white/10 text-white hover:bg-white/[0.08] hover:border-primary/30 hover:scale-105 active:scale-95"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {sortedProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/[0.04] backdrop-blur-md border border-primary/10 mb-6">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <p className="text-xl text-muted-foreground">
              {locale === "ru" ? "Проекты скоро появятся" : "Projects coming soon"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {sortedProjects.map((project, index) => {
              const isFirstFeatured = project.featured && index === 0

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={handleMouseLeave}
                  className={`group relative rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-md border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 ${
                    isFirstFeatured ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {project.image_url && (
                    <div
                      className={`relative overflow-hidden bg-muted ${isFirstFeatured ? "h-64 sm:h-96" : "h-48 sm:h-64"}`}
                    >
                      <Image
                        src={project.image_url || "/placeholder.svg"}
                        alt={locale === "ru" ? project.title_ru : project.title_en}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzIwMjAyMCIvPjwvc3ZnPg=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {project.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-black text-xs font-bold flex items-center gap-1.5 shadow-lg">
                          <Sparkles className="h-3 w-3" />
                          {locale === "ru" ? "Избранное" : "Featured"}
                        </div>
                      )}

                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <div className="px-6 py-3 rounded-full bg-white text-black font-semibold flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {locale === "ru" ? "Посмотреть проект" : "View Project"}
                            <ArrowUpRight className="h-5 w-5" />
                          </div>
                        </a>
                      )}
                    </div>
                  )}

                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {locale === "ru" ? project.title_ru : project.title_en}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                        {locale === "ru" ? project.description_ru : project.description_en}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/10 text-xs text-white/80 hover:bg-white/[0.1] hover:border-primary/30 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.client_name && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-muted-foreground">
                          {locale === "ru" ? "Клиент:" : "Client:"}{" "}
                          <span className="text-white font-medium">{project.client_name}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6,182,212,0.15), transparent 50%)",
                    }}
                  />
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-16 sm:mt-20 text-center px-4">
          <div className="inline-flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 md:p-12 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {locale === "ru" ? "Готовы начать свой проект?" : "Ready to start your project?"}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {locale === "ru"
                ? "Свяжитесь с нами, и мы создадим что-то удивительное вместе"
                : "Get in touch and let's create something amazing together"}
            </p>
            <Link
              href="/contacts"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-primary to-accent text-black font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 min-h-[44px]"
            >
              {locale === "ru" ? "Связаться с нами" : "Contact Us"}
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
