import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();
  const lower = question.toLowerCase();
  let answer = "";

  if (["бот", "telegram", "телеграм"].some(k => lower.includes(k))) {
    answer = "Мы сопровождаем Telegram-ботов: обновления, интеграции, уведомления, CRM.";
  } else if (["сайт", "лендинг", "страница", "web"].some(k => lower.includes(k))) {
    answer = "Мы берём сайты на поддержку: адаптация, SEO, формы, Telegram-связь.";
  } else if (["цена", "тариф", "стоимость", "подписка"].some(k => lower.includes(k))) {
    answer = "У нас есть тарифы Starter, Growth и Pro. Подробнее — в разделе «Поддержка».";
  } else if (["crm", "amo", "битрикс", "интеграция", "воронка"].some(k => lower.includes(k))) {
    answer = "Интегрируем amoCRM, Bitrix, Tilda, Telegram и формы. Всё работает в реальном времени.";
  } else if (["визуал", "брендинг", "стиль", "дизайн"].some(k => lower.includes(k))) {
    answer = "Мы создаём визуальные системы, которые масштабируются: Telegram, Instagram, сайт — всё едино.";
  } else if (["приложение", "мобильное", "ios", "android"].some(k => lower.includes(k))) {
    answer = "Мы разрабатываем мобильные приложения с push-уведомлениями, аналитикой и Telegram-интеграцией.";
  } else if (["поддержка", "сопровождение", "обслуживание"].some(k => lower.includes(k))) {
    answer = "Поддержка включает обновления, визуальные правки, аналитику, связь через Telegram и email.";
  } else if (["контакт", "связаться", "телеграм", "email"].some(k => lower.includes(k))) {
    answer = "Связаться с нами можно через Telegram: @skufig1 или через форму на сайте.";
  } else {
    console.log("Неопознанный вопрос:", question);
    answer = "Хороший вопрос! Мы уточним и ответим в Telegram. Или напишите нам напрямую: @skufig1.";
  }

  return NextResponse.json({ answer });
}
