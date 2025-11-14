"use client"

import { useEffect } from "react"
import { usePerformance } from "@/contexts/performance-context"

export function PerformanceMonitor() {
  const { performanceMode } = usePerformance()

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.setAttribute("data-performance", performanceMode)
    }
  }, [performanceMode])

  useEffect(() => {
    if (typeof window === "undefined" || performanceMode === "low") return

    let frameCount = 0
    let lastTime = performance.now()
    let fps = 60

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime

        if (fps < 30) {
          console.log("[v0] Low FPS detected:", fps, "- Consider enabling performance mode")
        }
      }

      requestAnimationFrame(measureFPS)
    }

    const rafId = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(rafId)
  }, [performanceMode])

  return null
}
