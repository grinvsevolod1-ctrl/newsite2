"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLocale } from "@/contexts/locale-context"
import { translations, type Locale } from "@/lib/translations"
import { Menu, Globe, ChevronDown, X } from "lucide-react"
import { UserMenu } from "./user-menu"
import { ContactPopup } from "./contact-popup"
import { Logo } from "@/components/ui/logo"

export function Header() {
  const { locale, setLocale } = useLocale()
  const t = translations[locale]
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavLinks = [
    { href: "/", label: t.nav.home },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/calculator", label: t.nav.calculator },
    { href: "/contacts", label: t.nav.contacts },
  ]

  const careerLinks = [
    { href: "/careers", label: t.nav.careers },
    { href: "/freelance", label: t.nav.freelance },
    { href: "/partnership", label: t.nav.partnership },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-2xl backdrop-saturate-[200%] border-b border-primary/30 shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between gap-2 sm:gap-4">
          <Logo
            size="md"
            showText={true}
            showSubtitle={true}
            subtitle={locale === "ru" ? "Студия разработки" : "Dev Studio"}
            animated={true}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className="text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-full px-4 py-2"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-full px-4 py-2"
                >
                  {locale === "ru" ? "Карьера" : "Career"}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-primary/30 shadow-xl">
                {careerLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="cursor-pointer hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
            <div className="flex md:hidden">
              <ContactPopup />
            </div>

            <div className="hidden md:flex">
              <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
                <SelectTrigger className="w-[85px] md:w-[100px] h-9 sm:h-10 bg-white/[0.05] backdrop-blur-md backdrop-saturate-[180%] border-primary/30 hover:bg-white/[0.08] hover:border-primary/50 transition-all rounded-full text-xs sm:text-sm">
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 text-primary flex-shrink-0" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/95 backdrop-blur-xl border-primary/30 shadow-xl">
                  <SelectItem value="ru">RU</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="hidden md:block">
              <UserMenu />
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-11 sm:w-11 bg-white/[0.05] backdrop-blur-md backdrop-saturate-[180%] border-primary/30 hover:bg-white/[0.08] hover:border-primary/50 rounded-full transition-all flex-shrink-0"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-[320px] sm:max-w-[360px] bg-black/98 backdrop-blur-2xl border-l border-primary/30 p-0 overflow-y-auto"
              >
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-primary/20 sticky top-0 bg-black/98 backdrop-blur-2xl z-10">
                  <Logo size="sm" showText={true} showSubtitle={false} animated={false} href={null} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-primary/10 flex-shrink-0"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col p-3 sm:p-4 space-y-0.5">
                  {mainNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm sm:text-base font-medium hover:text-primary transition-colors px-3 py-3 sm:px-4 sm:py-3.5 rounded-xl hover:bg-primary/10 active:bg-primary/20 min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="pt-3 border-t border-primary/20 mt-2">
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground px-3 sm:px-4 py-1.5 sm:py-2 font-semibold">
                      {locale === "ru" ? "Карьера" : "Career"}
                    </div>
                    {careerLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm sm:text-base font-medium hover:text-primary transition-colors px-3 py-3 sm:px-4 sm:py-3.5 rounded-xl hover:bg-primary/10 active:bg-primary/20 block min-h-[44px] flex items-center"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-primary/20 mt-2">
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground px-3 sm:px-4 py-1.5 sm:py-2 font-semibold">
                      {locale === "ru" ? "Язык" : "Language"}
                    </div>
                    <div className="px-3 sm:px-4">
                      <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
                        <SelectTrigger className="w-full h-11 sm:h-12 bg-white/[0.05] backdrop-blur-md backdrop-saturate-[180%] border-primary/30 hover:bg-white/[0.08] hover:border-primary/50 transition-all rounded-xl text-sm sm:text-base">
                          <Globe className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 backdrop-blur-xl border-primary/30 shadow-xl">
                          <SelectItem value="ru">Русский</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-primary/20 mt-2">
                    <UserMenu />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
