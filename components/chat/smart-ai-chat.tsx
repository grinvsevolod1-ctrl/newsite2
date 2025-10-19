"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, X, Minimize2, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  context?: string
}

interface SmartAIChatProps {
  isOpen: boolean
  onClose: () => void
}

export function SmartAIChat({ isOpen, onClose }: SmartAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Привет! Я умный AI помощник NetNext. Могу помочь вам с выбором услуг, расчетом стоимости проекта или ответить на любые вопросы о разработке. Чем могу помочь?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [userContext, setUserContext] = useState({
    visitedPages: [] as string[],
    interests: [] as string[],
    lastCalculation: null as any,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Track user context
    const currentPage = window.location.pathname
    if (!userContext.visitedPages.includes(currentPage)) {
      setUserContext((prev) => ({
        ...prev,
        visitedPages: [...prev.visitedPages, currentPage],
      }))
    }

    // Load chat history from localStorage
    const savedMessages = localStorage.getItem("chat-history")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Context-aware responses
    if (lowerMessage.includes("цен") || lowerMessage.includes("стоимост")) {
      return "Стоимость проекта зависит от его сложности. Я вижу, что вы еще не использовали наш калькулятор. Хотите, я помогу рассчитать примерную стоимость? Просто расскажите, какой проект вы планируете."
    }

    if (lowerMessage.includes("портфолио") || lowerMessage.includes("работ")) {
      return "У нас более 50 успешных проектов! Я вижу несколько интересных кейсов, которые могут вам подойти. Какая сфера вас интересует: веб-разработка, мобильные приложения, боты или AI решения?"
    }

    if (lowerMessage.includes("срок") || lowerMessage.includes("время")) {
      return "Сроки разработки зависят от сложности проекта. В среднем: простой сайт - 2-3 недели, веб-приложение - 1-3 месяца, мобильное приложение - 2-4 месяца. Расскажите подробнее о вашем проекте, и я дам более точную оценку."
    }

    if (lowerMessage.includes("технолог") || lowerMessage.includes("стек")) {
      return "Мы работаем с современным стеком: React, Next.js, TypeScript для фронтенда; Node.js, Python для бэкенда; PostgreSQL, MongoDB для баз данных; React Native для мобильных приложений. Также специализируемся на AI/ML решениях."
    }

    if (lowerMessage.includes("команд") || lowerMessage.includes("разработчик")) {
      return "В нашей команде более 50 профессиональных разработчиков: frontend, backend, mobile, DevOps, UI/UX дизайнеры и QA инженеры. Каждый проект ведет опытный тимлид."
    }

    // Default intelligent response
    return "Отличный вопрос! Я могу помочь вам с выбором технологий, расчетом стоимости, подбором команды или показать похожие проекты из нашего портфолио. Что вас интересует больше всего?"
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getContextualResponse(input),
          timestamp: new Date(),
          context: userContext.visitedPages.join(", "),
        }

        setMessages((prev) => {
          const updated = [...prev, aiResponse]
          localStorage.setItem("chat-history", JSON.stringify(updated))
          return updated
        })
        setIsLoading(false)

        // Unlock achievement
        if (typeof window !== "undefined" && (window as any).unlockAchievement) {
          ;(window as any).unlockAchievement("ai-chat-user")
        }
      },
      1000 + Math.random() * 1000,
    )
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-background/98 to-background/95 shadow-2xl backdrop-blur-xl",
          isMinimized
            ? "bottom-24 right-4 h-16 w-80"
            : "inset-4 md:bottom-24 md:right-4 md:h-[600px] md:w-[420px] md:inset-auto",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary/10 bg-gradient-to-r from-primary/10 to-accent/10 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Ассистент</h3>
              <p className="text-xs text-muted-foreground">Всегда на связи</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-lg p-2 transition-colors hover:bg-muted"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.role === "user"
                        ? "bg-gradient-to-br from-primary to-accent text-white"
                        : "bg-muted text-foreground",
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-primary/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 rounded-xl border border-primary/20 bg-muted/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
