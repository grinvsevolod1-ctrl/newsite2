"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Привет! Я — NetNext-бот. Задай вопрос о тарифах, поддержке или Telegram-ботах." },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem("netnext-chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem("netnext-chat", JSON.stringify(messages));
  }, [messages]);

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

  if (isMobile) return null;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-button">
          💬
        </button>
      )}

      {/* Modal Chat */}
      {isOpen && (
        <div className="chat-overlay" onClick={() => setIsOpen(false)}>
          <div className="chat-window animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <span>NetNext Чат</span>
              <button onClick={() => setIsOpen(false)} className="text-sm hover:opacity-70">✕</button>
            </div>

            <div className="chat-body">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Задайте вопрос..."
              />
              <button type="submit">Отправить</button>
            </form>

            <div className="text-center text-xs text-gray-400 py-2">
              Или{" "}
              <Link href="https://t.me/skufig1" target="_blank" className="underline text-blue-300">
                напишите в Telegram
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
