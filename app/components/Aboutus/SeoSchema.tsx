import Head from "next/head";

const SeoSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NetNext.site",
    "url": "https://netnext.site",
    "logo": "https://netnext.site/images/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+375291414555",
      "contactType": "Customer Service",
      "areaServed": "BY",
      "availableLanguage": ["Russian"]
    },
    "sameAs": [
      "https://t.me/skufig1",
      "https://wa.me/375291414555"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
};

export default SeoSchema;
