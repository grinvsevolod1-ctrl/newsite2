import { cvData } from "@/app/lib/cvData";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${cvData.name} | Портфолио архитектора — NetNext.site`,
  description: cvData.summary,
  keywords:
    "Станислав, NetNext, архитектор, цифровые экосистемы, Telegram-боты, JavaScript, Spring, Docker, ML, TypeScript",
  openGraph: {
    title: `${cvData.name} | Портфолио архитектора — NetNext.site`,
    description: cvData.summary,
    url: `${cvData.link}`,
    images: ["https://netnext.site/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://netnext.site/cv",
  },
};

export default function CVPage() {
  return (
    <section
      className="max-w-5xl mx-auto px-6 py-20"
      itemScope
      itemType="https://schema.org/Person"
    >
      <h1 className="text-4xl font-bold text-center mb-4" itemProp="name">
        {cvData.name}
      </h1>
      <p className="text-center text-gray-700 mb-6" itemProp="description">
        {cvData.title}
      </p>

      <div className="text-center mb-10">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{cvData.summary}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-center">Навыки и технологии</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {cvData.skills.map((skill, i) => (
          <li
            key={i}
            className="bg-lightgrey rounded-xl p-4 text-sm text-gray-800 shadow hover:shadow-md transition"
          >
            {skill}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-center">Профили и ссылки</h2>
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {cvData.link && (
          <Link
            href={cvData.link}
            target="_blank"
            itemProp="url"
            className="bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
          >
            Полное CV
          </Link>
        )}
        {cvData.github && (
          <Link
            href={cvData.github}
            target="_blank"
            itemProp="sameAs"
            className="bg-darkpurple text-white px-6 py-3 rounded-full hover:bg-purple transition"
          >
            GitHub
          </Link>
        )}
        {cvData.telegram && (
          <Link
            href={cvData.telegram}
            target="_blank"
            itemProp="sameAs"
            className="bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
          >
            Telegram
          </Link>
        )}
        {cvData.linkedin && (
          <Link
            href={cvData.linkedin}
            target="_blank"
            itemProp="sameAs"
            className="bg-sky-600 text-white px-6 py-3 rounded-full hover:bg-sky-700 transition"
          >
            LinkedIn
          </Link>
        )}
      </div>

      <div className="text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Станислав / NetNext.site</p>
      </div>
    </section>
  );
}
