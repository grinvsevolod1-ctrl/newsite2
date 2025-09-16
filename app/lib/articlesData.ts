export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  readingTime: string;
  author: string;
  link: string;
}

export const articlesData: Article[] = [
  {
    slug: "telegram-bot-manager",
    title: "Как Telegram-бот заменил менеджера",
    subtitle: "Автоматизация заказов и верификации",
    description: "Мы рассказываем, как бот стал полноценным сотрудником: от заказов до воронок.",
    image: "/images/articles/article.png",
    tags: ["Telegram", "боты", "автоматизация"],
    date: "2025-09-01",
    readingTime: "4 мин",
    author: "NetNext / Telegram",
    link: "/cases/telegram-bot",
  },
  {
    slug: "branding-systems",
    title: "Визуальные системы в Instagram и CRM",
    subtitle: "Как мы масштабируем брендинг",
    description: "Паттерны, адаптация, визуальные гайды и интеграция с CRM.",
    image: "/images/articles/article2.png",
    tags: ["брендинг", "CRM", "Instagram"],
    date: "2025-08-15",
    readingTime: "3 мин",
    author: "NetNext / Брендинг",
    link: "/services/branding-style",
  },
  // Добавь остальные статьи по аналогии
];
