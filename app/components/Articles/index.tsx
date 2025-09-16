"use client";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { articlesData } from "@/app/lib/articlesData";

export default function ArticlesSlider() {
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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-lightgrey py-20" id="blog-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-blue text-sm font-medium tracking-widest uppercase">Статьи и кейсы</h3>
          <h3 className="text-4xl sm:text-6xl font-bold">Последние публикации</h3>
          <p className="text-md text-gray-600 mt-4 max-w-2xl mx-auto">
            Мы делимся архитектурой решений, примерами автоматизации и визуальными подходами. Всё, что помогает бизнесу адаптироваться.
          </p>
        </div>

        <Slider {...settings}>
          {articlesData.map((item, i) => (
            <article
              key={i}
              itemScope
              itemType="https://schema.org/Article"
              className="bg-white m-3 px-4 pt-4 pb-10 shadow-lg rounded-3xl relative flex flex-col justify-between"
            >
              <Link href={`/articles/${item.slug}`} className="block">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={389}
                  height={262}
                  className="rounded-xl mx-auto"
                  itemProp="image"
                />
                <div className="absolute top-4 left-4 bg-blue text-white text-xs px-4 py-2 rounded-full shadow-md">
                  {item.readingTime} чтения
                </div>
                <div className="mt-6">
                  <h4 className="text-xl font-bold text-black mb-2" itemProp="headline">
                    {item.title}
                  </h4>
                  <h5 className="text-md font-medium text-gray-700 mb-4">{item.subtitle}</h5>
                  <div className="text-sm text-gray-500">
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
