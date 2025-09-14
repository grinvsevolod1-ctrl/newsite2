"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const faqData = [
  {
    question: "Что входит в поддержку Telegram-бота?",
    answer:
      "Мы сопровождаем ваш бот: обновляем команды, следим за стабильностью, подключаем CRM, добавляем аналитику и уведомления. Всё работает на мобильных и десктопе.",
  },
  {
    question: "Можете ли вы взять на сопровождение мой сайт?",
    answer:
      "Да. Мы адаптируем его под мобильные, ускорим загрузку, подключим формы, Telegram-уведомления и SEO. Также можем интегрировать CRM и автоматизировать заявки.",
  },
  {
    question: "Как работает подписка на сопровождение?",
    answer:
      "Вы выбираете тариф: Starter, Growth или Pro. Мы берём на себя техническую поддержку, обновления, визуальные правки, аналитику и связь через Telegram.",
  },
  {
    question: "Можно ли подключить только визуальную часть?",
    answer:
      "Конечно. Мы можем обновить стиль, адаптировать под бренд, создать анимации, визуальные паттерны и оформить соцсети. Всё масштабируемо и системно.",
  },
  {
    question: "Как быстро вы реагируете на запросы?",
    answer:
      "В зависимости от тарифа: от 24 часов до приоритетной поддержки в течение 2 часов. Telegram — наш основной канал связи, всё оперативно и прозрачно.",
  },
];

const FAQ = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const question = (form.elements.namedItem("question") as HTMLInputElement).value;

    const text = `❓ Новый вопрос из FAQ:\n👤 Имя: ${name}\n💬 Вопрос: ${question}`;
    await fetch("https://api.telegram.org/bot7971685388:AAFshMdeIWWiwLPZdp2os2vgwVDp9PTP4eU/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: 940316027, text }),
    });

    form.reset();
    alert("Спасибо! Мы скоро ответим.");
  };

  return (
    <div
      id="faq-section"
      className="mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16 faq-bg"
    >
      <h3 className="text-xl font-normal text-white text-center mb-6">FAQ</h3>
      <h2 className="text-4xl lg:text-6xl font-semibold text-center text-white">
        Часто задаваемые <br /> вопросы
      </h2>

      <div className="w-full px-4 pt-16">
        {faqData.map((item, i) => (
          <div
            key={i}
            className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-6 px-6 mb-5"
          >
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-xl font-medium text-darkpurple">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-blue`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-70">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}

        {/* Ask a Question Form */}
        <div className="mx-auto w-full max-w-5xl mt-12 bg-white rounded-2xl p-8 shadow">
          <h4 className="text-xl font-semibold text-darkpurple mb-4 text-center">Не нашли ответа?</h4>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Задайте свой вопрос — мы ответим в Telegram или email.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Ваше имя"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <textarea
              name="question"
              required
              placeholder="Ваш вопрос..."
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              type="submit"
              className="w-full bg-blue text-white py-3 rounded-md hover:bg-hoblue transition"
            >
              Отправить вопрос
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
