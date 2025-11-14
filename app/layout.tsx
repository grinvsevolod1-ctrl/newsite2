import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LocaleProvider } from "@/contexts/locale-context";
import { ToastProvider } from "@/contexts/toast-context";
import { PerformanceProvider } from "@/contexts/performance-context";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { StructuredData } from "@/components/seo/structured-data";
import { Suspense } from "react";
import { ClientWrapper } from "@/components/client-wrapper";
import Script from "next/script";
import "./globals.css";
import { LoadingScreen } from "@/components/ui/loading-screen";

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
    "NetNext",
    "React разработка",
    "Next.js Минск",
    "мобильная разработка iOS Android",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://www.netnext.site",
    siteName: "NetNext - Студия разработки",
    title: "NetNext - Разработка сайтов и приложений в Минске, Беларусь",
    description:
      "Профессиональная разработка сайтов, мобильных приложений и Telegram ботов в Минске.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NetNext - Студия разработки" }],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <StructuredData />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NetNext" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#22d3ee" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="preload" as="image" href="/icon-192.jpg" />
        <Script
          id="google-tag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17669639829"
        />
        <Script
          id="google-tag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17669639829');
            `,
          }}
        />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');
              
              ym(104824175, 'init', {
                ssr:true,
                webvisor:true,
                clickmap:true,
                ecommerce:"dataLayer",
                accurateTrackBounce:true,
                trackLinks:true
              });
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LoadingScreen />
        <LocaleProvider>
          <ToastProvider>
            <PerformanceProvider>
              <Suspense fallback={null}>
                <Header />
                <main>{children}</main>
                <Footer />
                <ClientWrapper />
              </Suspense>
            </PerformanceProvider>
          </ToastProvider>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
