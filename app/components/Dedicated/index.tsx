"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Алексей, владелец пиццерии",
    quote: "NetNext создали Telegram-бот, который полностью автоматизировал приём заказов. Это не просто удобно — это магия.",
  },
  {
    name: "Мария, маркетолог",
    quote: "Мы получили не просто сайт, а систему, которая адаптируется под клиента и собирает аналитику в реальном времени.",
  },
  {
    name: "Игорь, основатель стартапа",
    quote: "Каждый модуль — как Lego: можно масштабировать, менять, интегрировать. Это архитектура будущего.",
  },
];

const Dedicated = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Spiral */}
      <Image
        src="/images/dedicated/spiral.svg"
        height={272}
        width={686}
        alt="spiral-design"
        className="absolute left-0 top-0 hidden lg:block -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 my-40 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* COLUMN-1 */}
          <div>
            <Image
              src="/images/dedicated/man.svg"
              alt="founder-icon"
              width={420}
              height={540}
              className="mx-auto md:mx-0 rounded-2xl"
            />
          </div>

          {/* COLUMN-2 */}
          <div className="relative">
            <Image
              src="/images/dedicated/comma.svg"
              alt="comma-image"
              width={200}
              height={106}
              className="absolute top-0 left-0 hidden lg:block"
            />
            <h2 className="text-4xl lg:text-6xl font-bold sm:leading-tight mt-5 text-center lg:text-start text-darkpurple">
              Мы строим цифровые системы, которые адаптируются к людям
            </h2>
            <p className="font-medium text-gray-600 text-lg mt-5 text-center lg:text-start">
              NetNext — это студия, где каждый проект превращается в живую экосистему: от Telegram-ботов и мобильных приложений до брендинга и поддержки. Мы не просто делаем сайты — мы создаём адаптивные коммуникационные модули, которые работают в реальном времени.
            </p>
            <p className="text-lg font-semibold mt-12 lg:ml-32 text-center lg:text-start text-blue">
              Всеволод, основатель NetNext
            </p>

            <div className="mt-8 text-center lg:text-start">
              <Link
                href="/about"
                className="inline-block bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
              >
                Узнать больше о студии
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-darkpurple mb-6">Что говорят наши клиенты</h3>
          <div className="bg-lightgrey p-6 rounded-xl shadow transition">
            <p className="text-md text-gray-700 italic">“{testimonials[current].quote}”</p>
            <p className="text-sm text-gray-500 mt-2 text-right">— {testimonials[current].name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dedicated;
