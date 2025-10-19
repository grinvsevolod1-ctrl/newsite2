"use client"

import { useEffect, useRef } from "react"

export function BlobMorph() {
  const blobRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!blobRef.current) return

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01

      const path = `
        M ${200 + Math.sin(time) * 50},${150 + Math.cos(time * 1.2) * 30}
        C ${250 + Math.sin(time * 1.5) * 40},${100 + Math.cos(time) * 50}
          ${350 + Math.sin(time * 0.8) * 60},${120 + Math.cos(time * 1.3) * 40}
          ${400 + Math.sin(time * 1.1) * 30},${200 + Math.cos(time * 0.9) * 50}
        C ${380 + Math.sin(time * 1.4) * 40},${280 + Math.cos(time * 1.1) * 30}
          ${300 + Math.sin(time * 0.9) * 50},${320 + Math.cos(time * 1.5) * 40}
          ${200 + Math.sin(time) * 50},${300 + Math.cos(time * 0.7) * 30}
        C ${120 + Math.sin(time * 1.2) * 40},${280 + Math.cos(time * 1.4) * 50}
          ${100 + Math.sin(time * 0.6) * 30},${200 + Math.cos(time * 0.8) * 40}
          ${200 + Math.sin(time) * 50},${150 + Math.cos(time * 1.2) * 30}
        Z
      `

      if (blobRef.current) {
        blobRef.current.setAttribute("d", path)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <filter id="blob-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
        </defs>
        <path ref={blobRef} fill="url(#blob-gradient)" filter="url(#blob-blur)" />
      </svg>
    </div>
  )
}
