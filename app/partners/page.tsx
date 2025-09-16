import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Партнёрство — NetNext.site",
  description:
    "Мы строим цифровые экосистемы: Telegram-боты, CRM, сайты, визуальные системы. Всё адаптивно, сопровождаемо и масштабируемо.",
  keywords:
    "NetNext, партнёрство, Telegram, CRM, визуальные системы, сопровождение, адаптация, инвесторы",
  metadataBase: new URL("https://netnext.site"),
  openGraph: {
    title: "Партнёрство — NetNext.site",
    description:
      "Стратегическая витрина студии NetNext.site: философия, кейсы, команда, метрики и каналы связи.",
    url: "https://netnext.site/partners",
    images: ["https://netnext.site/images/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Партнёрство — NetNext.site",
    description:
      "Философия, кейсы, команда, метрики и каналы связи. Всё адаптивно и масштабируемо.",
    images: ["https://netnext.site/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://netnext.site/partners",
  },
};

export default function PartnersPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Философия */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">NetNext.site — партнёрство в адаптации</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Мы не просто создаём цифровые продукты. Мы строим экосистемы, которые адаптируются под бизнес, команду и пользователя. Telegram-боты, мобильные приложения, CRM, визуальные системы — всё масштабируемо, сопровождаемо и готово к интеграции.
        </p>
      </div>

      {/* Метрики */}
      <div className="mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {[
          {
            title: "7+ каналов",
            desc: "Telegram, WhatsApp, Viber, Instagram, Email, Web, CRM",
          },
          {
            title: "100% адаптация",
            desc: "Мобильные, десктоп, мессенджеры, API",
          },
          {
            title: "Модульная архитектура",
            desc: "Каждый блок — масштабируемый и переиспользуемый",
          },
          {
            title: "Сопровождение",
            desc: "Обновления, визуал, поддержка, Telegram-интеграции",
          },
        ].map((m, i) => (
          <div key={i} className="bg-lightgrey p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold">{m.title}</h3>
            <p className="text-sm text-gray-600">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Команда */}
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">Кто за этим стоит</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Команда NetNext.site — разработчики, архитекторы, дизайнеры и интеграторы. Мы работаем в связке, адаптируемся под задачи и создаём решения, которые живут долго.
        </p>
      </div>

      {/* Кейсы */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold mb-6">Выбранные кейсы</h2>
        <p className="text-gray-600 mb-4">
          Telegram-боты, мобильные приложения, CRM-интеграции, визуальные системы — всё адаптировано под реальные задачи.
        </p>
        <Link
          href="/featured"
          className="inline-block bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
        >
          Смотреть кейсы
        </Link>
      </div>

      {/* Связь */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Готовы обсудить партнёрство?</h2>
        <p className="text-gray-600 mb-6">Свяжитесь с нами через Telegram или email — мы адаптируемся под ваш формат.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="https://t.me/skufig1"
            target="_blank"
            className="bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
          >
            Telegram
          </Link>
          <Link
            href="mailto:info@netnext.site"
            className="bg-darkblue text-white px-6 py-3 rounded-full hover:bg-black transition"
          >
            Email
          </Link>
          <Link
            href="https://wa.me/375291414555"
            target="_blank"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            WhatsApp
          </Link>
          <Link
            href="viber://chat?number=+375291414555"
            target="_blank"
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
          >
            Viber
          </Link>
        </div>
      </div>
    </section>
  );
}
