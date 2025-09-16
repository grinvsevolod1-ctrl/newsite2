"use client";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function ArticlesRedirect() {
  return (
    <section className="bg-lightgrey py-20" id="blog-section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-blue text-sm font-medium tracking-widest uppercase mb-2">
          Статьи и кейсы
        </h3>
        <h2 className="text-4xl sm:text-6xl font-bold mb-6">
          Публикации NetNext.site
        </h2>
        <p className="text-md text-gray-600 mb-10 max-w-2xl mx-auto">
          Мы делимся архитектурой решений, примерами автоматизации, визуальными системами и кейсами. Всё, что помогает бизнесу адаптироваться — теперь в Telegram.
        </p>

        <Link
          href="https://t.me/skufig1"
          target="_blank"
          className="inline-flex items-center gap-3 bg-blue text-white px-6 py-4 rounded-full text-lg font-semibold hover:bg-hoblue transition"
        >
          Перейти в Telegram <AiOutlineArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
