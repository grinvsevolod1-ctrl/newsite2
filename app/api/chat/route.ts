import OpenAI from "openai"

export const maxDuration = 30

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages, locale } = await req.json()

    const systemPrompt =
      locale === "ru"
        ? `Ты - AI помощник компании NetNext, профессиональной студии разработки программного обеспечения из Беларуси.

О компании:
- 50+ профессиональных разработчиков
- Работаем в Беларуси (Минск, Гомель, Брест, Гродно, Витебск, Могилев) и по всему миру
- Услуги: веб-разработка, мобильные приложения (iOS/Android), Telegram боты, AI решения, десктопные приложения, индивидуальный дизайн
- Специализация: React, Next.js, Node.js, React Native, Flutter, Python, AI/ML
- Контакты: +375291414555, info@netnext.site (техподдержка), team@netnext.site (сотрудничество)
- Instagram: @netnext.site
- Сайт: https://www.netnext.site

Твоя задача:
- Отвечать на вопросы о наших услугах
- Помогать с выбором подходящего решения
- Предоставлять информацию о ценах и сроках
- Направлять к нужным специалистам
- Быть дружелюбным и профессиональным

Отвечай кратко и по делу на русском языке. Если не знаешь точного ответа, предложи связаться с нашей командой.`
        : `You are an AI assistant for NetNext, a professional software development studio from Belarus.

About the company:
- 50+ professional developers
- Working in Belarus (Minsk, Gomel, Brest, Grodno, Vitebsk, Mogilev) and worldwide
- Services: web development, mobile apps (iOS/Android), Telegram bots, AI solutions, desktop applications, custom design
- Specialization: React, Next.js, Node.js, React Native, Flutter, Python, AI/ML
- Contacts: +375291414555, info@netnext.site (support), team@netnext.site (partnership)
- Instagram: @netnext.site
- Website: https://www.netnext.site

Your tasks:
- Answer questions about our services
- Help choose the right solution
- Provide information about pricing and timelines
- Direct to the right specialists
- Be friendly and professional

Answer concisely and to the point. If you don't know the exact answer, suggest contacting our team.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    })

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ""
            if (content) {
              controller.enqueue(encoder.encode(`0:${JSON.stringify(content)}\n`))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Vercel-AI-Data-Stream": "v1",
      },
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
