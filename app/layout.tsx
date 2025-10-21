import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LocaleProvider } from "@/contexts/locale-context"
import { ToastProvider } from "@/contexts/toast-context"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"
import { AIChatWidget, CustomCursor, SimpleBackground, PageProgress, ScrollToTop } from "@/components/client-wrapper"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.netnext.site"),
  title: {
    default: "NetNext - Разработка сайтов и приложений в Минске, Беларусь | Студия веб-разработки",
    template: "%s | NetNext",
  },
  description:
    "Профессиональная разработка сайтов, мобильных приложений, Telegram ботов и AI решений в Минске. 50+ опытных разработчиков. Разработка под ключ для бизнеса в Беларуси и СНГ. ✓ Гарантия качества ✓ Поддержка 24/7",
  keywords: [
    "разработка сайтов Минск",
    "создание сайтов Беларусь",
    "разработка мобильных приложений Минск",
    "веб-студия Минск",
    "разработка под ключ",
    "создание интернет-магазина",
    "разработка Telegram ботов",
    "AI решения Беларусь",
    "IT аутсорсинг Минск",
    "веб-разработка РБ",
    "создание сайтов Гомель",
    "разработка приложений Брест",
    "веб-студия Гродно",
    "IT компания Беларусь",
    "NetNext",
    "React разработка",
    "Next.js Минск",
    "мобильная разработка iOS Android",
  ],
  authors: [{ name: "NetNext", url: "https://www.netnext.site" }],
  creator: "NetNext",
  publisher: "NetNext",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["be_BY", "en_US"],
    url: "https://www.netnext.site",
    siteName: "NetNext - Студия разработки",
    title: "NetNext - Разработка сайтов и приложений в Минске, Беларусь",
    description:
      "Профессиональная разработка сайтов, мобильных приложений и Telegram ботов в Минске. 50+ опытных разработчиков. Разработка под ключ для бизнеса в Беларуси.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NetNext - Студия разработки в Минске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetNext - Разработка сайтов и приложений в Минске",
    description: "Профессиональная разработка для бизнеса в Беларуси. 50+ опытных разработчиков.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.netnext.site",
    languages: {
      "ru-BY": "https://www.netnext.site",
      "be-BY": "https://www.netnext.site",
      "ru-RU": "https://www.netnext.site",
      en: "https://www.netnext.site/en",
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  other: {
    "geo.region": "BY",
    "geo.placename": "Minsk",
    "geo.position": "53.9006;27.559",
    ICBM: "53.9006, 27.559",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LocaleProvider>
          <ToastProvider>
            <Suspense fallback={null}>
              <ScrollToTop />
              <SimpleBackground />
              <CustomCursor />
              <PageProgress />
              <Header />
              <main>{children}</main>
              <Footer />
              <AIChatWidget />
            </Suspense>
          </ToastProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
