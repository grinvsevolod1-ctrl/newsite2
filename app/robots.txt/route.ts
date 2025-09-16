import { NextResponse } from "next/server";

export async function GET() {
  const content = `
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://netnext.site/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
