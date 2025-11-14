"use client"

import { useEffect, useRef, useState } from "react"
import { usePerformance } from "@/contexts/performance-context"

interface StatProps {
  end: number
  label: string
  suffix?: string
  prefix?: string
}

function AnimatedStat({ end, label, suffix = "", prefix = "" }: StatProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { shouldAnimate, mode } = usePerformance()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    if (!shouldAnimate || mode === "low") {
      setCount(end)
      return
    }

    const duration = mode === "medium" ? 1000 : 2000
    const steps = mode === "medium" ? 30 : 60
    const increment = end / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, end, shouldAnimate, mode])

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground md:text-base">{label}</div>
    </div>
  )
}

export function AnimatedStats() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <AnimatedStat end={150} suffix="+" label="Завершенных проектов" />
          <AnimatedStat end={98} suffix="%" label="Довольных клиентов" />
          <AnimatedStat end={50} suffix="+" label="Специалистов в команде" />
          <AnimatedStat end={5} suffix=" лет" label="На рынке" />
        </div>
      </div>
    </section>
  )
}
