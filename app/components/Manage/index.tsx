"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";

const plans = [
  {
    heading: "Starter",
    priceMonthly: 49,
    priceYearly: 39,
    description: "Поддержка Telegram-ботов, лендингов и форм",
    features: [
      "Хостинг и мониторинг",
      "Обновления по запросу",
      "Telegram-уведомления",
      "Формы и заявки",
      "Базовая аналитика",
    ],
  },
  {
    heading: "Growth",
    priceMonthly: 89,
    priceYearly: 69,
    description: "Сопровождение сайтов, приложений и CRM",
    features: [
      "Обновления и багфиксы",
      "Интеграция с CRM",
      "Push-уведомления",
      "SEO и скорость",
      "Поддержка Telegram и email",
    ],
  },
  {
    heading: "Pro",
    priceMonthly: 149,
    priceYearly: 119,
    description: "Курирование всей цифровой экосистемы",
    features: [
      "Мультиканальная интеграция",
      "Аналитика и отчёты",
      "Контент и визуальные системы",
      "Автоматизация процессов",
      "Приоритетная поддержка",
    ],
  },
];

const Manage = () => {
  const [enabled, setEnabled] = useState(false);
  const billingType = enabled ? "monthly" : "yearly";

  return (
    <div id="services-section">
      <div className="mx-auto max-w-7xl sm:py-20 lg:px-8 my-16">
        <h3 className="text-center text-4xl sm:text-6xl font-black mb-6">
          Поддержка и сопровождение <br /> ваших цифровых решений
        </h3>
        <p className="text-center text-gray-600 text-md max-w-2xl mx-auto mb-10">
          Мы предлагаем гибкие тарифы для Telegram-ботов, сайтов, приложений и визуальных систем. Всё адаптировано под ваш бизнес и каналы связи.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <span className="text-sm font-medium">Оплата за год</span>
          <Switch
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
            className={`${
              enabled ? "bg-blue" : "bg-gray-400"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Переключить оплату</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="text-sm font-medium">Оплата за месяц</span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-xl p-8 text-center flex flex-col justify-between"
            >
              <div>
                <h4 className="text-2xl font-bold mb-2">{plan.heading}</h4>
                <h2 className="text-5xl font-extrabold text-blue mb-2">
                  ${billingType === "monthly" ? plan.priceMonthly : plan.priceYearly}
                </h2>
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                <ul className="text-sm text-gray-600 list-disc list-inside text-left mb-6">
                  {plan.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
              <Link
                href="https://t.me/skufig1"
                target="_blank"
                className="inline-block bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
              >
                Подключить
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manage;
