-- Adding query parameters to all placeholder images for automatic generation
-- Add real portfolio projects with Olli Beauty as first featured project

-- Reordering projects to make Olli Beauty first featured project
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
-- Featured Web Projects
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
  'FlorStroy - Промышленные и полимерные полы',
  'FlorStroy - Industrial and Polymer Floors',
  'Профессиональный сайт для компании по устройству промышленных и полимерных полов. Современный дизайн с акцентом на качество и надежность услуг.',
  'Professional website for industrial and polymer flooring company. Modern design emphasizing quality and reliability of services.',
  'web',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Responsive Design'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florstroy-RLNvYkjdxZpmag6u6Mc1RMH494PaJq.png',
  'https://florstroy.ru',
  'FlorStroy',
  true
),
(
  'Galavita Stroy - Строительная компания',
  'Galavita Stroy - Construction Company',
  'Минималистичный сайт для строительной компании. Проектирование, общестроительные работы, фасады, кровля. Чистый дизайн с акцентом на надежность.',
  'Minimalist website for construction company. Design, general construction, facades, roofing. Clean design emphasizing reliability.',
  'web',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SEO'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/galavita-6rXqCWP3YIZZtpME93udXMLPJnBs87.png',
  'https://galavita.vercel.app',
  'Galavita Stroy',
  true
),
(
  'Bvetra - Корпоративные трансферы',
  'Bvetra - Corporate Transfers',
  'Премиальный сайт для сервиса корпоративных трансферов. Черный дизайн с золотыми акцентами, личный кабинет, онлайн-чат и система бронирования.',
  'Premium website for corporate transfer service. Black design with golden accents, personal account, online chat and booking system.',
  'web',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Real-time Chat'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bistreevetra-dT3BmcTG6oTUTMzWXCePbJQpqPjBAj.png',
  'https://bistrievetra.vercel.app',
  'Bvetra',
  true
),

