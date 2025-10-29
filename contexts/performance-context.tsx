"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useDevicePerformance, type PerformanceMode } from "@/hooks/use-device-performance"

interface PerformanceContextType {
  mode: PerformanceMode
  shouldAnimate: boolean
  shouldUseHeavyEffects: boolean
  shouldUseParticles: boolean
  shouldUseBlur: boolean
  cores: number
  memory: number
}

const PerformanceContext = createContext<PerformanceContextType>({
  mode: "high",
  shouldAnimate: true,
  shouldUseHeavyEffects: true,
  shouldUseParticles: true,
  shouldUseBlur: true,
  cores: 4,
  memory: 4,
})

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const { mode, cores, memory, prefersReducedMotion } = useDevicePerformance()

  const value: PerformanceContextType = {
    mode,
    cores,
    memory,
    shouldAnimate: mode !== "low" && !prefersReducedMotion,
    shouldUseHeavyEffects: mode === "high",
    shouldUseParticles: mode === "high",
    shouldUseBlur: mode !== "low",
  }

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>
}

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error("usePerformance must be used within PerformanceProvider")
  }
  return context
}
