"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" || target.tagName === "BUTTON" || target.tagName === "A",
      )
    }

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (isHidden) return null

  return (
    <>
      {/* Main cursor */}
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`h-4 w-4 rounded-full border-2 border-primary bg-primary/20 backdrop-blur-sm transition-transform duration-150 ${
            isPointer ? "scale-150" : "scale-100"
          }`}
        />
      </div>

      {/* Trailing cursor */}
      <div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`h-8 w-8 rounded-full border border-primary/30 transition-all duration-300 ${
            isPointer ? "scale-150 bg-primary/10" : "scale-100"
          }`}
        />
      </div>
    </>
  )
}