-- Adding mobile app projects
(
  'FitLife - Фитнес приложение',
  'FitLife - Fitness Application',
  'Мобильное приложение для отслеживания тренировок и питания. Персональные планы, статистика прогресса, интеграция с носимыми устройствами.',
  'Mobile app for tracking workouts and nutrition. Personal plans, progress statistics, wearable device integration.',
  'mobile',
  ARRAY['React Native', 'TypeScript', 'Redux', 'Firebase', 'HealthKit'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'FitLife Inc',
  true
),
(
  'QuickEats - Доставка еды',
  'QuickEats - Food Delivery',
  'Приложение для заказа еды с быстрой доставкой. Геолокация, отслеживание заказа в реальном времени, интеграция с платежными системами.',
  'Food ordering app with fast delivery. Geolocation, real-time order tracking, payment system integration.',
  'mobile',
  ARRAY['Flutter', 'Dart', 'Google Maps API', 'Stripe', 'Push Notifications'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'QuickEats',
  false
),
(
  'SecureBank - Банковское приложение',
  'SecureBank - Banking Application',
  'Безопасное банковское приложение с биометрической аутентификацией. Переводы, платежи, управление картами, инвестиции.',
  'Secure banking app with biometric authentication. Transfers, payments, card management, investments.',
  'mobile',
  ARRAY['Swift', 'SwiftUI', 'Core Data', 'Face ID', 'Security'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'SecureBank',
  false
),

-- Adding bot projects
(
  'AutoBot - Telegram автоматизация',
  'AutoBot - Telegram Automation',
  'Telegram бот для автоматизации бизнес-процессов. Обработка заявок, уведомления, интеграция с CRM, аналитика.',
  'Telegram bot for business process automation. Request processing, notifications, CRM integration, analytics.',
  'bot',
  ARRAY['Python', 'aiogram', 'PostgreSQL', 'Redis', 'Docker'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'AutoBot Solutions',
  true
),
(
  'CommunityBot - Discord бот',
  'CommunityBot - Discord Bot',
  'Многофункциональный Discord бот для управления сообществом. Модерация, игры, музыка, статистика участников.',
  'Multifunctional Discord bot for community management. Moderation, games, music, member statistics.',
  'bot',
  ARRAY['Node.js', 'Discord.js', 'MongoDB', 'TypeScript'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'Gaming Community',
  false
),
(
  'BusinessBot - WhatsApp бот',
  'BusinessBot - WhatsApp Bot',
  'WhatsApp бот для бизнеса. Автоответы, прием заказов, консультации, интеграция с базой знаний.',
  'WhatsApp bot for business. Auto-replies, order processing, consultations, knowledge base integration.',
  'bot',
  ARRAY['Node.js', 'WhatsApp Business API', 'AI', 'MongoDB'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'Business Solutions',
  false
),

-- Adding AI projects
(
  'AI Support - Умный помощник поддержки',
  'AI Support - Smart Support Assistant',
  'AI-powered чат-бот для технической поддержки. Обработка естественного языка, автоматическое решение проблем, обучение на данных.',
  'AI-powered chatbot for technical support. Natural language processing, automatic problem solving, data-driven learning.',
  'ai',
  ARRAY['Python', 'OpenAI GPT-4', 'LangChain', 'Vector DB', 'FastAPI'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'TechSupport Pro',
  true
),
(
  'VisionAI - Распознавание изображений',
  'VisionAI - Image Recognition',
  'Система распознавания и анализа изображений на базе AI. Детекция объектов, классификация, сегментация, обработка в реальном времени.',
  'AI-based image recognition and analysis system. Object detection, classification, segmentation, real-time processing.',
  'ai',
  ARRAY['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'CUDA'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'VisionTech',
  false
),
(
  'DataInsight - AI аналитика',
  'DataInsight - AI Analytics',
  'AI помощник для анализа больших данных. Предиктивная аналитика, визуализация, автоматические отчеты, рекомендации.',
  'AI assistant for big data analysis. Predictive analytics, visualization, automatic reports, recommendations.',
  'ai',
  ARRAY['Python', 'Pandas', 'Scikit-learn', 'Plotly', 'Apache Spark'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'DataCorp',
  false
),

-- Adding desktop projects
(
  'ProCRM - CRM система',
  'ProCRM - CRM System',
  'Мощная CRM система для управления клиентами. Воронка продаж, автоматизация, аналитика, интеграция с почтой и телефонией.',
  'Powerful CRM system for customer management. Sales funnel, automation, analytics, email and telephony integration.',
  'desktop',
  ARRAY['Electron', 'React', 'TypeScript', 'PostgreSQL', 'REST API'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'Business Solutions',
  true
),
(
  'TaskMaster - Управление проектами',
  'TaskMaster - Project Management',
  'Десктопное приложение для управления проектами и задачами. Kanban, Gantt диаграммы, тайм-трекинг, командная работа.',
  'Desktop application for project and task management. Kanban, Gantt charts, time tracking, team collaboration.',
  'desktop',
  ARRAY['Electron', 'Vue.js', 'Node.js', 'SQLite', 'WebSocket'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'TaskMaster Inc',
  false
),
(
  'DesignStudio - Инструмент для дизайнеров',
  'DesignStudio - Designer Tool',
  'Профессиональный инструмент для UI/UX дизайнеров. Векторная графика, прототипирование, компоненты, экспорт в код.',
  'Professional tool for UI/UX designers. Vector graphics, prototyping, components, code export.',
  'desktop',
  ARRAY['Electron', 'Canvas API', 'WebGL', 'TypeScript', 'File System'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'Creative Tools',
  false
),

-- Adding design projects
(
  'StartupBrand - Брендинг стартапа',
  'StartupBrand - Startup Branding',
  'Полный брендинг для технологического стартапа. Логотип, фирменный стиль, гайдлайны, презентации, маркетинговые материалы.',
  'Complete branding for tech startup. Logo, corporate identity, guidelines, presentations, marketing materials.',
  'design',
  ARRAY['Figma', 'Adobe Illustrator', 'Brand Strategy', 'Typography', 'Color Theory'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'TechStart',
  true
),
(
  'HealthApp - UI/UX дизайн',
  'HealthApp - UI/UX Design',
  'Современный UI/UX дизайн мобильного приложения для здоровья. Интуитивный интерфейс, анимации, адаптивность.',
  'Modern UI/UX design for health mobile app. Intuitive interface, animations, responsiveness.',
  'design',
  ARRAY['Figma', 'Prototyping', 'User Research', 'Wireframing', 'Design System'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'HealthTech',
  false
),
(
  'CorpRedesign - Редизайн корпоративного сайта',
  'CorpRedesign - Corporate Website Redesign',
  'Редизайн корпоративного сайта с фокусом на UX. Современный дизайн, улучшенная навигация, адаптивность, анимации.',
  'Corporate website redesign focused on UX. Modern design, improved navigation, responsiveness, animations.',
  'design',
  ARRAY['Figma', 'Web Design', 'Responsive Design', 'Animation', 'Accessibility'],
  '/placeholder.svg?height=600&width=800',
  NULL,
  'Global Corp',
  false
);
