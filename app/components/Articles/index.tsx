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
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-lightgrey py-20" id="blog-section">
      <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
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
              className="bg-white m-3 px-3 pt-3 pb-12 my-10 shadow-lg rounded-3xl relative"
            >
              <Link href={`/articles/${item.slug}`} className="block">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={389}
                  height={262}
                  className="inline-block m-auto rounded-xl"
                  itemProp="image"
                />
                <h3 className="absolute bg-blue text-white hover:bg-black hover:shadow-xl py-2 px-5 rounded-full article-img text-sm">
                  {item.readingTime} чтения
                </h3>
                <h4 className="text-xl font-bold pt-6 text-black" itemProp="headline">
                  {item.title}
                </h4>
                <h4 className="text-xl font-bold pt-1 text-black">{item.subtitle}</h4>
                <div className="mt-4">
                  <p className="text-sm text-gray-500" itemProp="author">{item.author}</p>
                  <p className="text-sm text-gray-500" itemProp="datePublished">{item.date}</p>
                </div>
              </Link>
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
}
