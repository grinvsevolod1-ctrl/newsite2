import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { articlesData } from "@/app/lib/articlesData";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) return { title: "Статья не найдена | NetNext" };

  const fullUrl = `https://netnext.site/articles/${article.slug}`;
  const imageUrl = `https://netnext.site${article.image}`;

  return {
    title: `${article.title} | NetNext`,
    description: article.description,
    keywords: article.tags.join(", "),
    metadataBase: new URL("https://netnext.site"),
    openGraph: {
      title: article.title,
      description: article.description,
      url: fullUrl,
      images: [imageUrl],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  return (
    <article
      className="max-w-5xl mx-auto px-6 py-20"
      itemScope
      itemType="https://schema.org/Article"
    >
      <h1 className="text-4xl font-bold text-center mb-6" itemProp="headline">
        {article.title}
      </h1>
      <p className="text-center text-gray-600 mb-4" itemProp="description">
        {article.description}
      </p>
      <div className="flex justify-center mb-8">
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={500}
          className="rounded-xl"
          itemProp="image"
        />
      </div>
      <div className="text-center text-sm text-gray-400" itemProp="datePublished">
        {article.date}
      </div>
    </article>
  );
}
