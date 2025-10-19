import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LocaleProvider } from "@/contexts/locale-context"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { AIChatWidget } from "@/components/chat/ai-chat-widget"
import { StructuredData } from "@/components/seo/structured-data"
import { CustomCursor } from "@/components/effects/custom-cursor"
import { ParticlesBackground } from "@/components/effects/particles-background"
import { PageProgress } from "@/components/effects/page-progress"
import { ScrollToTop } from "@/components/effects/scroll-to-top"
import { Suspense } from "react"
import { WebGLBackground } from "@/components/effects/webgl-background"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.netnext.site"),
  title: {
    default: "NetNext - Premium Software Development Studio",
    template: "%s | NetNext",
  },
  description:
    "50+ professional developers creating innovative web, mobile, AI, and desktop solutions for businesses worldwide. Expert team delivering high-quality software development services.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "AI solutions",
    "telegram bots",
    "custom design",
    "NetNext",
    "Belarus developers",
    "offshore development",
    "IT outsourcing",
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
    alternateLocale: ["en_US"],
    url: "https://www.netnext.site",
    siteName: "NetNext",
    title: "NetNext - Premium Software Development Studio",
    description: "50+ professional developers creating innovative solutions for businesses worldwide",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NetNext - Software Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetNext - Premium Software Development Studio",
    description: "50+ professional developers creating innovative solutions for businesses worldwide",
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
      ru: "https://www.netnext.site",
      en: "https://www.netnext.site",
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
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
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LocaleProvider>
          <Suspense fallback={null}>
            <ScrollToTop />
            <WebGLBackground />
            <CustomCursor />
            <ParticlesBackground />
            <PageProgress />
            <Header />
            <main>{children}</main>
            <Footer />
            <AIChatWidget />
          </Suspense>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
