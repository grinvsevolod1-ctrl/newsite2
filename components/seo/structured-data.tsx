export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.netnext.site/#organization",
        name: "NetNext",
        alternateName: ["NetNext Studio", "НетНекст", "Студия NetNext"],
        url: "https://www.netnext.site",
        logo: {
          "@type": "ImageObject",
          url: "https://www.netnext.site/logo.png",
          width: 512,
          height: 512,
        },
        description:
          "Профессиональная студия разработки программного обеспечения в Минске, Беларусь. Команда 50+ разработчиков. Создаем веб-приложения, мобильные приложения, Telegram ботов, AI решения и десктопные приложения под ключ.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BY",
          addressRegion: "Минская область",
          addressLocality: "Минск",
          streetAddress: "Минск",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.9006,
          longitude: 27.559,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Минск",
          },
          {
            "@type": "City",
            name: "Гомель",
          },
          {
            "@type": "City",
            name: "Брест",
          },
          {
            "@type": "City",
            name: "Гродно",
          },
          {
            "@type": "City",
            name: "Витебск",
          },
          {
            "@type": "City",
            name: "Могилев",
          },
          {
            "@type": "Country",
            name: "Беларусь",
          },
          {
            "@type": "Country",
            name: "Россия",
          },
          {
            "@type": "Country",
            name: "Казахстан",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+375-29-141-45-55",
            contactType: "customer service",
            availableLanguage: ["Russian", "English", "Belarusian"],
            areaServed: ["BY", "RU", "KZ"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
          },
          {
            "@type": "ContactPoint",
            email: "info@netnext.site",
            contactType: "technical support",
            availableLanguage: ["Russian", "English"],
          },
          {
            "@type": "ContactPoint",
            email: "team@netnext.site",
            contactType: "sales",
            availableLanguage: ["Russian", "English", "Belarusian"],
          },
        ],
        sameAs: ["https://instagram.com/netnext.site", "https://t.me/+375291414555"],
        founder: {
          "@type": "Person",
          name: "NetNext Team",
        },
        foundingDate: "2020",
        foundingLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Минск",
            addressCountry: "BY",
          },
        },
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: 50,
          minValue: 50,
          maxValue: 100,
        },
        slogan: "Профессиональная разработка для вашего бизнеса",
        knowsAbout: [
          "Веб-разработка",
          "Мобильная разработка",
          "React",
          "Next.js",
          "Node.js",
          "React Native",
          "Flutter",
          "Telegram боты",
          "AI решения",
          "Машинное обучение",
          "UI/UX дизайн",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.netnext.site/#website",
        url: "https://www.netnext.site",
        name: "NetNext - Студия разработки сайтов и приложений в Минске",
        description:
          "Разработка веб-приложений, мобильных приложений, Telegram ботов, AI решений и десктопных приложений под ключ в Беларуси",
        publisher: {
          "@id": "https://www.netnext.site/#organization",
        },
        inLanguage: ["ru-BY", "be-BY", "en-US"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.netnext.site/portfolio?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.netnext.site/#localbusiness",
        name: "NetNext - Студия разработки",
        image: "https://www.netnext.site/og-image.png",
        priceRange: "$$-$$$",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BY",
          addressRegion: "Минская область",
          addressLocality: "Минск",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.9006,
          longitude: 27.559,
        },
        url: "https://www.netnext.site",
        telephone: "+375-29-141-45-55",
        email: "info@netnext.site",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
        paymentAccepted: "Cash, Credit Card, Bank Transfer, Cryptocurrency",
        currenciesAccepted: "BYN, USD, EUR, RUB",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Услуги разработки программного обеспечения",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Разработка веб-сайтов и веб-приложений",
                description:
                  "Создание современных веб-сайтов и веб-приложений на React, Next.js, Node.js. Интернет-магазины, корпоративные сайты, SaaS платформы.",
                provider: {
                  "@id": "https://www.netnext.site/#organization",
                },
                areaServed: "BY",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Разработка мобильных приложений iOS и Android",
                description:
                  "Разработка нативных и кроссплатформенных мобильных приложений на React Native, Flutter для iOS и Android.",
                provider: {
                  "@id": "https://www.netnext.site/#organization",
                },
                areaServed: "BY",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Разработка Telegram ботов",
                description:
                  "Создание автоматизированных Telegram ботов для бизнеса: боты для продаж, поддержки клиентов, автоматизации процессов.",
                provider: {
                  "@id": "https://www.netnext.site/#organization",
                },
                areaServed: "BY",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI решения и машинное обучение",
                description:
                  "Разработка решений на основе искусственного интеллекта: чат-боты с AI, анализ данных, компьютерное зрение, NLP.",
                provider: {
                  "@id": "https://www.netnext.site/#organization",
                },
                areaServed: "BY",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Разработка десктопных приложений",
                description: "Создание кроссплатформенных десктопных приложений для Windows, macOS, Linux на Electron.",
                provider: {
                  "@id": "https://www.netnext.site/#organization",
                },
                areaServed: "BY",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Веб-дизайн и UI/UX дизайн",
                description:
                  "Профессиональный дизайн интерфейсов и пользовательского опыта. Создание уникального дизайна для сайтов и приложений.",
                provider: {
                  "@id": "https://www.netnext.site/#organization",
                },
                areaServed: "BY",
              },
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.netnext.site/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://www.netnext.site",
          },
        ],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
