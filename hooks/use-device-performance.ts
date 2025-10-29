"use client"

import { useState, useEffect } from "react"

export type PerformanceMode = "high" | "medium" | "low"

interface DevicePerformance {
  mode: PerformanceMode
  cores: number
  memory: number
  connection: string
  prefersReducedMotion: boolean
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    mode: "high",
    cores: 4,
    memory: 4,
    connection: "4g",
    prefersReducedMotion: false,
  })

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4
    const memory = (navigator as any).deviceMemory || 4
    const connection = (navigator as any).connection?.effectiveType || "4g"
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Определяем режим производительности
    let mode: PerformanceMode = "high"

    if (cores <= 2 || memory <= 2 || connection === "slow-2g" || connection === "2g" || prefersReducedMotion) {
      mode = "low"
    } else if (cores <= 4 || memory <= 4 || connection === "3g") {
      mode = "medium"
    }

    setPerformance({
      mode,
      cores,
      memory,
      connection,
      prefersReducedMotion,
    })

    // Сохраняем в localStorage для быстрого доступа
    localStorage.setItem("device-performance", mode)
  }, [])

  return performance
}
