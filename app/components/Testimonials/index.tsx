"use client";
import Slider from "react-slick";
import React, { Component } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface DataType {
  profession: string;
  comment: string;
  imgSrc: string;
  name: string;
}

const postData: DataType[] = [
  {
    name: "Алексей",
    profession: "Владелец пиццерии",
    comment:
      "NetNext создали Telegram-бот, который полностью автоматизировал приём заказов. Это не просто удобно — это магия.",
    imgSrc: "/images/testimonial/user1.svg",
  },
  {
    name: "Мария",
    profession: "Маркетолог",
    comment:
      "Мы получили не просто сайт, а систему, которая адаптируется под клиента и собирает аналитику в реальном времени.",
    imgSrc: "/images/testimonial/user2.svg",
  },
  {
    name: "Игорь",
    profession: "Основатель стартапа",
    comment:
      "Каждый модуль — как Lego: можно масштабировать, менять, интегрировать. Это архитектура будущего.",
    imgSrc: "/images/testimonial/user3.svg",
  },
  {
    name: "Ольга",
    profession: "Директор по бренду",
    comment:
      "Визуальная система от NetNext — это стиль, который работает в Telegram, Instagram и на сайте. Всё едино и масштабируемо.",
    imgSrc: "/images/testimonial/user4.svg",
  },
  {
    name: "Дмитрий",
    profession: "Технический директор",
    comment:
      "Поддержка сайта и CRM от NetNext — это стабильность, скорость и прозрачность. Telegram-уведомления — отдельный кайф.",
    imgSrc: "/images/testimonial/user5.svg",
  },
];

export default class Testimonials extends Component {
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
          breakpoint: 800,
          settings: { slidesToShow: 1 },
        },
      ],
    };

    return (
      <div className="bg-testimonial pt-40 pb-32 lg:py-32" id="testimonial-section">
        <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl sm:text-6xl font-bold text-black my-3">Отзывы клиентов</h3>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
              Мы не просто создаём решения — мы сопровождаем, масштабируем и интегрируем. Вот что говорят те, кто уже работает с нами.
            </p>
          </div>

          <Slider {...settings}>
            {postData.map((items, i) => (
              <div key={i} className="relative">
                <div className="bg-white shadow-lg m-3 p-10 my-10 rounded-3xl h-full flex flex-col justify-between">
                  <Image
                    src={items.imgSrc}
                    alt={items.name}
                    width={71}
                    height={71}
                    className="inline-block m-auto absolute -top-10 left-1/2 -translate-x-1/2 rounded-full border border-gray-300 bg-white"
                  />
                  <h4 className="text-base font-medium text-gray-700 my-6">{items.comment}</h4>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-semibold">{items.name}</h3>
                      <h3 className="text-xs font-medium opacity-50">{items.profession}</h3>
                    </div>
                    <div className="flex gap-1 text-yellow-400">
                      <StarIcon width={20} />
                      <StarIcon width={20} />
                      <StarIcon width={20} />
                      <StarIcon width={20} />
                      <StarIcon width={20} />
                    </div>
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
