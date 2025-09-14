"use client";
import { useState } from "react";
import Link from "next/link";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Привет! Я — NetNext-бот. Задай вопрос о тарифах, поддержке или Telegram-ботах." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const response = await fetch("/api/netnext-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });

    const data = await response.json();
    const botMessage = { role: "bot", text: data.answer || "Извините, не понял вопрос. Можете уточнить?" };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
      <div className="bg-blue text-white px-4 py-3 font-semibold">NetNext Чат</div>
      <div className="p-4 h-80 overflow-y-auto space-y-3 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-md ${msg.role === "bot" ? "bg-lightgrey text-black" : "bg-blue text-white text-right"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Задайте вопрос..."
          className="flex-grow px-4 py-2 text-sm outline-none"
        />
        <button type="submit" className="px-4 text-blue font-semibold hover:text-hoblue">Отправить</button>
      </form>
      <div className="text-center text-xs text-gray-400 py-2">
        Или <Link href="https://t.me/skufig1" target="_blank" className="underline text-blue">напишите в Telegram</Link>
      </div>
    </div>
  );
};

export default ChatBot;
