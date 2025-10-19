import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, type } = body

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials not configured")
      return NextResponse.json({ error: "Telegram not configured" }, { status: 500 })
    }

    const telegramMessage = `
🔔 *Новое сообщение с сайта NetNext*

📋 *Тип:* ${type || "Обратная связь"}
👤 *Имя:* ${name}
📧 *Email:* ${email}
${phone ? `📱 *Телефон:* ${phone}` : ""}

💬 *Сообщение:*
${message}

⏰ *Время:* ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}
    `.trim()

    // Send to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })

    if (!telegramResponse.ok) {
      const error = await telegramResponse.json()
      console.error("Telegram API error:", error)
      return NextResponse.json({ error: "Failed to send to Telegram" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
