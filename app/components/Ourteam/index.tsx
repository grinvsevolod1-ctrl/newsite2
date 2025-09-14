import Link from "next/link";

const TeamStatement = () => {
  return (
    <div className="mx-auto max-w-7xl sm:py-4 lg:px-8 my-32 px-4 text-center animate-fade-in">
      <h2 className="text-4xl sm:text-6xl font-bold text-darkpurple mb-6">
        Мы верим в архитектуру, а не в шаблоны
      </h2>
      <h3 className="text-xl sm:text-2xl font-medium text-gray-600 mb-10">
        NetNext — это команда, которая превращает идеи в адаптивные цифровые системы. Мы не просто создаём — мы сопровождаем, масштабируем и интегрируем.
      </h3>

      <ul className="text-sm sm:text-md text-gray-500 list-disc list-inside max-w-2xl mx-auto text-left mb-10">
        <li>Каждый проект — это модуль, готовый к развитию</li>
        <li>Мы работаем через Telegram, CRM, мобильные и веб</li>
        <li>Поддержка, обновления, аналитика — всё включено</li>
        <li>Вы не зависите от платформы — вы управляете системой</li>
      </ul>

      <Link
        href="https://t.me/skufig1"
        target="_blank"
        className="inline-block bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
      >
        Связаться с командой
      </Link>
    </div>
  );
};

export default TeamStatement;
