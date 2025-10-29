import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.netnext.site"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/", "/profile/", "/auth/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/profile/", "/auth/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/admin/", "/profile/", "/auth/"],
        crawlDelay: 1,
      },
      {
        userAgent: "YandexImages",
        allow: ["/", "/images/", "/portfolio/"],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
