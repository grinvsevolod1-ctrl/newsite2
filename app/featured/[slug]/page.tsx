import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { featuredData } from "@/app/lib/featuredData";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const item = featuredData.find((f) => f.slug === params.slug);
  if (!item) {
    return {
      title: "Кейс не найден | NetNext",
      description: "Запрашиваемый кейс не найден.",
    };
  }

  const fullUrl = `https://netnext.site/featured/${item.slug}`;
  const imageUrl = `https://netnext.site${item.image}`;

  return {
    title: `${item.title} | NetNext`,
    description: item.description,
    keywords: item.tags.join(", "),
    metadataBase: new URL("https://netnext.site"),
    openGraph: {
      title: item.title,
      description: item.description,
      url: fullUrl,
      images: [imageUrl],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export default function FeaturedPage({ params }: Props) {
  const item = featuredData.find((f) => f.slug === params.slug);
  if (!item) return notFound();

  return (
    <section
      className="max-w-5xl mx-auto px-6 py-20"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <h1 className="text-4xl font-bold text-center mb-6" itemProp="name">
        {item.title}
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto" itemProp="description">
        {item.description}
      </p>

      <div className="flex justify-center mb-12">
        <Image
          src={item.image}
          alt={item.title}
          width={800}
          height={500}
          className="rounded-xl"
          itemProp="image"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {item.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-lightgrey text-sm text-gray-700 px-4 py-2 rounded-full shadow"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
