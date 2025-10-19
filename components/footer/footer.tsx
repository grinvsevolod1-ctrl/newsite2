"use client"

import Link from "next/link"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/translations"
import { Instagram, Mail, Phone, MessageCircle } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  const { locale } = useLocale()
  const t = translations[locale]

  return (
    <footer className="border-t border-primary/20 bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <Logo size="md" showText={true} showSubtitle={false} animated={true} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === "ru"
                ? "Профессиональная разработка программного обеспечения для бизнеса по всему миру"
                : "Professional software development for businesses worldwide"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">{t.footer.company}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/portfolio"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{t.nav.portfolio}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{t.nav.careers}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/partnership"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{t.nav.partnership}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{t.nav.contacts}</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">{t.footer.legal}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{t.footer.privacy}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">{t.footer.terms}</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">{t.footer.contact}</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="tel:+375291414555"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+375 29 141 45 55</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@netnext.site"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>info@netnext.site</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/netnext.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <span>@netnext.site</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+375291414555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>Telegram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary/20 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NetNext. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
