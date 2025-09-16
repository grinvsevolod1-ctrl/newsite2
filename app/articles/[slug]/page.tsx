import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { articlesData } from "@/app/lib/articlesData";
import Link from "next/link";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) return { title: "Статья не найдена | NetNext" };

  const fullUrl = `https://netnext.site/articles/${article.slug}`;
  const imageUrl = `https://netnext.site${article.image}`;

  return {
    title: `${article.title} | NetNext.site`,
    description: article.description,
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
      className="max-w-4xl mx-auto px-6 py-20"
      itemScope
      itemType="https://schema.org/Article"
    >
      <h1 className="text-4xl font-bold text-center mb-4" itemProp="headline">
        {article.title}
      </h1>
      <h2 className="text-xl text-center text-gray-600 mb-6">{article.subtitle}</h2>

      <div className="flex justify-center mb-10">
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={500}
          className="rounded-xl"
          itemProp="image"
        />
      </div>

      <div className="text-sm text-center text-gray-500 mb-12">
        <span itemProp="author">{article.author}</span> •{" "}
        <span itemProp="datePublished">{article.date}</span>
      </div>

      <div className="prose prose-lg max-w-none text-gray-800 mb-16" itemProp="articleBody">
        <p>{article.description}</p>

        <h3>Что мы сделали:</h3>
        <ul>
          <li>Интеграция Telegram-бота с CRM</li>
          <li>Автоматизация заявок и уведомлений</li>
          <li>Адаптация под мобильные и десктоп</li>
        </ul>

        <blockquote>
          «Бот стал полноценным менеджером: он принимает заявки, проверяет пользователей и отправляет уведомления в Telegram и CRM.»
        </blockquote>

        <h3>Результат:</h3>
        <p>
          Сокращение времени обработки заявок на 70%, снижение нагрузки на команду, повышение конверсии через автоматизацию.
        </p>
      </div>

      {/* Поделиться */}
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-4">Поделиться статьёй</h4>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href={`https://t.me/share/url?url=https://netnext.site/articles/${article.slug}`}
            target="_blank"
            className="bg-blue text-white px-4 py-2 rounded-full hover:bg-hoblue transition text-sm"
          >
            Telegram
          </Link>
          <Link
            href={`https://wa.me/?text=https://netnext.site/articles/${article.slug}`}
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition text-sm"
          >
            WhatsApp
          </Link>
          <Link
            href={`mailto:?subject=${article.title}&body=https://netnext.site/articles/${article.slug}`}
            className="bg-darkblue text-white px-4 py-2 rounded-full hover:bg-black transition text-sm"
          >
            Email
          </Link>
        </div>
      </div>
    </article>
  );
}
