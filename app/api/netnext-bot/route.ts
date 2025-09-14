import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();

  // Простейшая логика — можно заменить на интеграцию с ИИ
  const lower = question.toLowerCase();
  let answer = "";

  if (lower.includes("бот")) {
    answer = "Мы сопровождаем Telegram-ботов: обновления, интеграции, уведомления, CRM.";
  } else if (lower.includes("сайт")) {
    answer = "Мы берём сайты на поддержку: адаптация, SEO, формы, Telegram-связь.";
  } else if (lower.includes("цена") || lower.includes("тариф")) {
    answer = "У нас есть тарифы Starter, Growth и Pro. Подробнее — в разделе «Поддержка».";
  } else if (lower.includes("crm")) {
    answer = "Интегрируем amoCRM, Bitrix, Tilda, Telegram и формы.";
  } else {
    answer = "Хороший вопрос! Мы уточним и ответим в Telegram.";
  }

  return NextResponse.json({ answer });
}
