"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [estimatedPriceUSD, setEstimatedPriceUSD] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [regionCode, setRegionCode] = useState("+375");

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
      default: setEstimatedPriceUSD(0);
    }
  }, [projectType]);

  const getConvertedPrice = () => {
    const rate = 3.2; // Примерный курс BYN/USD
    return currency === "BYN"
      ? Math.round(estimatedPriceUSD * rate)
      : estimatedPriceUSD;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = getConvertedPrice();
    const text = `
🚀 Новый проект:
👤 Имя: ${name}
📦 Тип: ${projectType}
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
  };

  return (
    <>
      <div className="mx-auto max-w-7xl mt-4 mb-6 sm:py-6 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COLUMN-1 */}
          <div className="mx-auto sm:mx-0 flex flex-col justify-center">
            <div className="py-2 text-center lg:text-start">
              <button className="text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black">
                NetNext
              </button>
            </div>
            <div className="py-2 text-center lg:text-start">
              <h1 className="text-4xl md:text-6xl font-bold text-darkpurple leading-tight">
                Мы создаём<br /> современные сайты<br /> и цифровые решения
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                От идеи до запуска — мы превращаем ваши цели в работающие продукты
              </p>
            </div>
            <div className="mt-6 text-center lg:text-start">
              <button
                onClick={openModal}
                className="text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue transition"
              >
                Начать проект
              </button>
            </div>
          </div>

          {/* COLUMN-2 */}
          <div className="hidden lg:flex items-center justify-center">
            <Image src="/images/site/1.png" alt="hero-image" width={800} height={642} priority />
          </div>
        </div>
      </div>

      {/* MODAL */}
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <h2 className="text-3xl font-bold text-center mb-6">Запуск проекта с NetNext</h2>

                  {/* Currency Switch */}
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

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ваше имя"
                      className="w-full border border-linegrey rounded-md px-4 py-2"
                    />

                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      required
                      className="w-full border border-linegrey rounded-md px-4 py-2 capitalize"
                    >
                      <option value="">Выберите тип проекта</option>
                      <option value="landing">Лендинг</option>
                      <option value="corporate">Корпоративный сайт</option>
                      <option value="ecommerce">Интернет-магазин</option>
                    </select>

                    {estimatedPriceUSD > 0 && (
                      <p className="text-sm text-gray-600">
                        💰 Оценочная стоимость: <strong>{getConvertedPrice()} {currency}</strong>
                      </p>
                    )}

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Опишите задачу или идею..."
                      className="w-full border border-linegrey rounded-md px-4 py-2"
                    />

                    <button
                      type="submit"
                      className="w-full bg-blue text-white py-3 rounded-md hover:bg-hoblue transition"
                    >
                      Отправить запрос
                    </button>
                  </form>

                  {/* CASES */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Примеры наших проектов</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <Image src="/images/site/2.png" alt="Project 1" width={400} height={240} />
                        <p className="mt-2 text-sm font-medium">Сайт для студии</p>
                      </div>
                      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <Image src="/images/site/3