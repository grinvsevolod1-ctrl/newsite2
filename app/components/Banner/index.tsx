"use client";

import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import ProjectForm from "./ProjectForm";

const sliderImages = [
  "/images/site/1.png",
  "/images/site/2.png",
  "/images/site/3.png",
];

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [currentSlide, setCurrentSlide] = useState(0);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Верхний блок баннера */}
      <div className="w-full bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center min-h-[80vh]">
          {/* Текстовая часть */}
          <div className="flex flex-col justify-center py-12 px-4 md:px-8 text-center lg:text-left order-2 lg:order-1">
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

          {/* Изображение баннера */}
          <div className="relative w-full h-[80vh] flex justify-center order-1 lg:order-2 mb-4 lg:mb-0">
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

      {/* Модальное окно */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
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
                  {/* Заголовок */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-center flex-1 flex items-center justify-center space-x-2">
                      <span>🚀 Запуск проекта с NetNext</span>
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Закрыть"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Форма */}
                  <ProjectForm
                    currency={currency}
                    setCurrency={setCurrency}
                    closeModal={closeModal}
                  />

                  {/* Примеры проектов */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Примеры наших проектов</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {sliderImages.map((src, i) => (
                        <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                          <Image src={src} alt={`Project ${i + 1}`} width={400} height={240} />
                          <p className="mt-2 text-sm font-medium">Проект {i + 1}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Демонстрационное описание проекта с адаптацией и интеграцией
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-xs text-gray-500 text-center">
                      ⚠️ Все проекты представлены исключительно в демонстрационных целях.
                    </p>
                  </div>

                  {/* CTA в Telegram */}
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
