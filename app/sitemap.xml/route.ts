import { NextResponse } from "next/server";
import { featuredData } from "@/app/lib/featuredData";
import { articlesData } from "@/app/lib/articlesData";

const BASE_URL = "https://netnext.site";

export async function GET() {
  const staticPages = ["", "about", "contact", "services", "cv"];

  const serviceSlugs = [
    "telegram-bots",
    "mobile-apps",
    "support-smm",
    "adaptive-sites",
    "crm-integrations",
    "branding-style",
  ];

  const featuredSlugs = featuredData.map((item) => item.slug);
  const articleSlugs = articlesData.map((item) => item.slug);

  const urls = [
    ...staticPages.map((page) => `${BASE_URL}/${page}`),
    ...serviceSlugs.map((slug) => `${BASE_URL}/services/${slug}`),
    ...featuredSlugs.map((slug) => `${BASE_URL}/featured/${slug}`),
    ...articleSlugs.map((slug) => `${BASE_URL}/articles/${slug}`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
