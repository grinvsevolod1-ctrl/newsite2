"use client"

import { useEffect, useRef, type ReactNode, memo } from "react"
import { usePerformance } from "@/contexts/performance-context"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
}

export const ScrollReveal = memo(function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const { shouldAnimate, mode } = usePerformance()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (!shouldAnimate || mode === "low") {
      element.style.opacity = "1"
      element.style.transform = "none"
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add("scroll-revealed")
              observer.disconnect()
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay, shouldAnimate, mode])

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(50px)"
      case "down":
        return "translateY(-50px)"
      case "left":
        return "translateX(50px)"
      case "right":
        return "translateX(-50px)"
      case "fade":
        return "translateY(0)"
      default:
        return "translateY(50px)"
    }
  }

  if (!shouldAnimate || mode === "low") {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-element ${className}`}
      style={{
        opacity: 0,
        transform: getInitialTransform(),
        transition:
          mode === "medium"
            ? "opacity 0.4s ease-out, transform 0.4s ease-out"
            : "opacity 0.6s ease-out, transform 0.6s ease-out",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
})
