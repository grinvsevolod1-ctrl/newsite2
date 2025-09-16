"use client";

import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { AiFillAlert } from "react-icons/ai";

type Props = {
  currency: string;
  setCurrency: (val: string) => void;
  closeModal: () => void;
};

const ProjectForm = ({ currency, setCurrency, closeModal }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [estimatedPriceUSD, setEstimatedPriceUSD] = useState(0);
  const [regionCode, setRegionCode] = useState("+375");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const userRegion = "BY";
    if (userRegion === "BY") setRegionCode("+375");
    else if (userRegion === "RU") setRegionCode("+7");
    else if (userRegion === "UA") setRegionCode("+380");
    else setRegionCode("+1");
  }, []);

  useEffect(() => {
    const prices: Record<string, number> = {
      landing: 300,
      corporate: 600,
      ecommerce: 1200,
      telegrambot: 500,
      mobileapp: 1500,
      smm: 250,
      support: 200,
    };
    setEstimatedPriceUSD(prices[projectType] || 0);
  }, [projectType]);

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
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      alert("Введите корректный номер телефона");
      return;
    }

    const price = getConvertedPrice();
    const text = `
🚀 Новый проект:
👤 Имя: ${name}
📞 Телефон: ${phone}
📦 Услуга: ${projectType}
💰 Оценка: ${price} ${currency}
💬 Сообщение: ${message}
    `;

    await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
        text,
      }),
    });

    setFormSuccess(true);
    setName("");
    setPhone("");
    setMessage("");
    setProjectType("");
    setEstimatedPriceUSD(0);
    setAgreeTerms(false);
    setTimeout(closeModal, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
        placeholder="Ваше имя"
        className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue"
      />

      <div className="relative w-full">
        <InputMask
          mask={`${regionCode} (99) 999-99-99`}
          maskChar=" "
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="tel"
              placeholder={`Ваш номер телефона (${regionCode} (29) 123-45-67)`}
              className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue"
            />
          )}
        </InputMask>
        <AiFillAlert className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 text-red-500" />
      </div>

      <select
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
        required
        className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue"
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
        className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue resize-none min-h-[80px]"
      />

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

      <div className="flex justify-center gap-4 mb-2">
        <button
          type="button"
          onClick={() => setCurrency("USD")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            currency === "USD" ? "bg-blue text-white" : "bg-gray-200"
          }`}
        >
          USD
        </button>
        <button
          type="button"
          onClick={() => setCurrency("BYN")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            currency === "BYN" ? "bg-blue text-white" : "bg-gray-200"
          }`}
        >
          BYN
        </button>
      </div>

      <button
        type="submit"
        aria-label="Отправить форму"
        className="w-full bg-blue text-white py-3 px-4 rounded-md hover:bg-hoblue transition font-semibold"
      >
        Отправить запрос
      </button>

      {formSuccess && (
        <div role="alert" className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </div>
      )}
    </form>
  );
};

export default ProjectForm;
