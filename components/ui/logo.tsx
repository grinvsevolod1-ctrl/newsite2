import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  showSubtitle?: boolean
  subtitle?: string
  className?: string
  href?: string
  animated?: boolean
}

export function Logo({
  size = "md",
  showText = true,
  showSubtitle = false,
  subtitle = "СТУДИЯ РАЗРАБОТКИ",
  className,
  href = "/",
  animated = true,
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "h-8 w-8",
      svg: "w-5 h-4",
      text: "text-base",
      subtitle: "text-[8px]",
      gap: "gap-2",
    },
    md: {
      container: "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12",
      svg: "w-6 h-5 sm:w-7 sm:h-6 md:w-8 md:h-7",
      text: "text-base sm:text-lg md:text-xl lg:text-2xl",
      subtitle: "text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs",
      gap: "gap-2 sm:gap-3",
    },
    lg: {
      container: "h-14 w-14 md:h-16 md:w-16",
      svg: "w-9 h-8 md:w-10 md:h-9",
      text: "text-xl md:text-2xl lg:text-3xl",
      subtitle: "text-[10px] md:text-xs",
      gap: "gap-3 md:gap-4",
    },
    xl: {
      container: "h-20 w-20 md:h-24 md:w-24",
      svg: "w-12 h-10 md:w-14 md:h-12",
      text: "text-2xl md:text-3xl lg:text-4xl",
      subtitle: "text-xs md:text-sm",
      gap: "gap-4 md:gap-5",
    },
  }

  const sizes = sizeClasses[size]

  const logoContent = (
    <>
      <div className={cn("relative flex-shrink-0", sizes.container)}>
        {animated && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
        )}

        <div
          className={cn(
            "relative h-full w-full rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-lg shadow-primary/30",
            animated && "group-hover:scale-110 group-hover:rotate-6 transition-all duration-500",
          )}
        >
          <svg viewBox="0 0 50 40" className={sizes.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 32V8L12 16L20 8V32"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className={cn(animated && "group-hover:stroke-white transition-colors duration-300")}
            />
            <path
              d="M30 32V8L38 16L46 8V32"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className={cn(animated && "group-hover:stroke-white transition-colors duration-300")}
            />
          </svg>

          {animated && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
        </div>
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <span
            className={cn(
              "font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent truncate",
              sizes.text,
              animated &&
                "group-hover:from-accent group-hover:via-secondary group-hover:to-primary transition-all duration-500",
            )}
          >
            NetNext
          </span>
          {showSubtitle && (
            <span
              className={cn(
                "text-muted-foreground tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] -mt-0.5 sm:-mt-1 font-light uppercase truncate",
                sizes.subtitle,
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={cn("flex items-center group flex-shrink-0 min-w-0", sizes.gap, className)}>
        {logoContent}
      </Link>
    )
  }

  return <div className={cn("flex items-center flex-shrink-0 min-w-0", sizes.gap, className)}>{logoContent}</div>
}
