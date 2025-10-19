export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.netnext.site/#organization",
        name: "NetNext",
        alternateName: "NetNext Studio",
        url: "https://www.netnext.site",
        logo: {
          "@type": "ImageObject",
          url: "https://www.netnext.site/logo.png",
          width: 512,
          height: 512,
        },
        description:
          "Профессиональная студия разработки программного обеспечения с командой 50+ разработчиков. Создаем веб-приложения, мобильные приложения, Telegram ботов, AI решения и десктопные приложения.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BY",
          addressLocality: "Минск",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+375-29-141-45-55",
            contactType: "customer service",
            availableLanguage: ["Russian", "English", "Belarusian"],
            areaServed: "Worldwide",
          },
          {
            "@type": "ContactPoint",
            email: "info@netnext.site",
            contactType: "technical support",
          },
          {
            "@type": "ContactPoint",
            email: "team@netnext.site",
            contactType: "sales",
          },
        ],
        sameAs: ["https://instagram.com/netnext.site", "https://t.me/+375291414555"],
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        founder: {
          "@type": "Person",
          name: "NetNext Team",
        },
        foundingDate: "2020",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: 50,
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.netnext.site/#website",
        url: "https://www.netnext.site",
        name: "NetNext - Студия разработки программного обеспечения",
        description:
          "Разработка веб-приложений, мобильных приложений, Telegram ботов, AI решений и десктопных приложений под ключ",
        publisher: {
          "@id": "https://www.netnext.site/#organization",
        },
        inLanguage: ["ru", "en"],
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.netnext.site/portfolio?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.netnext.site/#service",
        name: "NetNext - Разработка программного обеспечения",
        image: "https://www.netnext.site/og-image.png",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BY",
          addressLocality: "Минск",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.9006,
          longitude: 27.559,
        },
        url: "https://www.netnext.site",
        telephone: "+375-29-141-45-55",
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Услуги разработки",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Разработка веб-приложений",
                description: "Создание современных веб-приложений на React, Next.js, Node.js",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Разработка мобильных приложений",
                description: "Разработка iOS и Android приложений на React Native, Flutter",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Разработка Telegram ботов",
                description: "Создание автоматизированных ботов для бизнеса и сервисов",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI решения",
                description: "Разработка решений на основе искусственного интеллекта",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Десктопные приложения",
                description: "Создание кроссплатформенных десктопных приложений",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Веб-дизайн и UI/UX",
                description: "Профессиональный дизайн интерфейсов и пользовательского опыта",
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
