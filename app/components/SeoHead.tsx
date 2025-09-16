// app/components/SeoHead.tsx
import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  canonical?: string;
}

const defaultSeo = {
  title: "NetNext.site — Адаптивные цифровые решения",
  description:
    "Мы создаём Telegram-ботов, мобильные приложения, CRM, сайты, брендинг и автоматизацию.",
  image: "https://netnext.site/images/og-default.jpg",
  url: "https://netnext.site",
  keywords:
    "NetNext, веб-разработка, Telegram-боты, CRM, мобильные приложения, брендинг, автоматизация, SMM",
  canonical: "https://netnext.site",
};

const SeoHead = ({
  title = defaultSeo.title,
  description = defaultSeo.description,
  image = defaultSeo.image,
  url = defaultSeo.url,
  keywords = defaultSeo.keywords,
  canonical = defaultSeo.canonical,
}: SeoProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Head>
);

export default SeoHead;
