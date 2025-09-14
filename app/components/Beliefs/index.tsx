import Link from "next/link";
import Image from "next/image";

const principles = [
  {
    icon: "/images/icons/honesty.svg",
    title: "Честность",
    description: "Мы говорим прямо, не скрываем сложностей и не обещаем невозможного.",
  },
  {
    icon: "/images/icons/system.svg",
    title: "Системность",
    description: "Каждое решение — часть архитектуры. Мы строим не страницы, а экосистемы.",
  },
  {
    icon: "/images/icons/adapt.svg",
    title: "Адаптация",
    description: "Проект должен работать в Telegram, на мобильном, в CRM — без компромиссов.",
  },
];

const Beliefs = () => {
  return (
    <div className="mx-auto max-w-7xl sm:py-4 lg:px-8 rounded-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 my-16 mx-5 gap-6">
        {/* COLUMN-1 — BELIEFS */}
        <div className="bg-darkblue pt-12 px-8 sm:px-16 pb-52 md:pb-60 rounded-3xl text-white animate-fade-in">
          <h2 className="text-sm font-medium tracking-widest mb-5 text-center sm:text-start uppercase">
            НАШИ ПРИНЦИПЫ
          </h2>
          <h3 className="text-4xl sm:text-6xl font-bold leading-snug mb-5 text-center sm:text-start">
            Честность <span className="text-gray-400">и системный подход</span>
          </h3>
          <p className="text-offwhite text-md pt-2 mb-6 text-center sm:text-start">
            Мы не продаём шаблоны. Мы строим архитектуру, которая работает. Каждый проект — это адаптивная система, которую можно масштабировать, интегрировать и развивать.
          </p>

          {/* PRINCIPLES LIST */}
          <div className="mt-8 space-y-6">
            {principles.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <Image src={item.icon} alt={item.title} width={40} height={40} />
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center sm:text-start mt-10">
            <Link
              href="https://t.me/skufig1"
              target="_blank"
              className="text-md py-4 px-10 font-semibold text-white rounded-full bg-blue border border-blue hover:bg-hoblue transition"
            >
              Обсудить проект
            </Link>
          </div>
        </div>

        {/* COLUMN-2 — BUILD */}
        <div className="bg-lightgrey pt-12 px-8 sm:px-16 pb-52 md:pb-60 rounded-3xl text-black animate-fade-in">
          <h2 className="text-sm font-medium text-blue tracking-widest mb-5 text-center sm:text-start uppercase">
            СОЗДАНИЕ
          </h2>
          <h3 className="text-4xl sm:text-6xl font-bold leading-snug mb-5 text-center sm:text-start">
            <span className="text-blue">Построим</span> вашу идею как систему
          </h3>
          <p className="text-gray-700 text-md pt-2 mb-6 text-center sm:text-start">
            Мы превращаем идеи в работающие цифровые продукты: Telegram-боты, мобильные приложения, сайты, CRM-интеграции. Всё адаптировано под реальные задачи и каналы.
          </p>
          <div className="text-center sm:text-start mt-10">
            <Link
              href="/services"
              className="text-md py-4 px-10 font-semibold text-white rounded-full bg-blue border border-blue hover:bg-hoblue transition"
            >
              Смотреть кейсы
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beliefs;
