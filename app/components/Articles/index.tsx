"use client";

import Link from "next/link";

const Articles = () => {
  return (
    <section className="w-full bg-lightgrey py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-darkpurple mb-6">
          Полезные статьи и кейсы
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Мы делимся опытом, рассказываем о решениях и показываем, как адаптировать цифровые продукты под реальные задачи.
        </p>
        <Link
          href="https://t.me/skufig1"
          target="_blank"
          className="inline-flex items-center gap-3 bg-blue text-white px-6 py-4 rounded-full text-lg font-semibold hover:bg-hoblue transition"
        >
          Перейти в Telegram
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Articles;
