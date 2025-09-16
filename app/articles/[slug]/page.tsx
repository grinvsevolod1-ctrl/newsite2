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
  const idx = articlesData.findIndex((a) => a.slug === params.slug);
  if (idx === -1) return notFound();

  const article = articlesData[idx];
  const prev = articlesData[idx - 1];
  const next = articlesData[idx + 1];

  // Объявляем функцию внутри компонента
  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch((err) => {
        console.error("Ошибка копирования:", err);
      });
    }
  };

  return (
    <article
      className="max-w-4xl mx-auto px-6 py-20"
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Хлебные крошки */}
      <nav
        className="text-sm mb-6"
        aria-label="Breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex flex-wrap gap-2">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" itemProp="item">
              <span itemProp="name">Главная</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li>/</li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/articles" itemProp="item">
              <span itemProp="name">Статьи</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li>/</li>
          <li className="text-gray-500">{article.title}</li>
        </ol>
      </nav>

      {/* Заголовки */}
      <h1 className="text-4xl font-bold text-center mb-4" itemProp="headline">
        {article.title}
      </h1>
      <h2 className="text-xl text-center text-gray-600 mb-6">{article.subtitle}</h2>

      {/* Обложка */}
      <div className="flex justify-center mb-10">
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={500}
          className="rounded-xl shadow-lg"
          itemProp="image"
        />
      </div>

      {/* Автор и дата */}
      <div className="text-sm text-center text-gray-500 mb-12">
        <span itemProp="author">{article.author}</span> •{" "}
        <time itemProp="datePublished">{article.date}</time>
      </div>

      {/* Тело статьи */}
      <div className="prose prose-lg max-w-none text-gray-800 mb-16" itemProp="articleBody">
        <p>{article.description}</p>

        <h3>Что мы сделали:</h3>
        <ul>
          <li>Интеграция Telegram-бота с CRM</li>
          <li>Автоматизация заявок и уведомлений</li>
          <li>Адаптация под мобильные и десктоп</li>
          <li>SEO-оптимизация и аналитика</li>
        </ul>

        <blockquote className="border-l-4 border-blue pl-4 italic text-gray-600">
          «Бот стал полноценным менеджером: он принимает заявки, проверяет пользователей и отправляет уведомления в Telegram и CRM.»
        </blockquote>

        <h3>Результат:</h3>
        <p>
          Сокращение времени обработки заявок на 70%, снижение нагрузки на команду, повышение конверсии через автоматизацию.
        </p>

        <h3>Как это работает:</h3>
        <p>
          Пользователь заходит в Telegram-бот, выбирает услугу, заполняет форму. Данные автоматически попадают в CRM, менеджер получает уведомление, а клиент — подтверждение.
        </p>
      </div>

      {/* Поделиться */}
      <div className="text-center mb-16">
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
          <button
            onClick={handleCopyLink}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition text-sm"
          >
            Скопировать ссылку
          </button>
        </div>
      </div>

      {/* Навигация Prev / Next */}
      <div className="flex justify-between border-t pt-6 text-sm mb-16">
        {prev ? (
          <Link href={`/articles/${prev.slug}`} className="text-blue hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/articles/${next.slug}`} className="text-blue hover:underline">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Похожие статьи */}
      <div className="border-t pt-10">
        <h3 className="text-2xl font-bold mb-6">Похожие статьи</h3>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {articlesData
            .filter((a) => a.slug !== article.slug)
            .slice(0, 3)
            .map((rel, i) => (
              <Link
                key={i}
                href={`/articles/${rel.slug}`}
                className="min-w-[260px] sm:min-w-0 bg-white rounded-xl shadow hover:shadow-lg transition flex-shrink-0"
              >
                <div className="relative w-full h-44">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    className="rounded-t-xl object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-1">{rel.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{rel.subtitle}</p>
                  <span className="text-xs text-gray-400">{rel.date}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}