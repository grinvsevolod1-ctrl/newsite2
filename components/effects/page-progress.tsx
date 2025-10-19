"use client"

import { useEffect, useState } from "react"

export function PageProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-background/50">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
