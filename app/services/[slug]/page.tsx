import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

const serviceData = {
  "telegram-bots": {
    title: "Telegram-боты",
    description:
      "Адаптивные Telegram-боты для заказов, поддержки, верификации и интеграции с веб-платформами.",
    image: "/images/aboutus/imgOne.svg",
    benefits: [
      "Подключение к CRM и Google Sheets",
      "Автоматизация заказов и обратной связи",
      "Верификация пользователей и файлов",
      "Мобильная адаптация и кастомный UI",
    ],
    cases: [
      {
        title: "Бот для доставки еды",
        image: "/images/site/1.png",
        summary: "Меню, заказ, оплата, геолокация, Telegram-уведомления",
      },
    ],
  },
  "mobile-apps": {
    title: "Мобильные приложения",
    description:
      "Кроссплатформенные приложения с нативным UX, API-интеграцией и возможностью масштабирования.",
    image: "/images/aboutus/imgTwo.svg",
    benefits: [
      "React Native или Flutter",
      "Интеграция с Firebase, Telegram, Stripe",
      "Push-уведомления и офлайн-режим",
      "Публикация в App Store и Google Play",
    ],
    cases: [
      {
        title: "Приложение для торгового центра",
        image: "/images/site/3.png",
        summary: "Навигация, события, арендаторы, push-уведомления",
      },
    ],
  },
  "support-smm": {
    title: "Поддержка и SMM",
    description:
      "Контент, SEO, аналитика, публикации и продвижение в соцсетях после запуска проекта.",
    image: "/images/aboutus/imgThree.svg",
    benefits: [
      "Контент-план и визуальный стиль",
      "Публикации в Telegram, Instagram, VK",
      "Аналитика и A/B тестирование",
      "Автоматизация через ботов и формы",
    ],
    cases: [],
  },
  "adaptive-sites": {
    title: "Адаптивные сайты",
    description:
      "Модульные сайты с мультиканальной связью: Telegram, WhatsApp, Instagram, email и телефон.",
    image: "/images/aboutus/imgFour.svg",
    benefits: [
      "Next.js + Tailwind + Vercel",
      "Анимации, формы, маршруты",
      "Интеграция с мессенджерами",
      "Мобильная оптимизация",
    ],
    cases: [
      {
        title: "Сайт для колонии",
        image: "/images/site/2.png",
        summary: "Каталог, авторизация, закрытые разделы, адаптивный дизайн",
      },
    ],
  },
  "crm-integrations": {
    title: "Интеграции и CRM",
    description:
      "CRM, платёжные системы, формы, воронки и мессенджеры — всё работает на мобильных и десктопе.",
    image: "/images/aboutus/imgFive.svg",
    benefits: [
      "Интеграция с amoCRM, Bitrix, Tilda",
      "Webhook, API, Telegram-уведомления",
      "Формы с валидацией и мультиканальной связью",
      "Автоматизация воронок",
    ],
    cases: [],
  },
  "branding-style": {
    title: "Брендинг и стиль",
    description:
      "Фирменный стиль, анимации, названия и визуальные паттерны, которые легко масштабируются.",
    image: "/images/aboutus/imgSix.svg",
    benefits: [
      "Нейминг, логотип, цветовая система",
      "Адаптация под веб, соцсети, мобильные",
      "Анимации и микроинтеракции",
      "Документация и гайдлайн",
    ],
    cases: [],
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = serviceData[params.slug as keyof typeof serviceData];
  if (!service) return { title: "Услуга не найдена" };
  return {
    title: `${service.title} | NetNext`,
    description: service.description,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceData[params.slug as keyof typeof serviceData];
  if (!service) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center text-center">
        <Image src={service.image} alt={service.title} width={120} height={120} />
        <h1 className="text-4xl font-bold mt-6 mb-4">{service.title}</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">{service.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {service.benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-lightgrey rounded-xl p-4 text-sm text-gray-700 shadow hover:shadow-md transition"
            >
              {benefit}
            </div>
          ))}
        </div>

        {service.cases.length > 0 && (
          <div className="w-full mt-8">
            <h2 className="text-2xl font-semibold mb-4">Примеры реализации</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.cases.map((c, i) => (
                <div key={i} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                  <Image src={c.image} alt={c.title} width={400} height={240} />
                  <h3 className="mt-2 text-sm font-medium">{c.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{c.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link
            href="https://t.me/skufig1"
            target="_blank"
            className="bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
          >
            Связаться в Telegram
          </Link>
        </div>
      </div>
    </div>
  );
}
