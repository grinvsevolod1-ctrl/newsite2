export interface ServicePackage {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  priceInCents: number
  currency: string
  features: string[]
  featuresEn: string[]
  serviceType: "web" | "mobile" | "telegram" | "ai" | "desktop"
  popular?: boolean
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  // Web Development
  {
    id: "web-landing",
    name: "Лендинг",
    nameEn: "Landing Page",
    description: "Одностраничный сайт для презентации продукта или услуги",
    descriptionEn: "Single page website for product or service presentation",
    priceInCents: 50000, // $500
    currency: "USD",
    serviceType: "web",
    features: [
      "Адаптивный дизайн",
      "SEO оптимизация",
      "Форма обратной связи",
      "Интеграция с соцсетями",
      "1 месяц поддержки",
    ],
    featuresEn: [
      "Responsive design",
      "SEO optimization",
      "Contact form",
      "Social media integration",
      "1 month support",
    ],
  },
  {
    id: "web-corporate",
    name: "Корпоративный сайт",
    nameEn: "Corporate Website",
    description: "Многостраничный сайт для бизнеса",
    descriptionEn: "Multi-page website for business",
    priceInCents: 150000, // $1500
    currency: "USD",
    serviceType: "web",
    popular: true,
    features: ["До 10 страниц", "Админ панель", "SEO оптимизация", "Блог", "Мультиязычность", "3 месяца поддержки"],
    featuresEn: ["Up to 10 pages", "Admin panel", "SEO optimization", "Blog", "Multilingual", "3 months support"],
  },
  {
    id: "web-ecommerce",
    name: "Интернет-магазин",
    nameEn: "E-commerce",
    description: "Полнофункциональный интернет-магазин",
    descriptionEn: "Full-featured online store",
    priceInCents: 300000, // $3000
    currency: "USD",
    serviceType: "web",
    features: [
      "Каталог товаров",
      "Корзина и оплата",
      "Личный кабинет",
      "Админ панель",
      "Интеграция с платежными системами",
      "6 месяцев поддержки",
    ],
    featuresEn: [
      "Product catalog",
      "Cart and payment",
      "User dashboard",
      "Admin panel",
      "Payment gateway integration",
      "6 months support",
    ],
  },
  // Mobile Apps
  {
    id: "mobile-basic",
    name: "Мобильное приложение (базовое)",
    nameEn: "Mobile App (Basic)",
    description: "Простое мобильное приложение для iOS или Android",
    descriptionEn: "Simple mobile app for iOS or Android",
    priceInCents: 200000, // $2000
    currency: "USD",
    serviceType: "mobile",
    features: [
      "1 платформа (iOS или Android)",
      "До 5 экранов",
      "Push уведомления",
      "Базовая аналитика",
      "3 месяца поддержки",
    ],
    featuresEn: [
      "1 platform (iOS or Android)",
      "Up to 5 screens",
      "Push notifications",
      "Basic analytics",
      "3 months support",
    ],
  },
  {
    id: "mobile-advanced",
    name: "Мобильное приложение (продвинутое)",
    nameEn: "Mobile App (Advanced)",
    description: "Кроссплатформенное приложение с расширенным функционалом",
    descriptionEn: "Cross-platform app with advanced features",
    priceInCents: 400000, // $4000
    currency: "USD",
    serviceType: "mobile",
    popular: true,
    features: [
      "iOS и Android",
      "Неограниченное количество экранов",
      "Backend интеграция",
      "Push уведомления",
      "Аналитика и метрики",
      "6 месяцев поддержки",
    ],
    featuresEn: [
      "iOS and Android",
      "Unlimited screens",
      "Backend integration",
      "Push notifications",
      "Analytics and metrics",
      "6 months support",
    ],
  },
  // Telegram Bots
  {
    id: "telegram-basic",
    name: "Telegram бот (базовый)",
    nameEn: "Telegram Bot (Basic)",
    description: "Простой бот для автоматизации задач",
    descriptionEn: "Simple bot for task automation",
    priceInCents: 30000, // $300
    currency: "USD",
    serviceType: "telegram",
    features: ["До 10 команд", "Базовая логика", "Интеграция с API", "1 месяц поддержки"],
    featuresEn: ["Up to 10 commands", "Basic logic", "API integration", "1 month support"],
  },
  {
    id: "telegram-advanced",
    name: "Telegram бот (продвинутый)",
    nameEn: "Telegram Bot (Advanced)",
    description: "Бот с AI и расширенным функционалом",
    descriptionEn: "Bot with AI and advanced features",
    priceInCents: 80000, // $800
    currency: "USD",
    serviceType: "telegram",
    popular: true,
    features: [
      "Неограниченные команды",
      "AI интеграция",
      "База данных",
      "Админ панель",
      "Платежи",
      "3 месяца поддержки",
    ],
    featuresEn: ["Unlimited commands", "AI integration", "Database", "Admin panel", "Payments", "3 months support"],
  },
  // AI Solutions
  {
    id: "ai-chatbot",
    name: "AI Чат-бот",
    nameEn: "AI Chatbot",
    description: "Умный чат-бот с обработкой естественного языка",
    descriptionEn: "Smart chatbot with natural language processing",
    priceInCents: 100000, // $1000
    currency: "USD",
    serviceType: "ai",
    features: [
      "GPT-4 интеграция",
      "Обучение на ваших данных",
      "Мультиязычность",
      "Веб-интеграция",
      "3 месяца поддержки",
    ],
    featuresEn: ["GPT-4 integration", "Training on your data", "Multilingual", "Web integration", "3 months support"],
  },
]
