"use client";
import Slider from "react-slick";
import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";

interface DataType {
  time: string;
  heading: string;
  heading2: string;
  date: string;
  imgSrc: string;
  name: string;
  link: string;
}

const postData: DataType[] = [
  {
    time: "4 мин",
    heading: "Как Telegram-бот заменил менеджера",
    heading2: "Автоматизация заказов и верификации",
    name: "NetNext / Telegram",
    date: "Сентябрь 2025",
    imgSrc: "/images/articles/article.png",
    link: "/cases/telegram-bot",
  },
  {
    time: "3 мин",
    heading: "Визуальные системы в Instagram и CRM",
    heading2: "Как мы масштабируем брендинг",
    name: "NetNext / Брендинг",
    date: "Август 2025",
    imgSrc: "/images/articles/article2.png",
    link: "/services/branding-style",
  },
  {
    time: "5 мин",
    heading: "Сопровождение сайта как сервис",
    heading2: "Что входит в подписку NetNext",
    name: "NetNext / Поддержка",
    date: "Июль 2025",
    imgSrc: "/images/articles/article3.png",
    link: "/services/support",
  },
  {
    time: "6 мин",
    heading: "Интеграция Telegram + amoCRM",
    heading2: "Как мы автоматизируем воронки",
    name: "NetNext / Интеграции",
    date: "Июнь 2025",
    imgSrc: "/images/articles/article2.png",
    link: "/services/crm-integrations",
  },
  {
    time: "4 мин",
    heading: "Мобильное приложение для ТЦ",
    heading2: "Навигация, события, push",
    name: "NetNext / Приложения",
    date: "Май 2025",
    imgSrc: "/images/articles/article3.png",
    link: "/cases/mobile-app",
  },
];

export default class Articles extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 4000,
      cssEase: "ease-in-out",
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 1 },
        },
      ],
    };

    return (
      <div className="bg-lightgrey py-20" id="blog-section">
        <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-blue text-sm font-medium tracking-widest uppercase">Статьи и кейсы</h3>
            <h3 className="text-4xl sm:text-6xl font-bold">Последние публикации</h3>
            <p className="text-md text-gray-600 mt-4 max-w-2xl mx-auto">
              Мы делимся архитектурой решений, примерами автоматизации и визуальными подходами. Всё, что помогает бизнесу адаптироваться.
            </p>
          </div>

          <Slider {...settings}>
            {postData.map((items, i) => (
              <div key={i}>
                <div className="bg-white m-3 px-3 pt-3 pb-12 my-10 shadow-lg rounded-3xl relative">
                  <Image
                    src={items.imgSrc}
                    alt={items.heading}
                    width={389}
                    height={262}
                    className="inline-block m-auto rounded-xl"
                  />
                  <Link href={items.link}>
                    <h3 className="absolute bg-blue text-white hover:bg-black hover:shadow-xl py-2 px-5 rounded-full article-img text-sm">
                      {items.time} чтения
                    </h3>
                  </Link>
                  <h4 className="text-xl font-bold pt-6 text-black">{items.heading}</h4>
                  <h4 className="text-xl font-bold pt-1 text-black">{items.heading2}</h4>
                  <div className="mt-4">
                    <h3 className="text-sm text-gray-500">{items.name}</h3>
                    <h3 className="text-sm text-gray-500">{items.date}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
