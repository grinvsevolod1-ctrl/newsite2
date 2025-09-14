import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

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
    <div id="aboutus-section">
      <div className="mx-auto max-w-7xl px-4 py-24 my-32 lg:px-10 bg-lightgrey rounded-3xl relative">
        <Image
          src="/images/aboutus/dots.svg"
          width={100}
          height={100}
          alt="dots-image"
          className="absolute bottom-1 -left-20"
        />
        <h3 className="text-center text-blue text-lg tracking-widest">О НАС</h3>
        <h4 className="text-center text-4xl lg:text-6xl font-bold">
          Что мы делаем для вашего роста
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32 gap-y-16">
          {Aboutdata.map((item, i) => (
            <Link
              key={i}
              href={`/services/${item.slug}`}
              className="hover:bg-navyblue bg-white rounded-3xl pt-10 pl-8 pb-10 pr-6 shadow-xl group transition-all duration-300"
            >
              <h4 className="text-2xl font-semibold text-black mb-5 group-hover:text-white">
                {item.heading}
              </h4>
              <Image
                src={item.imgSrc}
                alt={item.heading}
                width={100}
                height={100}
                className="mb-5"
              />
              <p className="text-sm font-normal text-black group-hover:text-offwhite mb-5">
                {item.paragraph}
              </p>
              <span className="text-sm font-semibold group-hover:text-white text-blue hover:underline flex items-center gap-1">
                Подробнее
                <ChevronRightIcon width={20} height={20} />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA Block */}
        <div className="text-center mt-12">
          <h5 className="text-xl font-semibold text-darkpurple mb-4">
            Хотите обсудить проект или получить консультацию?
          </h5>
          <Link
            href="https://t.me/skufig1"
            target="_blank"
            className="inline-block bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
          >
            Связаться в Telegram
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
