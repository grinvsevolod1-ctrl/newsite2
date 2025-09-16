"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import SeoSchema from "./SeoSchema";


interface ServiceBlock {
  heading: string;
  imgSrc: string;
  paragraph: string;
  slug: string;
}

const Aboutdata: ServiceBlock[] = [
  {
    heading: "Telegram-боты",
    imgSrc: "/images/aboutus/imgOne.svg",
    paragraph:
      "Адаптивные Telegram-боты для заказов, поддержки, верификации и интеграции с веб-платформами.",
    slug: "telegram-bots",
  },
  {
    heading: "Мобильные приложения",
    imgSrc: "/images/aboutus/imgTwo.svg",
    paragraph:
      "Кроссплатформенные приложения с нативным UX, API-интеграцией и возможностью масштабирования.",
    slug: "mobile-apps",
  },
  {
    heading: "Поддержка и SMM",
    imgSrc: "/images/aboutus/imgThree.svg",
    paragraph:
      "Контент, SEO, аналитика, публикации и продвижение в соцсетях после запуска проекта.",
    slug: "support-smm",
  },
  {
    heading: "Адаптивные сайты",
    imgSrc: "/images/aboutus/imgFour.svg",
    paragraph:
      "Модульные сайты с мультиканальной связью: Telegram, WhatsApp, Instagram, email и телефон.",
    slug: "adaptive-sites",
  },
  {
    heading: "Интеграции и CRM",
    imgSrc: "/images/aboutus/imgFive.svg",
    paragraph:
      "CRM, платёжные системы, формы, воронки и мессенджеры — всё работает на мобильных и десктопе.",
    slug: "crm-integrations",
  },
  {
    heading: "Брендинг и стиль",
    imgSrc: "/images/aboutus/imgSix.svg",
    paragraph:
      "Фирменный стиль, анимации, названия и визуальные паттерны, которые легко масштабируются.",
    slug: "branding-style",
  },
];

const Aboutus = () => {
  return (
    <>
      <SeoSchema />
      <section id="aboutus-section">
        <div className="mx-auto max-w-7xl px-4 py-24 my-32 lg:px-10 bg-lightgrey rounded-3xl relative">
          <Image
            src="/images/aboutus/dots.svg"
            width={100}
            height={100}
            alt="Декоративные точки"
            className="absolute bottom-1 -left-20"
          />
          <header className="text-center mb-12">
            <h3 className="text-blue text-lg tracking-widest">О НАС</h3>
            <h4 className="text-4xl lg:text-6xl font-bold">
              Что мы делаем для вашего роста
            </h4>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 lg:gap-x-32 gap-y-16">
            {Aboutdata.map((item, i) => (
              <article
                key={i}
                itemScope
                itemType="https://schema.org/Service"
                className="relative bg-white rounded-3xl pt-10 pl-8 pb-10 pr-6 shadow-xl group hover:bg-navyblue transition-all duration-300"
              >
                <Link
                  href={`/services/${item.slug}`}
                  title={`Подробнее о ${item.heading}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Перейти к услуге: ${item.heading}`}
                />
                <h4
                  itemProp="name"
                  className="text-2xl font-semibold text-black mb-5 group-hover:text-white relative z-20"
                >
                  {item.heading}
                </h4>
                <div className="flex justify-center mb-5 relative z-20">
                  <Image
                    src={item.imgSrc}
                    alt={`Иконка: ${item.heading}`}
                    width={100}
                    height={100}
                    itemProp="image"
                  />
                </div>
                <p
                  itemProp="description"
                  className="text-sm font-normal text-black group-hover:text-offwhite mb-5 relative z-20"
                >
                  {item.paragraph}
                </p>
                <span className="text-sm font-semibold group-hover:text-white text-blue hover:underline flex items-center gap-1 relative z-20">
                  Подробнее
                  <ChevronRightIcon width={20} height={20} />
                </span>
              </article>
            ))}
          </div>

          {/* CTA Block */}
          <div className="text-center mt-12">
            <h5 className="text-xl font-semibold text-darkpurple mb-4">
              Хотите обсудить проект или получить консультацию?
            </h5>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <Link
                href="https://t.me/skufig1"
                target="_blank"
                aria-label="Связаться через Telegram"
                className="inline-flex items-center gap-2 bg-blue text-white px-5 py-3 rounded-full hover:bg-hoblue transition"
              >
                <Image src="/images/footer/telegram.svg" alt="Telegram" width={20} height={20} />
                Telegram
              </Link>

              <Link
                href="mailto:info@netnext.site"
                aria-label="Написать на Email"
                className="inline-flex items-center gap-2 bg-blue text-white px-5 py-3 rounded-full hover:bg-hoblue transition"
              >
                <Image src="/images/footer/mail.svg" alt="Email" width={20} height={20} />
                Email
              </Link>

              <Link
                href="https://wa.me/375291234567"
                target="_blank"
                aria-label="Связаться через WhatsApp"
                className="inline-flex items-center gap-2 bg-blue text-white px-5 py-3 rounded-full hover:bg-hoblue transition"
              >
                <Image src="/images/footer/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
                WhatsApp
              </Link>

              <div
                className="inline-flex items-center gap-2 bg-blue text-white px-5 py-3 rounded-full hover:bg-hoblue transition"
                aria-label="Позвонить по телефону"
              >
                <Image
                  src="/images/footer/phone.svg"
                  alt="Phone"
                  width={20}
                  height={20}
                  className="block md:hidden"
                />
                <span className="hidden md:block">+375 29 14 - 14 - 555</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutus;
