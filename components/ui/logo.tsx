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
      svg: "w-6 h-5",
      text: "text-base",
      subtitle: "text-[8px]",
      gap: "gap-2",
    },
    md: {
      container: "h-12 w-12 sm:h-14 sm:w-14 md:h-14 md:w-14",
      svg: "w-7 h-6 sm:w-8 sm:h-7 md:w-9 md:h-8",
      text: "text-base sm:text-lg md:text-xl lg:text-2xl",
      subtitle: "text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs",
      gap: "gap-2 sm:gap-3",
    },
    lg: {
      container: "h-16 w-16 md:h-18 md:w-18",
      svg: "w-10 h-9 md:w-11 md:h-10",
      text: "text-xl md:text-2xl lg:text-3xl",
      subtitle: "text-[10px] md:text-xs",
      gap: "gap-3 md:gap-4",
    },
    xl: {
      container: "h-22 w-22 md:h-26 md:w-26",
      svg: "w-13 h-11 md:w-15 md:h-13",
      text: "text-2xl md:text-3xl lg:text-4xl",
      subtitle: "text-xs md:text-sm",
      gap: "gap-4 md:gap-5",
    },
  }

  const sizes = sizeClasses[size]

  const logoContent = (
    <>
      <div className={cn("relative flex-shrink-0 translate-y-[11px]", sizes.container)}>
        {animated && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-accent to-primary opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-300" />
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
      <Link
        href={href}
        className={cn("flex items-center group flex-shrink-0 min-w-0", sizes.gap, className)}
      >
        {logoContent}
      </Link>
    )
  }

  return (
    <div className={cn("flex items-center flex-shrink-0 min-w-0", sizes.gap, className)}>
      {logoContent}
    </div>
  )
}