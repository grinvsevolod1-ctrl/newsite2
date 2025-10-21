-- Adding real vacancies with salaries, requirements, and responsibilities
-- Adding real vacancies for NetNext studio

INSERT INTO vacancies (
  title_ru,
  title_en,
  description_ru,
  description_en,
  requirements_ru,
  requirements_en,
  responsibilities_ru,
  responsibilities_en,
  employment_type,
  experience_level,
  location,
  salary_min,
  salary_max,
  salary_currency,
  is_active
) VALUES
-- Frontend Developer
(
  'Frontend разработчик (React/Next.js)',
  'Frontend Developer (React/Next.js)',
  'Ищем талантливого Frontend разработчика для работы над современными веб-приложениями. Работа в команде профессионалов над интересными проектами для клиентов по всему миру.',
  'Looking for talented Frontend developer to work on modern web applications. Work in a team of professionals on exciting projects for clients worldwide.',
  ARRAY[
    'Опыт работы с React и Next.js от 2 лет',
    'Отличное знание TypeScript',
    'Опыт работы с Tailwind CSS',
    'Понимание принципов адаптивной верстки',
    'Знание Git и работы в команде',
    'Английский язык на уровне чтения технической документации'
  ],
  ARRAY[
    '2+ years of experience with React and Next.js',
    'Excellent TypeScript knowledge',
    'Experience with Tailwind CSS',
    'Understanding of responsive design principles',
    'Git knowledge and team collaboration',
    'English for reading technical documentation'
  ],
  ARRAY[
    'Разработка пользовательских интерфейсов',
    'Интеграция с REST API и GraphQL',
    'Оптимизация производительности приложений',
    'Code review и менторинг junior разработчиков',
    'Участие в планировании архитектуры проектов',
    'Написание технической документации'
  ],
  ARRAY[
    'Developing user interfaces',
    'Integration with REST API and GraphQL',
    'Application performance optimization',
    'Code review and mentoring junior developers',
    'Participation in project architecture planning',
    'Writing technical documentation'
  ],
  'full-time',
  'middle',
  'Remote / Минск',
  2000,
  4000,
  'usd',
  true
),

-- Backend Developer
(
  'Backend разработчик (Node.js/Python)',
  'Backend Developer (Node.js/Python)',
  'Требуется опытный Backend разработчик для создания масштабируемых серверных решений. Работа с современным стеком технологий и возможность роста до Team Lead.',
  'Experienced Backend developer needed to create scalable server solutions. Work with modern tech stack and opportunity to grow to Team Lead.',
  ARRAY[
    'Опыт работы с Node.js или Python от 3 лет',
    'Знание SQL и NoSQL баз данных',
    'Опыт проектирования REST API',
    'Понимание микросервисной архитектуры',
    'Опыт работы с Docker и CI/CD',
    'Знание принципов безопасности'
  ],
  ARRAY[
    '3+ years of experience with Node.js or Python',
    'Knowledge of SQL and NoSQL databases',
    'Experience in REST API design',
    'Understanding of microservices architecture',
    'Experience with Docker and CI/CD',
    'Knowledge of security principles'
  ],
  ARRAY[
    'Разработка серверной логики приложений',
    'Проектирование и оптимизация баз данных',
    'Создание и поддержка API',
    'Интеграция с внешними сервисами',
    'Обеспечение безопасности приложений',
    'Мониторинг и оптимизация производительности'
  ],
  ARRAY[
    'Developing server-side application logic',
    'Database design and optimization',
    'Creating and maintaining APIs',
    'Integration with external services',
    'Ensuring application security',
    'Monitoring and performance optimization'
  ],
  'full-time',
  'senior',
  'Remote / Минск',
  2500,
  5000,
  'usd',
  true
),

