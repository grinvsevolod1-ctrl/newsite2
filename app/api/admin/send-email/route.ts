import { type NextRequest, NextResponse } from "next/server"
import { requireAuth, requireRole } from "@/lib/auth/middleware"
import { z } from "zod"

const emailSchema = z.object({
  recipients: z.array(z.string().email()),
  subject: z.string().min(1),
  body: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const roleCheck = await requireRole(authResult.user.id, ["admin", "manager"])
    if (!roleCheck.success) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const validated = emailSchema.parse(body)

    // Send email via Telegram notification for now
    // In production, integrate with email service like SendGrid, Resend, etc.
    const message = `
📧 Массовая рассылка

Получатели: ${validated.recipients.length}
Тема: ${validated.subject}

Сообщение:
${validated.body}
    `

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })

    return NextResponse.json({ success: true, sent: validated.recipients.length })
  } catch (error: any) {
    console.error("[v0] Error sending bulk email:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
