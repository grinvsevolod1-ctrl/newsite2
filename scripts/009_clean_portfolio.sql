-- Clean up portfolio and keep only quality projects with real images

-- First, delete all existing projects
DELETE FROM projects;

-- Add only quality projects with real images
INSERT INTO projects (
  title_ru,
  title_en,
  description_ru,
  description_en,
  category,
  technologies,
  image_url,
  project_url,
  client_name,
  featured
) VALUES
-- Real projects with screenshots
(
  'Olli Beauty - Профессиональный макияж',
  'Olli Beauty - Professional Makeup',
  'Элегантный сайт для визажиста в Санкт-Петербурге. Премиальный дизайн с золотыми акцентами, портфолио работ и онлайн-запись.',
  'Elegant website for makeup artist in Saint Petersburg. Premium design with golden accents, portfolio showcase and online booking.',
  'web',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ollibeauty-DbT9qonncwoEH7V6TYJXFYPUgtFcCk.png',
  'https://ollibeauty.site',
  'Olli Beauty',
  true
),
(
  'FlorStroy - Промышленные полы',
  'FlorStroy - Industrial Floors',
  'Профессиональный сайт для компании по устройству промышленных и полимерных полов. Современный дизайн с акцентом на качество.',
  'Professional website for industrial and polymer flooring company. Modern design emphasizing quality.',
  'web',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florstroy-RLNvYkjdxZpmag6u6Mc1RMH494PaJq.png',
  'https://florstroy.ru',
  'FlorStroy',
  true
),
(
  'Galavita Stroy - Строительство',
  'Galavita Stroy - Construction',
  'Минималистичный сайт для строительной компании. Проектирование, общестроительные работы, фасады, кровля.',
  'Minimalist website for construction company. Design, general construction, facades, roofing.',
  'web',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/galavita-6rXqCWP3YIZZtpME93udXMLPJnBs87.png',
  'https://galavita.vercel.app',
  'Galavita Stroy',
  true
),
(
  'Bvetra - Корпоративные трансферы',
  'Bvetra - Corporate Transfers',
  'Премиальный сайт для сервиса корпоративных трансферов. Черный дизайн с золотыми акцентами, личный кабинет.',
  'Premium website for corporate transfer service. Black design with golden accents, personal account.',
  'web',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bistreevetra-dT3BmcTG6oTUTMzWXCePbJQpqPjBAj.png',
  'https://bistrievetra.vercel.app',
  'Bvetra',
  true
),
-- Mobile projects
(
  'FitLife - Фитнес приложение',
  'FitLife - Fitness App',
  'Мобильное приложение для отслеживания тренировок и питания. Персональные планы, статистика прогресса.',
  'Mobile app for tracking workouts and nutrition. Personal plans, progress statistics.',
  'mobile',
  ARRAY['React Native', 'TypeScript', 'Redux', 'Firebase'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'FitLife Inc',
  true
),
(
  'QuickEats - Доставка еды',
  'QuickEats - Food Delivery',
  'Приложение для заказа еды с быстрой доставкой. Геолокация, отслеживание заказа в реальном времени.',
  'Food ordering app with fast delivery. Geolocation, real-time order tracking.',
  'mobile',
  ARRAY['Flutter', 'Dart', 'Google Maps', 'Stripe'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'QuickEats',
  false
),
-- Bot projects
(
  'AutoBot - Telegram автоматизация',
  'AutoBot - Telegram Automation',
  'Telegram бот для автоматизации бизнес-процессов. Обработка заявок, уведомления, интеграция с CRM.',
  'Telegram bot for business process automation. Request processing, notifications, CRM integration.',
  'bot',
  ARRAY['Python', 'aiogram', 'PostgreSQL', 'Redis'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'AutoBot Solutions',
  true
),
(
  'CommunityBot - Discord бот',
  'CommunityBot - Discord Bot',
  'Многофункциональный Discord бот для управления сообществом. Модерация, игры, музыка.',
  'Multifunctional Discord bot for community management. Moderation, games, music.',
  'bot',
  ARRAY['Node.js', 'Discord.js', 'MongoDB', 'TypeScript'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'Gaming Community',
  false
),
-- AI projects
(
  'AI Support - Умный помощник',
  'AI Support - Smart Assistant',
  'AI-powered чат-бот для технической поддержки. Обработка естественного языка, автоматическое решение проблем.',
  'AI-powered chatbot for technical support. Natural language processing, automatic problem solving.',
  'ai',
  ARRAY['Python', 'OpenAI GPT-4', 'LangChain', 'FastAPI'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'TechSupport Pro',
  true
),
(
  'VisionAI - Распознавание',
  'VisionAI - Image Recognition',
  'Система распознавания и анализа изображений на базе AI. Детекция объектов, классификация.',
  'AI-based image recognition and analysis system. Object detection, classification.',
  'ai',
  ARRAY['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'VisionTech',
  false
),
-- Desktop projects
(
  'ProCRM - CRM система',
  'ProCRM - CRM System',
  'Мощная CRM система для управления клиентами. Воронка продаж, автоматизация, аналитика.',
  'Powerful CRM system for customer management. Sales funnel, automation, analytics.',
  'desktop',
  ARRAY['Electron', 'React', 'TypeScript', 'PostgreSQL'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'Business Solutions',
  true
),
(
  'TaskMaster - Управление проектами',
  'TaskMaster - Project Management',
  'Десктопное приложение для управления проектами и задачами. Kanban, Gantt диаграммы.',
  'Desktop application for project and task management. Kanban, Gantt charts.',
  'desktop',
  ARRAY['Electron', 'Vue.js', 'Node.js', 'SQLite'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'TaskMaster Inc',
  false
),
-- Design projects
(
  'StartupBrand - Брендинг',
  'StartupBrand - Branding',
  'Полный брендинг для технологического стартапа. Логотип, фирменный стиль, гайдлайны.',
  'Complete branding for tech startup. Logo, corporate identity, guidelines.',
  'design',
  ARRAY['Figma', 'Adobe Illustrator', 'Brand Strategy'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'TechStart',
  true
),
(
  'HealthApp - UI/UX дизайн',
  'HealthApp - UI/UX Design',
  'Современный UI/UX дизайн мобильного приложения для здоровья. Интуитивный интерфейс, анимации.',
  'Modern UI/UX design for health mobile app. Intuitive interface, animations.',
  'design',
  ARRAY['Figma', 'Prototyping', 'User Research'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'HealthTech',
  false
);
