import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/index";
import ChatBot from "./components/ChatBot/ChatBot";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NetNext.site — Адаптивные цифровые экосистемы",
  description:
    "Telegram-боты, мобильные приложения, CRM, брендинг, автоматизация и сопровождение. Всё адаптивно, масштабируемо и готово к интеграции.",
  metadataBase: new URL("https://netnext.site"),
  keywords:
    "NetNext, Telegram-боты, мобильные приложения, CRM, брендинг, автоматизация, сопровождение, веб-разработка",
  openGraph: {
    title: "NetNext.site — Адаптивные цифровые экосистемы",
    description:
      "Студия цифровых решений: Telegram-боты, мобильные приложения, CRM, брендинг и сопровождение.",
    url: "https://netnext.site",
    images: ["https://netnext.site/images/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetNext.site — Адаптивные цифровые экосистемы",
    description:
      "Telegram-боты, мобильные приложения, CRM, брендинг, автоматизация и сопровождение.",
    images: ["https://netnext.site/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://netnext.site",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" itemScope itemType="https://schema.org/Organization">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta itemProp="name" content="NetNext.site" />
        <meta itemProp="url" content="https://netnext.site" />
        <meta itemProp="telephone" content="+375291414555" />
        <meta itemProp="sameAs" content="https://t.me/skufig1" />
        <meta itemProp="sameAs" content="https://instagram.com/netnext.site" />
        <meta itemProp="sameAs" content="https://wa.me/375291414555" />
      </head>
      <body>
        <Navbar />
        {children}
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}
