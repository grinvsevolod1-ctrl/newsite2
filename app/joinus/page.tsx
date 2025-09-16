import Join from "@/app/components/Joinus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сопровождение и адаптация — NetNext.site",
  description:
    "Подключите техническую поддержку, визуальные обновления, Telegram-интеграции и системное сопровождение от студии NetNext.site.",
  keywords:
    "NetNext, сопровождение, поддержка, Telegram, CRM, визуальные обновления, адаптация",
  metadataBase: new URL("https://netnext.site"),
  openGraph: {
    title: "Сопровождение и адаптация — NetNext.site",
    description:
      "Мы берём на себя поддержку, визуальные обновления, Telegram-интеграции и системное сопровождение. Всё работает на мобильных, CRM и соцсетях.",
    url: "https://netnext.site/joinus",
    images: ["https://netnext.site/images/og-default.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Сопровождение и адаптация — NetNext.site",
    description:
      "Подключите поддержку и адаптацию от NetNext.site. Всё работает на мобильных, CRM и соцсетях.",
    images: ["https://netnext.site/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://netnext.site/joinus",
  },
};

export default function JoinusPage() {
  return (
    <section
      itemScope
      itemType="https://schema.org/JobPosting"
      className="bg-white"
    >
      <meta itemProp="datePosted" content="2025-09-16" />
      <meta itemProp="employmentType" content="Contractor" />
      <meta itemProp="jobLocationType" content="Remote" />
      <meta itemProp="hiringOrganization" content="NetNext.site" />
      <meta itemProp="industry" content="Digital Ecosystems, Web Development" />
      <meta itemProp="title" content="Сопровождение и адаптация от NetNext.site" />
      <meta
        itemProp="description"
        content="Мы берём на себя техническую поддержку, визуальные обновления, Telegram-интеграции и системное сопровождение. Всё работает на мобильных, CRM и соцсетях."
      />
      <Join />
    </section>
  );
}
