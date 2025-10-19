"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocale } from "@/contexts/locale-context"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function AIChatWidget() {
  const { locale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ""

      const assistantMessageId = (Date.now() + 1).toString()
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
        },
      ])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const data = JSON.parse(line.slice(2))
                if (data.type === "text" && data.value) {
                  assistantMessage += data.value
                  setMessages((prev) =>
                    prev.map((m) => (m.id === assistantMessageId ? { ...m, content: assistantMessage } : m)),
                  )
                }
              } catch (e) {
                console.error("[v0] Error parsing chunk:", e)
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("[v0] Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            locale === "ru"
              ? "Извините, произошла ошибка. Пожалуйста, попробуйте позже."
              : "Sorry, an error occurred. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Pulsing glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-xl opacity-60 animate-pulse" />

        {/* Main button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={cn(
            "relative h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-2xl transition-all duration-300",
            "bg-gradient-to-br from-primary via-accent to-secondary",
            "hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]",
            "border-2 border-white/20",
            "group overflow-hidden",
            isOpen && "rotate-90",
          )}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-accent/50 to-secondary/50 animate-gradient-shift" />

          {/* Icon */}
          <div className="relative z-10">
            {isOpen ? (
              <X className="h-6 w-6 sm:h-7 sm:w-7 text-white transition-transform group-hover:rotate-90" />
            ) : (
              <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white transition-transform group-hover:scale-110" />
            )}
          </div>

          {/* Sparkle effect */}
          {!isOpen && <Sparkles className="absolute top-1 right-1 h-3 w-3 sm:h-4 sm:w-4 text-white animate-pulse" />}
        </Button>

        {/* Notification badge */}
        {!isOpen && messages.length === 0 && (
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full border-2 border-background flex items-center justify-center animate-bounce">
            <span className="text-[10px] font-bold text-white">!</span>
          </div>
        )}
      </div>

      {isOpen && (
        <Card
          className={cn(
            "fixed z-50 shadow-2xl flex flex-col border-2 border-primary/20 bg-background/95 backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300",
            // Mobile: full screen with safe padding
            "inset-4 sm:inset-auto",
            // Desktop: fixed size bottom right
            "sm:bottom-24 sm:right-6 sm:w-[420px] sm:h-[600px]",
            // Tablet: slightly smaller
            "md:w-[440px] md:h-[650px]",
          )}
        >
          <CardHeader className="border-b border-primary/20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm shrink-0">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-md opacity-60" />
                  <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-base sm:text-lg gradient-text">
                    {locale === "ru" ? "AI Помощник" : "AI Assistant"}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-normal">
                    {locale === "ru" ? "Онлайн • Отвечает мгновенно" : "Online • Responds instantly"}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-primary/10 shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
              <div className="space-y-3 sm:space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8 sm:py-12 space-y-3 sm:space-y-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-40 animate-pulse" />
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 px-4">
                      <p className="text-base sm:text-lg font-semibold gradient-text">
                        {locale === "ru" ? "Привет! 👋" : "Hello! 👋"}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
                        {locale === "ru"
                          ? "Я AI помощник NetNext. Задайте мне любой вопрос о наших услугах, ценах или процессе разработки!"
                          : "I'm NetNext AI assistant. Ask me anything about our services, pricing, or development process!"}
                      </p>
                    </div>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2 sm:gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg">
                        <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-3 py-2 sm:px-4 sm:py-3 max-w-[80%] sm:max-w-[75%] shadow-md",
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
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shrink-0 shadow-lg">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 sm:gap-3 justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg">
                      <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div className="rounded-2xl px-3 py-2 sm:px-4 sm:py-3 bg-muted/50 backdrop-blur-sm border border-primary/10">
                      <div className="flex gap-1.5">
                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-primary animate-bounce" />
                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-secondary animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSubmit}
              className="p-3 sm:p-4 border-t border-primary/20 bg-muted/30 backdrop-blur-sm shrink-0"
            >
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={locale === "ru" ? "Напишите сообщение..." : "Type a message..."}
                  disabled={isLoading}
                  className="flex-1 bg-background/50 border-primary/20 focus:border-primary/40 rounded-xl text-sm sm:text-base h-9 sm:h-10"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-primary to-accent hover:scale-105 transition-transform shadow-lg disabled:opacity-50 shrink-0"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}