-- Mobile Developer
(
  'Mobile разработчик (React Native/Flutter)',
  'Mobile Developer (React Native/Flutter)',
  'Ищем Mobile разработчика для создания кроссплатформенных мобильных приложений. Интересные проекты, современные технологии, дружная команда.',
  'Looking for Mobile developer to create cross-platform mobile applications. Interesting projects, modern technologies, friendly team.',
  ARRAY[
    'Опыт разработки на React Native или Flutter от 2 лет',
    'Знание нативных API iOS и Android',
    'Опыт публикации приложений в App Store и Google Play',
    'Понимание принципов мобильного UX/UI',
    'Опыт работы с push-уведомлениями',
    'Знание прин��ипов оптимизации производительности'
  ],
  ARRAY[
    '2+ years of React Native or Flutter development',
    'Knowledge of native iOS and Android APIs',
    'Experience publishing apps to App Store and Google Play',
    'Understanding of mobile UX/UI principles',
    'Experience with push notifications',
    'Knowledge of performance optimization principles'
  ],
  ARRAY[
    'Разработка мобильных приложений',
    'Интеграция с backend API',
    'Оптимизация производительности приложений',
    'Тестирование на различных устройствах',
    'Поддержка и обновление существующих приложений',
    'Работа с дизайнерами над UX/UI'
  ],
  ARRAY[
    'Mobile application development',
    'Backend API integration',
    'Application performance optimization',
    'Testing on various devices',
    'Maintaining and updating existing applications',
    'Working with designers on UX/UI'
  ],
  'full-time',
  'middle',
  'Remote / Минск',
  1800,
  3500,
  'usd',
  true
),

-- HR Recruiter
(
  'HR рекрутер (IT)',
  'HR Recruiter (IT)',
  'Требуется HR рекрутер для поиска и найма IT специалистов. Работа с международными проектами, конкурентная зарплата, возможность удаленной работы.',
  'HR recruiter needed for finding and hiring IT specialists. Work with international projects, competitive salary, remote work opportunity.',
  ARRAY[
    'Опыт работы HR рекрутером в IT от 1 года',
    'Знание методов поиска и оценки кандидатов',
    'Опыт работы с LinkedIn, HeadHunter и другими платформами',
    'Отличные коммуникативные навыки',
    'Английский язык на уровне B2+',
    'Понимание IT специфики и технологий'
  ],
  ARRAY[
    '1+ year of experience as IT recruiter',
    'Knowledge of candidate search and evaluation methods',
    'Experience with LinkedIn, HeadHunter and other platforms',
    'Excellent communication skills',
    'English level B2+',
    'Understanding of IT specifics and technologies'
  ],
  ARRAY[
    'Поиск и привлечение IT специалистов',
    'Проведение собеседований и оценка кандидатов',
    'Ведение базы кандидатов',
    'Работа с hiring менеджерами',
    'Организация процесса адаптации новых сотрудников',
    'Развитие HR бренда компании'
  ],
  ARRAY[
    'Searching and attracting IT specialists',
    'Conducting interviews and evaluating candidates',
    'Maintaining candidate database',
    'Working with hiring managers',
    'Organizing onboarding process for new employees',
    'Developing company HR brand'
  ],
  'full-time',
  'middle',
  'Remote / Минск',
  1000,
  2000,
  'usd',
  true
),

