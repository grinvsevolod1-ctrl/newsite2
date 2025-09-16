"use client";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { featuredData } from "@/app/lib/featuredData";

function SampleNextArrow(props: { className: any; style: any; onClick: any }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.3)",
        padding: "28px",
        borderRadius: "20px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.3)",
        padding: "28px",
        borderRadius: "20px",
      }}
      onClick={onClick}
    />
  );
}

export default function FeaturedSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    speed: 500,
    nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
    prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <section className="bg-bgblue py-20 marginFeature bg-featured">
      <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
        <div className="text-center pt-48 pb-10 md:pt-96">
          <h3 className="text-4xl sm:text-6xl font-bold text-white my-2">Featured works.</h3>
          <h3 className="text-4xl sm:text-6xl font-bold text-white text-opacity-50 lg:mr-48 my-2">
            Featured works.
          </h3>
          <h3 className="text-4xl sm:text-6xl font-bold text-white text-opacity-25 lg:-mr-32 my-2">
            Featured works.
          </h3>
        </div>

        <Slider {...settings}>
          {featuredData.map((item, i) => (
            <article
              key={i}
              itemScope
              itemType="https://schema.org/CreativeWork"
              className="bg-transparent m-3 pb-12 my-10 rounded-3xl"
            >
              <Link href={`/featured/${item.slug}`} className="block">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={636}
                  height={620}
                  className="rounded-2xl"
                  itemProp="image"
                />
                <div className="w-345 mt-6">
                  <h4
                    className="sm:text-5xl font-bold text-center sm:text-start text-white"
                    itemProp="name"
                  >
                    {item.title}
                  </h4>
                  <p className="text-white text-opacity-70 text-sm mt-2" itemProp="description">
                    {item.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
}
