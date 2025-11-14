'use client'

import { Shield, Award, Clock, HeadphonesIcon } from 'lucide-react'
import { useLocale } from '@/contexts/locale-context'

export function TrustBadges() {
  const { locale } = useLocale()

  const badges = [
    {
      icon: Shield,
      title: locale === 'ru' ? '100% Безопасность' : '100% Secure',
      description: locale === 'ru' ? 'Защита данных' : 'Data Protection',
    },
    {
      icon: Award,
      title: locale === 'ru' ? 'Сертифицированы' : 'Certified',
      description: locale === 'ru' ? 'ISO 9001' : 'ISO 9001',
    },
    {
      icon: Clock,
      title: locale === 'ru' ? 'В срок' : 'On Time',
      description: locale === 'ru' ? '98% проектов' : '98% projects',
    },
    {
      icon: HeadphonesIcon,
      title: locale === 'ru' ? 'Поддержка 24/7' : '24/7 Support',
      description: locale === 'ru' ? 'Всегда на связи' : 'Always Available',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-primary/10 hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-300 group"
        >
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <badge.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold mb-1">{badge.title}</h3>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}
