"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Phone, Mail, MessageCircle, Instagram } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/translations"

export function ContactPopup() {
  const { locale } = useLocale()
  const t = translations[locale]
  const [open, setOpen] = useState(false)

  const contacts = [
    {
      icon: Phone,
      label: locale === "ru" ? "Телефон" : "Phone",
      value: "+375 29 141 45 55",
      href: "tel:+375291414555",
      color: "text-green-400",
    },
    {
      icon: MessageCircle,
      label: "Telegram",
      value: "@netnext",
      href: "https://t.me/+375291414555",
      color: "text-blue-400",
    },
    {
      icon: Mail,
      label: locale === "ru" ? "Техподдержка" : "Support",
      value: "info@netnext.site",
      href: "mailto:info@netnext.site",
      color: "text-cyan-400",
    },
    {
      icon: Mail,
      label: locale === "ru" ? "Сотрудничество" : "Partnership",
      value: "team@netnext.site",
      href: "mailto:team@netnext.site",
      color: "text-purple-400",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@netnext.site",
      href: "https://instagram.com/netnext.site",
      color: "text-pink-400",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border-primary/20 hover:bg-primary/10 hover:scale-110 transition-all duration-300 animate-pulse-glow bg-transparent"
        >
          <Phone className="h-5 w-5 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/[0.06] backdrop-blur-xl backdrop-saturate-[200%] border-primary/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            {locale === "ru" ? "Свяжитесь с нами" : "Contact Us"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-md backdrop-saturate-[180%] border border-primary/10 hover:bg-white/[0.06] hover:backdrop-blur-xl hover:backdrop-saturate-[200%] hover:border-primary/15 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div
                className={`p-3 rounded-xl bg-background/50 ${contact.color} group-hover:scale-110 transition-transform`}
              >
                <contact.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">{contact.label}</div>
                <div className="font-semibold text-foreground">{contact.value}</div>
              </div>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
