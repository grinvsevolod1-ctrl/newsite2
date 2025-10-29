"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocale } from "@/contexts/locale-context"
import { usePerformance } from "@/contexts/performance-context"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Phone,
  Clock,
  DollarSign,
  Code,
  Smartphone,
  MessageSquare,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface QuickQuestion {
  icon: React.ReactNode
  question: string
  answer: string
  category: string
}

export function AIChatWidget() {
  const { locale } = useLocale()
  const { performanceMode } = usePerformance()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const shouldAnimate = performanceMode !== "low"

  const quickQuestions: QuickQuestion[] =
    locale === "ru"
      ? [
          {
            icon: <DollarSign className="h-4 w-4" />,
            question: "Сколько стоит разработка сайта?",
            answer:
              "Стоимость разработки сайта зависит от сложности проекта:\n\n• Лендинг: от 500 BYN\n• Корпоративный сайт: от 1500 BYN\n• Интернет-магазин: от 3000 BYN\n• Веб-приложение: от 5000 BYN\n\nТочную стоимость можно рассчитать в нашем калькуляторе или получить персональное предложение, связавшись с нами.",
            category: "Цены",
          },
          {
            icon: <Clock className="h-4 w-4" />,
            question: "Какие сроки разработки?",
            answer:
              "Сроки разработки зависят от типа проекта:\n\n• Лендинг: 5-10 дней\n• Корпоративный сайт: 2-4 недели\n• Интернет-магазин: 4-8 недель\n• Веб-приложение: от 2 месяцев\n\nМы работаем по Agile методологии с еженедельными демо и можем ускорить разработку при необходимости.",
            category: "Сроки",
          },
          {
            icon: <Code className="h-4 w-4" />,
            question: "Какие технологии вы используете?",
            answer:
              "Мы используем современный стек технологий:\n\n• Frontend: React, Next.js, TypeScript, Tailwind CSS\n• Backend: Node.js, Python, PostgreSQL, MongoDB\n• Mobile: React Native, Flutter\n• AI: OpenAI, TensorFlow, PyTorch\n• DevOps: Docker, Kubernetes, CI/CD\n\nВыбор технологий зависит от требований проекта.",
            category: "Технологии",
          },
          {
            icon: <Smartphone className="h-4 w-4" />,
            question: "Разрабатываете мобильные приложения?",
            answer:
              "Да! Мы разрабатываем мобильные приложения:\n\n• iOS и Android (нативные)\n• Кроссплатформенные (React Native, Flutter)\n• PWA (Progressive Web Apps)\n• Telegram боты и мини-приложения\n\nВсе приложения адаптированы под современные стандарты и оптимизированы для производительности.",
            category: "Услуги",
          },
          {
            icon: <MessageSquare className="h-4 w-4" />,
            question: "Предоставляете поддержку после запуска?",
            answer:
              "Конечно! Мы предлагаем несколько вариантов поддержки:\n\n• Базовая: исправление критических ошибок (3 месяца бесплатно)\n• Стандартная: обновления + техподдержка (от 200 BYN/мес)\n• Премиум: полное сопровождение + развитие (от 500 BYN/мес)\n\nТакже доступна разовая помощь по запросу.",
            category: "Поддержка",
          },
          {
            icon: <Phone className="h-4 w-4" />,
            question: "Как с вами связаться?",
            answer:
              "Свяжитесь с нами удобным способом:\n\n📞 Телефон: +375 29 141 45 55\n📧 Email: info@netnext.site\n💬 Telegram: @netnext_support\n\nРаботаем: Пн-Пт 9:00-18:00\nОтвечаем в течение 1 часа!",
            category: "Контакты",
          },
          {
            icon: <Zap className="h-4 w-4" />,
            question: "Есть ли скидки для новых клиентов?",
            answer:
              "Да! Специальные предложения для новых клиентов:\n\n🎁 15% скидка на первый заказ (промокод: WELCOME15)\n🆓 Бесплатная консультация и аудит проекта\n🚀 Бесплатный перенос сайта с другого хостинга\n💎 3 месяца технической поддержки в подарок\n\nЗарегистрируйтесь на сайте для получения эксклюзивных предложений!",
            category: "Акции",
          },
        ]
      : [
          {
            icon: <DollarSign className="h-4 w-4" />,
            question: "How much does website development cost?",
            answer:
              "Website development cost depends on project complexity:\n\n• Landing page: from $50\n• Corporate website: from $150\n• E-commerce: from $300\n• Web application: from $500\n\nYou can calculate exact cost in our calculator or get a personalized quote by contacting us.",
            category: "Pricing",
          },
          {
            icon: <Clock className="h-4 w-4" />,
            question: "What are the development timelines?",
            answer:
              "Development timelines depend on project type:\n\n• Landing page: 5-10 days\n• Corporate website: 2-4 weeks\n• E-commerce: 4-8 weeks\n• Web application: from 2 months\n\nWe work with Agile methodology with weekly demos and can accelerate development if needed.",
            category: "Timeline",
          },
          {
            icon: <Code className="h-4 w-4" />,
            question: "What technologies do you use?",
            answer:
              "We use modern technology stack:\n\n• Frontend: React, Next.js, TypeScript, Tailwind CSS\n• Backend: Node.js, Python, PostgreSQL, MongoDB\n• Mobile: React Native, Flutter\n• AI: OpenAI, TensorFlow, PyTorch\n• DevOps: Docker, Kubernetes, CI/CD\n\nTechnology choice depends on project requirements.",
            category: "Technologies",
          },
          {
            icon: <Smartphone className="h-4 w-4" />,
            question: "Do you develop mobile apps?",
            answer:
              "Yes! We develop mobile applications:\n\n• iOS and Android (native)\n• Cross-platform (React Native, Flutter)\n• PWA (Progressive Web Apps)\n• Telegram bots and mini-apps\n\nAll apps are adapted to modern standards and optimized for performance.",
            category: "Services",
          },
          {
            icon: <MessageSquare className="h-4 w-4" />,
            question: "Do you provide support after launch?",
            answer:
              "Of course! We offer several support options:\n\n• Basic: critical bug fixes (3 months free)\n• Standard: updates + tech support (from $20/month)\n• Premium: full support + development (from $50/month)\n\nOne-time assistance is also available on request.",
            category: "Support",
          },
          {
            icon: <Phone className="h-4 w-4" />,
            question: "How to contact you?",
            answer:
              "Contact us in a convenient way:\n\n📞 Phone: +375 29 141 45 55\n📧 Email: info@netnext.site\n💬 Telegram: @netnext_support\n\nWorking hours: Mon-Fri 9:00-18:00\nWe respond within 1 hour!",
            category: "Contacts",
          },
          {
            icon: <Zap className="h-4 w-4" />,
            question: "Are there discounts for new clients?",
            answer:
              "Yes! Special offers for new clients:\n\n🎁 15% discount on first order (promo code: WELCOME15)\n🆓 Free consultation and project audit\n🚀 Free website migration from another host\n💎 3 months of technical support as a gift\n\nRegister on the site to get exclusive offers!",
            category: "Promotions",
          },
        ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleQuickQuestion = (question: QuickQuestion) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question.question,
    }

    setMessages((prev) => [...prev, userMessage])
    setShowQuickQuestions(false)
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: question.answer,
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setShowQuickQuestions(false)
    setIsTyping(true)

    // Find matching quick question or provide default response
    const matchedQuestion = quickQuestions.find((q) =>
      input.toLowerCase().includes(q.question.toLowerCase().split(" ").slice(0, 3).join(" ").toLowerCase()),
    )

    setTimeout(
      () => {
        const response = matchedQuestion
          ? matchedQuestion.answer
          : locale === "ru"
            ? "Спасибо за ваш вопрос! Для получения детальной консультации, пожалуйста, свяжитесь с нами:\n\n📞 +375 29 141 45 55\n📧 info@netnext.site\n💬 Telegram: @netnext_support\n\nМы ответим в течение 1 часа!"
            : "Thank you for your question! For detailed consultation, please contact us:\n\n📞 +375 29 141 45 55\n📧 info@netnext.site\n💬 Telegram: @netnext_support\n\nWe will respond within 1 hour!"

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  return (
    <>
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-50">
        {shouldAnimate && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-xl opacity-60 animate-pulse" />
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={cn(
            "relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full shadow-2xl",
            "bg-gradient-to-br from-primary via-accent to-secondary",
            shouldAnimate && "hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-300",
            "border-2 border-white/20",
            "group overflow-hidden",
            isOpen && "rotate-90",
          )}
        >
          {shouldAnimate && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-accent/50 to-secondary/50 animate-gradient-shift" />
          )}

          <div className="relative z-10">
            {isOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white transition-transform group-hover:rotate-90" />
            ) : (
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white transition-transform group-hover:scale-110" />
            )}
          </div>

          {!isOpen && (
            <Sparkles className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-3 w-3 sm:h-4 sm:w-4 text-white animate-pulse" />
          )}
        </Button>

        {!isOpen && messages.length === 0 && (
          <div className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 rounded-full border-2 border-background flex items-center justify-center animate-bounce">
            <span className="text-[9px] sm:text-[10px] font-bold text-white">!</span>
          </div>
        )}
      </div>

      {isOpen && (
        <Card
          className={cn(
            "fixed z-50 shadow-2xl flex flex-col border-2 border-primary/20 bg-background/95 backdrop-blur-xl",
            shouldAnimate && "animate-in slide-in-from-bottom-4 duration-300",
            "bottom-[4.5rem] right-3 left-3",
            "max-h-[calc(100vh-6rem)]",
            "sm:bottom-20 sm:right-4 sm:left-auto sm:w-[380px] sm:h-[550px]",
            "md:bottom-24 md:right-6 md:w-[420px] md:h-[600px]",
            "lg:w-[440px] lg:h-[650px]",
          )}
        >
          <CardHeader className="border-b border-primary/20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm shrink-0 p-3 sm:p-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-md opacity-60" />
                  <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base md:text-lg gradient-text truncate">
                    {locale === "ru" ? "AI Помощник" : "AI Assistant"}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-normal truncate">
                    {locale === "ru" ? "Онлайн • Отвечает мгновенно" : "Online • Responds instantly"}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-primary/10 shrink-0"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
            <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
              <div className="space-y-3">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="text-center py-4 space-y-3">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-40 animate-pulse" />
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Bot className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2 px-3 sm:px-4">
                        <p className="text-sm sm:text-base md:text-lg font-semibold gradient-text">
                          {locale === "ru" ? "Привет! 👋" : "Hello! 👋"}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                          {locale === "ru"
                            ? "Я помощник NetNext. Выберите вопрос ниже или задайте свой!"
                            : "I'm NetNext assistant. Choose a question below or ask your own!"}
                        </p>
                      </div>
                    </div>

                    {showQuickQuestions && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground px-1">
                          {locale === "ru" ? "Популярные вопросы:" : "Popular questions:"}
                        </p>
                        <div className="grid gap-2">
                          {quickQuestions.map((q, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickQuestion(q)}
                              className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 hover:bg-muted border border-primary/10 hover:border-primary/30 transition-all text-left group"
                            >
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                {q.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-foreground truncate">{q.question}</p>
                                <p className="text-[10px] text-muted-foreground">{q.category}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg">
                        <Bot className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 max-w-[85%] sm:max-w-[80%] md:max-w-[75%] shadow-md",
                        message.role === "user"
                          ? "bg-gradient-to-br from-primary to-accent text-white"
                          : "bg-muted/50 backdrop-blur-sm text-foreground border border-primary/10",
                      )}
                    >
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shrink-0 shadow-lg">
                        <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg">
                      <Bot className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
                    </div>
                    <div className="rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 bg-muted/50 backdrop-blur-sm border border-primary/10">
                      <div className="flex gap-1.5">
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary animate-bounce" />
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-secondary animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSubmit}
              className="p-2.5 sm:p-3 md:p-4 border-t border-primary/20 bg-muted/30 backdrop-blur-sm shrink-0"
            >
              <div className="flex gap-1.5 sm:gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={locale === "ru" ? "Напишите сообщение..." : "Type a message..."}
                  disabled={isTyping}
                  className="flex-1 bg-background border-2 border-primary/30 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 rounded-xl text-xs sm:text-sm h-10 sm:h-11 px-3 sm:px-4 placeholder:text-muted-foreground/60 transition-all"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isTyping || !input.trim()}
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-primary to-accent hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}