-- Business Development Manager
(
  'Менеджер по развитию бизнеса',
  'Business Development Manager',
  'Ищем активного менеджера для поиска новых клиентов и проектов. Высокий доход (оклад + %), работа с международными клиентами, карьерный рост.',
  'Looking for active manager to find new clients and projects. High income (salary + %), work with international clients, career growth.',
  ARRAY[
    'Опыт продаж IT услуг от 1 года',
    'Отличные навыки коммуникации и переговоров',
    'Английский язык на уровне B2+ (обязательно)',
    'Опыт работы с CRM системами',
    'Понимание процессов разработки ПО',
    'Нацеленность на результат'
  ],
  ARRAY[
    '1+ year of IT services sales experience',
    'Excellent communication and negotiation skills',
    'English level B2+ (required)',
    'Experience with CRM systems',
    'Understanding of software development processes',
    'Result-oriented'
  ],
  ARRAY[
    'Поиск и привлечение новых клиентов',
    'Проведение презентаций и переговоров',
    'Подготовка коммерческих предложений',
    'Ведение клиентской базы в CRM',
    'Участие в тендерах и конкурсах',
    'Анализ рынка и конкурентов'
  ],
  ARRAY[
    'Finding and attracting new clients',
    'Conducting presentations and negotiations',
    'Preparing commercial proposals',
    'Managing client database in CRM',
    'Participating in tenders and competitions',
    'Market and competitor analysis'
  ],
  'full-time',
  'middle',
  'Remote / Минск',
  800,
  3000,
  'usd',
  true
),

-- UI/UX Designer
(
  'UI/UX дизайнер',
  'UI/UX Designer',
  'Требуется креативный UI/UX дизайнер для создания современных интерфейсов. Работа над разнообразными проектами, возможность реализации своих идей.',
  'Creative UI/UX designer needed to create modern interfaces. Work on diverse projects, opportunity to implement your ideas.',
  ARRAY[
    'Опыт работы UI/UX дизайнером от 2 лет',
    'Отличное владение Figma',
    'Портфолио с реализованными проектами',
    'Понимание принципов UX и юзабилити',
    'Знание современных дизайн-трендов',
    'Опыт создания дизайн-систем'
  ],
  ARRAY[
    '2+ years of UI/UX design experience',
    'Excellent Figma skills',
    'Portfolio with completed projects',
    'Understanding of UX and usability principles',
    'Knowledge of modern design trends',
    'Experience creating design systems'
  ],
  ARRAY[
    'Создание UI/UX дизайна для веб и мобильных приложений',
    'Разработка дизайн-систем и гайдлайнов',
    'Проведение UX исследований',
    'Создание прототипов и wireframes',
    'Работа с разработчиками над реализацией',
    'Презентация дизайн-решений клиентам'
  ],
  ARRAY[
    'Creating UI/UX design for web and mobile applications',
    'Developing design systems and guidelines',
    'Conducting UX research',
    'Creating prototypes and wireframes',
    'Working with developers on implementation',
    'Presenting design solutions to clients'
  ],
  'full-time',
  'middle',
  'Remote / Минск',
  1500,
  3000,
  'usd',
  true
),

-- Junior Frontend Developer
(
  'Junior Frontend разработчик',
  'Junior Frontend Developer',
  'Приглашаем начинающих разработчиков для старта карьеры в IT. Менторство от опытных коллег, обучение, работа над реальными проектами.',
  'Inviting beginner developers to start IT career. Mentorship from experienced colleagues, training, work on real projects.',
  ARRAY[
    'Базовые знания HTML, CSS, JavaScript',
    'Знакомство с React (курсы, pet-проекты)',
    'Понимание основ Git',
    'Желание учиться и развиваться',
    'Английский язык на уровне чтения документации',
    'Портфолио с учебными проектами'
  ],
  ARRAY[
    'Basic knowledge of HTML, CSS, JavaScript',
    'Familiarity with React (courses, pet projects)',
    'Understanding of Git basics',
    'Willingness to learn and grow',
    'English for reading documentation',
    'Portfolio with educational projects'
  ],
  ARRAY[
    'Разработка компонентов под руководством senior разработчиков',
    'Верстка страниц по макетам',
    'Исправление багов',
    'Участие в code review',
    'Изучение best practices',
    'Работа в команде по Agile'
  ],
  ARRAY[
    'Developing components under senior developers guidance',
    'Page layout from designs',
    'Bug fixing',
    'Participating in code reviews',
    'Learning best practices',
    'Working in Agile team'
  ],
  'full-time',
  'junior',
  'Remote / Минск',
  800,
  1500,
  'usd',
  true
);
