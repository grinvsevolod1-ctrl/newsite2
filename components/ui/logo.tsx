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
      container: "h-9 w-9",
      text: "text-base",
      subtitle: "text-[8px]",
    },
    md: {
      container: "h-12 w-12 sm:h-14 sm:w-14 md:h-14 md:w-14",
      text: "text-base sm:text-lg md:text-xl lg:text-2xl",
      subtitle: "text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs",
    },
    lg: {
      container: "h-16 w-16 md:h-18 md:w-18",
      text: "text-xl md:text-2xl lg:text-3xl",
      subtitle: "text-[10px] md:text-xs",
    },
    xl: {
      container: "h-22 w-22 md:h-26 md:w-26",
      text: "text-2xl md:text-3xl lg:text-4xl",
      subtitle: "text-xs md:text-sm",
    },
  }

  const sizes = sizeClasses[size]

  const logoContent = (
    <div className="flex flex-col items-center">
      {/* NN блок */}
      <div className={cn("relative flex-shrink-0", sizes.container)}>
        {animated && (
          <div className="absolute -top-[5px] bottom-0 left-0 right-0 rounded-xl bg-gradient-to-br from-primary via-accent to-primary opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-300" />
        )}
        <div className="relative bg-gradient-to-br from-primary via-accent to-primary rounded-xl p-[1px] overflow-hidden">
          <div className="bg-black rounded-[11px] h-full w-full flex items-center justify-center px-1.5 sm:px-2">
            <span
              className={cn(
                "font-black bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tighter leading-none",
                sizes.text,
                animated && "group-hover:scale-110 transition-transform duration-300"
              )}
            >
              NN
            </span>
          </div>
        </div>
        {animated && (
          <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
        )}
      </div>

      {/* Текст под NN */}
      {showText && (
        <div className="flex flex-col items-center mt-2">
          <span
            className={cn(
              "font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent",
              sizes.text,
              animated &&
                "group-hover:from-accent group-hover:via-secondary group-hover:to-primary transition-all duration-500"
            )}
          >
            NetNext
          </span>
          {showSubtitle && (
            <span
              className={cn(
                "text-muted-foreground tracking-[0.1em] font-light uppercase",
                sizes.subtitle
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className={cn("flex flex-col items-center group", className)}>
        {logoContent}
      </Link>
    )
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {logoContent}
    </div>
  )
}
