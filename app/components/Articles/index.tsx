"use client";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { articlesData } from "@/app/lib/articlesData";
import { useState } from "react";

export default function ArticlesSlider() {
  const [articles, setArticles] = useState(articlesData);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    speed: 500,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 640, settings: { slidesToShow: 1, arrows: false, swipeToSlide: true } },
    ],
  };

  // Возможность менять порядок статей
  const shuffleArticles = () => {
    const shuffled = [...articles].sort(() => Math.random() - 0.5);
    setArticles(shuffled);
  };

  return (
    <section className="bg-lightgrey py-20" id="blog-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div className="text-center sm:text-left">
            <h3 className="text-blue text-sm font-medium tracking-widest uppercase">Статьи и кейсы</h3>
            <h3 className="text-4xl sm:text-6xl font-bold">Последние публикации</h3>
            <p className="text-md text-gray-600 mt-4 max-w-2xl">
              Мы делимся архитектурой решений, примерами автоматизации и визуальными подходами. Всё, что помогает бизнесу адаптироваться.
            </p>
          </div>
          <button
            onClick={shuffleArticles}
            className="mt-6 sm:mt-0 bg-blue text-white px-5 py-2 rounded-full hover:bg-hoblue transition text-sm"
          >
            Перемешать статьи
          </button>
        </div>

        <Slider {...settings}>
          {articles.map((item, i) => (
            <article
              key={i}
              itemScope
              itemType="https://schema.org/Article"
              className="bg-white flex flex-col justify-between m-3 p-4 shadow-lg rounded-3xl h-full"
            >
              <Link href={`/articles/${item.slug}`} className="block">
                <div className="relative w-full h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="rounded-xl object-cover"
                    itemProp="image"
                  />
                </div>
                <div className="mt-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-black mb-2" itemProp="headline">
                    {item.title}
                  </h4>
                  <h5 className="text-md font-medium text-gray-700 mb-4">{item.subtitle}</h5>
                  <div className="mt-auto text-sm text-gray-500">
                    <p itemProp="author">{item.author}</p>
                    <p itemProp="datePublished">{item.date}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
}
