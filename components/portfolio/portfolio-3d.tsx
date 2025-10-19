"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Code, Smartphone, Bot, Sparkles, Monitor, Palette } from "lucide-react"
import { HolographicCard } from "@/components/effects/holographic-card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  url?: string
  category: string
  technologies: string[]
  stats: {
    label: string
    value: string
  }[]
}

const categoryIcons = {
  web: Code,
  mobile: Smartphone,
  bot: Bot,
  ai: Sparkles,
  desktop: Monitor,
  design: Palette,
}

interface Portfolio3DProps {
  projects: Project[]
}

export function Portfolio3D({ projects }: Portfolio3DProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const Icon = categoryIcons[project.category as keyof typeof categoryIcons] || Code

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <HolographicCard className="h-full">
                <div
                  className="relative h-full cursor-pointer overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-card/50 to-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/30"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project image */}
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 backdrop-blur-sm">
                      <Icon className="h-3 w-3 text-primary-foreground" />
                      <span className="text-xs font-medium text-primary-foreground">{project.category}</span>
                    </div>
                  </div>

                  {/* Project info */}
                  <h3 className="mb-2 text-lg font-bold text-foreground">{project.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {project.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label} className="rounded-lg bg-muted/50 p-2">
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                        <div className="font-bold text-foreground">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="text-center">
                      <ExternalLink className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <p className="text-sm font-medium text-white">Посмотреть детали</p>
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          )
        })}
      </div>

      {/* Project modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-primary/20 bg-background p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 rounded-full bg-muted p-2 transition-colors hover:bg-muted/80"
            >
              <span className="sr-only">Закрыть</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <h2 className="mb-2 text-3xl font-bold text-foreground">{selectedProject.title}</h2>
              <p className="text-muted-foreground">{selectedProject.description}</p>
            </div>

            {/* Live demo iframe */}
            {selectedProject.url && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">Живое демо</h3>
                <div className="aspect-video overflow-hidden rounded-xl border border-primary/20">
                  <iframe src={selectedProject.url} className="h-full w-full" title={selectedProject.title} />
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">Технологии</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">Результаты</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {selectedProject.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-4"
                  >
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedProject.url && (
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                <ExternalLink className="h-5 w-5" />
                Открыть проект
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
