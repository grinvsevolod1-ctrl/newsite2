"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";

const sliderImages = [
  "/images/site/1.png",
  "/images/site/2.png",
  "/images/site/3.png",
];

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [estimatedPriceUSD, setEstimatedPriceUSD] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [regionCode, setRegionCode] = useState("+375");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false); // чекбокс согласия

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const userRegion = "BY";
    if (userRegion === "BY") setRegionCode("+375");
    else if (userRegion === "RU") setRegionCode("+7");
    else if (userRegion === "UA") setRegionCode("+380");
    else setRegionCode("+1");
  }, []);

  useEffect(() => {
    switch (projectType) {
      case "landing": setEstimatedPriceUSD(300); break;
      case "corporate": setEstimatedPriceUSD(600); break;
      case "ecommerce": setEstimatedPriceUSD(1200); break;
      case "telegrambot": setEstimatedPriceUSD(500); break;
      case "mobileapp": setEstimatedPriceUSD(1500); break;
      case "smm": setEstimatedPriceUSD(250); break;
      case "support": setEstimatedPriceUSD(200); break;
      default: setEstimatedPriceUSD(0);
    }
  }, [projectType]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getConvertedPrice = () => {
    const rate = 3.2;
    return currency === "BYN"
      ? Math.round(estimatedPriceUSD * rate)
      : estimatedPriceUSD;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Пожалуйста, подтвердите согласие с условиями");
      return;
    }
    const price = getConvertedPrice();
    const text = `
🚀 Новый проект:
👤 Имя: ${name}
📦 Услуга: ${projectType}
💰 Оценка: ${price} ${currency}
💬 Сообщение: ${message}
    `;
    await fetch(`https://api.telegram.org/bot7971685388:AAFshMdeIWWiwLPZdp2os2vgwVDp9PTP4eU/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: 940316027, text })
    });
    closeModal();
    setName("");
    setMessage("");
    setProjectType("");
    setEstimatedPriceUSD(0);
    setAgreeTerms(false);
  };

  return (
    <>
      <div className="w-full bg-white relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[80vh] max-w-7xl mx-auto px-6 lg:px-8">
          {/* TEXT BLOCK */}
          <div className="flex flex-col justify-center py-12 px-4 md:px-8 text-center lg:text-left">
            <button className="text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black mx-auto lg:mx-0 mb-4">
              NetNext
            </button>
            <h1 className="text-4xl md:text-6xl font-bold text-darkpurple leading-tight mb-4">
              Мы создаём<br /> современные сайты<br /> и цифровые решения
            </h1>
            <p className="mt-4 text-lg text-gray-600 mb-4">
              От идеи до запуска — мы превращаем ваши цели в работающие продукты
            </p>
            <ul className="mt-4 text-sm text-gray-500 list-disc list-inside mb-6">
              <li>Telegram-боты и автоматизация</li>
              <li>Мобильные приложения</li>
              <li>SMM и контент-стратегии</li>
              <li>Ведение и поддержка сайтов</li>
              <li>Интеграция с CRM и мессенджерами</li>
            </ul>
            <button
              onClick={openModal}
              className="mt-6 text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue transition w-fit"
            >
              Начать проект
            </button>
          </div>

          {/* IMAGE BLOCK */}
          <div className="relative w-full h-[80vh] hidden lg:block">
            <Image
              src="/images/banner/banner.svg"
              alt="hero-image"
              fill
              className="object-cover rounded-3xl"
              priority
            />
            <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-xl p-2 shadow max-w-[200px]">
              <Image
                src={sliderImages[currentSlide]}
                alt={`slide-${currentSlide}`}
                width={200}
                height={120}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto px-4 md:px-8">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full max-w-3xl bg-white rounded-2xl p-6 md:p-8 shadow-xl transform transition-all relative">
                  {/* Заголовок и кнопка закрытия */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-center flex-1">Запуск проекта с NetNext</h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Закрыть"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Выбор валюты */}
                  <div className="flex justify-center gap-4 mb-4">
                    <button
                      onClick={() => setCurrency("USD")}
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        currency === "USD" ? "bg-blue text-white" : "bg-gray-200"
                      }`}
                    >
                      USD
                    </button>
                    <button
                      onClick={() => setCurrency("BYN")}
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        currency === "BYN" ? "bg-blue text-white" : "bg-gray-200"
                      }`}
                    >
                      BYN
                    </button>
                  </div>

                  {/* Форма */}
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/* Имя */}
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ваше имя"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue"
                    />

                    {/* Услуга */}
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue"
                    >
                      <option value="">Выберите услугу</option>
                      <option value="landing">Лендинг</option>
                      <option value="corporate">Корпоративный сайт</option>
                      <option value="ecommerce">Интернет-магазин</option>
                      <option value="telegrambot">Telegram-бот</option>
                      <option value="mobileapp">Мобильное приложение</option>
                      <option value="smm">SMM и продвижение</option>
                      <option value="support">Поддержка сайта</option>
                    </select>

                    {/* Оценка стоимости */}
                    {estimatedPriceUSD > 0 && (
                      <p className="text-sm text-gray-600">
                        💰 Оценочная стоимость: <strong>{getConvertedPrice()} {currency}</strong>
                      </p>
                    )}

                    {/* Сообщение */}
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Опишите задачу или идею..."
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue resize-none min-h-[80px]"
                    />

                    {/* Чекбокс согласия */}
                    <div className="flex items-start mt-2">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        id="terms"
                        className="mt-1 mr-2"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        Я согласен с условиями обработки данных
                      </label>
                    </div>

                    {/* Кнопка отправки */}
                    <button
                      type="submit"
                      className="w-full bg-blue text-white py-3 px-4 rounded-md hover:bg-hoblue transition font-semibold"
                    >
                      Отправить запрос
                    </button>
                  </form>

                  {/* Примеры проектов */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Примеры наших проектов</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <Image src="/images/site/1.png" alt="Project 1" width={400} height={240} />
                        <p className="mt-2 text-sm font-medium">Сервис доставки пиццы</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Адаптивный лендинг с выбором вкуса, геолокацией и Telegram-ботом
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <Image src="/images/site/2.png" alt="Project 2" width={400} height={240} />
                        <p className="mt-2 text-sm font-medium">Интернет-магазин колонии</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Закрытая система с авторизацией, каталогом и внутренними платежами
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <Image src="/images/site/3.png" alt="Project 3" width={400} height={240} />
                        <p className="mt-2 text-sm font-medium">Цифровая витрина для торгового центра</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Многоуровневая навигация, интеграция с арендаторами и событийным календарём
                        </p>
                      </div>
                    </div>
                    {/* Предупреждение */}
                    <p className="mt-6 text-xs text-gray-500 text-center">
                      ⚠️ Все проекты представлены исключительно в демонстрационных целях. Изображения не нарушают авторские права и не содержат персональных данных.
                    </p>
                  </div>

                  {/* CTA в Телеграм */}
                  <div className="mt-6 text-center">
                    <Link
                      href="https://t.me/skufig1"
                      target="_blank"
                      className="text-blue underline hover:text-hoblue"
                    >
                      Хочу обсудить лично в Telegram
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Banner;