import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты — NetNext.site",
  description:
    "Свяжитесь с нами: Telegram, WhatsApp, Viber, email или через форму. Мы адаптируемся под ваш канал.",
  keywords:
    "NetNext, контакты, Telegram, WhatsApp, Viber, email, поддержка, связь",
  metadataBase: new URL("https://netnext.site"),
  openGraph: {
    title: "Контакты — NetNext.site",
    description:
      "Свяжитесь с NetNext.site через Telegram, WhatsApp, Viber, email или форму. Мы адаптируемся под ваш канал.",
    url: "https://netnext.site/contact",
    images: ["https://netnext.site/images/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты — NetNext.site",
    description:
      "Свяжитесь с NetNext.site через Telegram, WhatsApp, Viber, email или форму.",
    images: ["https://netnext.site/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://netnext.site/contact",
  },
};

export default function ContactPage() {
  return (
    <section
      className="max-w-5xl mx-auto px-6 py-20"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <h1 className="text-4xl font-bold text-center mb-6">Связаться с NetNext</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Мы доступны в Telegram, WhatsApp, Viber, Instagram и по email. Выберите удобный канал — мы адаптируемся.
      </p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16"
        itemScope
        itemType="https://schema.org/ContactPoint"
      >
        <meta itemProp="contactType" content="customer support" />
        <meta itemProp="areaServed" content="BY" />
        <meta itemProp="availableLanguage" content="Russian" />

        <div className="bg-lightgrey rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2">Telegram</h3>
          <Link
            href="https://t.me/skufig1"
            target="_blank"
            itemProp="sameAs"
            className="text-blue hover:underline"
          >
            @skufig1
          </Link>
        </div>

        <div className="bg-lightgrey rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2">WhatsApp / Viber</h3>
          <Link
            href="https://wa.me/375291414555"
            target="_blank"
            itemProp="sameAs"
            className="text-blue hover:underline"
          >
            +375 29 14 - 14 - 555
          </Link>
        </div>

        <div className="bg-lightgrey rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2">Instagram</h3>
          <Link
            href="https://instagram.com/netnext.site"
            target="_blank"
            itemProp="sameAs"
            className="text-blue hover:underline"
          >
            @netnext.site
          </Link>
        </div>

        <div className="bg-lightgrey rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <Link
            href="mailto:info@netnext.site"
            itemProp="email"
            className="text-blue hover:underline"
          >
            info@netnext.site
          </Link>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400">
        <p>Мы отвечаем быстро. Особенно в Telegram.</p>
      </div>
    </section>
  );
}
