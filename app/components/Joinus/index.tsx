"use client";
import { useState } from "react";

const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = `🚀 Новый контакт:\n👤 Имя: ${name}\n📧 Email: ${email}`;
    await fetch("https://api.telegram.org/bot7971685388:AAFshMdeIWWiwLPZdp2os2vgwVDp9PTP4eU/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: 940316027, text }),
    });
    setName("");
    setEmail("");
    alert("Спасибо! Мы скоро свяжемся.");
  };

  return (
    <div className="bg-joinus my-32">
      <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8">
        <div className="text-center">
          <h3 className="text-blue text-sm font-medium tracking-widest uppercase">Присоединяйтесь</h3>
          <h2 className="text-4xl sm:text-6xl font-bold my-6 leading-10">
            Подключите сопровождение <br /> и адаптацию от NetNext
          </h2>
          <p className="text-gray-600 text-base font-normal max-w-2xl mx-auto">
            Мы берём на себя техническую поддержку, визуальные обновления, Telegram-интеграции и системное сопровождение. Всё работает на мобильных, CRM и соцсетях.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl pt-8">
          <div className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-lightgrey sm:rounded-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ваше имя"
              className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-lightgrey pl-1 focus:outline-none bg-emailbg focus:text-black w-full sm:w-1/3"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ваш email"
              className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:border-l border-linegrey bg-lightgrey focus:outline-none bg-emailbg focus:text-black w-full sm:w-1/3"
            />
            <div className="sm:mr-3 w-full sm:w-auto">
              <button
                type="submit"
                className="joinButton w-full text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-blue hover:bg-btnblue py-4 px-8"
              >
                Отправить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
