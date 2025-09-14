"use client";
import Slider from "react-slick";
import React, { Component } from "react";
import Link from "next/link";

interface PlanType {
  title: string;
  price: string;
  description: string;
  features: string[];
}

const plans: PlanType[] = [
  {
    title: "Telegram-боты",
    price: "от $49/мес",
    description: "Поддержка, обновления, интеграции, аналитика",
    features: ["Хостинг и мониторинг", "Обновления по запросу", "Интеграция с CRM", "Telegram-уведомления"],
  },
  {
    title: "Мобильные приложения",
    price: "от $99/мес",
    description: "Поддержка, публикации, аналитика, push",
    features: ["App Store / Google Play", "Push-уведомления", "Обновления и багфиксы", "Аналитика и отчёты"],
  },
  {
    title: "Сайты и лендинги",
    price: "от $39/мес",
    description: "Хостинг, SEO, формы, Telegram-связь",
    features: ["Адаптивность", "Формы и заявки", "SEO и скорость", "Telegram-интеграция"],
  },
  {
    title: "CRM и интеграции",
    price: "от $59/мес",
    description: "Поддержка воронок, формы, API, Telegram",
    features: ["Webhook и API", "Формы с валидацией", "Интеграция с мессенджерами", "Автоматизация"],
  },
  {
    title: "SMM и визуальные системы",
    price: "от $29/мес",
    description: "Контент, визуал, публикации, Telegram-боты",
    features: ["Контент-план", "Публикации", "Брендинг", "Telegram-бот для SMM"],
  },
];

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      speed: 4000,
      autoplaySpeed: 3000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 800,
          settings: { slidesToShow: 1 },
        },
      ],
    };

    return (
      <div className="bg-wework py-32">
        <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-6xl font-bold text-black mb-4">Тарифы и подписка</h3>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
              Мы предлагаем гибкие планы поддержки для сайтов, приложений, Telegram-ботов и визуальных систем. Всё адаптировано под ваш бизнес.
            </p>
          </div>

          <Slider {...settings}>
            {plans.map((plan, i) => (
              <div key={i}>
                <div className="bg-white m-4 py-10 px-6 text-center shadow-xl rounded-3xl h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-darkpurple mb-2">{plan.title}</h4>
                    <p className="text-lg text-blue font-semibold mb-4">{plan.price}</p>
                    <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
                    <ul className="text-sm text-gray-500 list-disc list-inside text-left mb-6">
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
