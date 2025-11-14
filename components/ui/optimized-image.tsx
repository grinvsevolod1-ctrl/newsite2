"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={85}
        onLoad={() => setIsLoading(false)}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-lg grayscale" : "scale-100 blur-0 grayscale-0",
        )}
      />
    </div>
  )
}
