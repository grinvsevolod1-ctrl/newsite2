"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const cases = [
  {
    title: "Telegram-бот для доставки",
    image: "/images/site/1.png",
    description: "Меню, заказ, геолокация, уведомления — всё в одном потоке.",
  },
  {
    title: "Интернет-магазин колонии",
    image: "/images/site/2.png",
    description: "Закрытая система с авторизацией, каталогом и внутренними платежами.",
  },
  {
    title: "Цифровая витрина ТЦ",
    image: "/images/site/3.png",
    description: "Навигация, арендаторы, события, push-уведомления.",
  },
];

const Digital = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-2">
      <div className="mx-auto max-w-7xl px-4 my-40 pb-20 lg:pb-40 lg:px-8 bg-blue rounded-3xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-20 animate-fade-in">
          {/* COLUMN-1 */}
          <div className="lg:pl-16">
            <h3 className="text-sm font-medium text-white mb-4 tracking-widest text-center lg:text-start uppercase">
              О студии
            </h3>
            <h4 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-snug text-center lg:text-start">
              NetNext — цифровая студия<br /> адаптивных решений
            </h4>
            <p className="text-white text-md font-light mb-6 text-center lg:text-start max-w-xl">
              Мы создаём Telegram-ботов, мобильные приложения, сайты, CRM-интеграции и визуальные системы, которые масштабируются вместе с вашим бизнесом. Каждый проект — это модуль, который можно развивать.
            </p>
            <ul className="text-white text-sm list-disc list-inside mb-8 text-center lg:text-start">
              <li>Telegram-боты и автоматизация</li>
              <li>Мобильные приложения</li>
              <li>Адаптивные сайты и формы</li>
              <li>Интеграции с CRM и мессенджерами</li>
              <li>Брендинг и визуальные системы</li>
            </ul>
            <div className="text-center lg:text-start">
              <Link
                href="https://t.me/skufig1"
                target="_blank"
                className="text-md font-semibold text-white bg-btnblue py-4 px-10 hover:bg-hoblue rounded-full transition"
              >
                Обсудить проект
              </Link>
            </div>
          </div>

          {/* COLUMN-2 */}
          <div className="relative">
            <div className="lg:absolute right-0 top-0 animate-slide-in">
              <Image
                src="/images/digital/girldoodle.svg"
                alt="girldoodle"
                width={815}
                height={691}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* CASE SLIDER */}
        <div className="mt-20 px-4">
          <h3 className="text-xl font-semibold text-white text-center mb-6">Примеры наших решений</h3>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 text-center transition">
            <Image
              src={cases[current].image}
              alt={cases[current].title}
              width={600}
              height={320}
              className="rounded-md mx-auto mb-4"
            />
            <h4 className="text-lg font-semibold text-darkpurple">{cases[current].title}</h4>
            <p className="text-sm text-gray-600 mt-2">{cases[current].description}</p>
            <div className="flex justify-center gap-4 mt-6">
              {cases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full ${
                    current === i ? "bg-blue" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Digital;
