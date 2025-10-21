"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Clock, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Ticket {
  id: string
  ticket_number: string
  subject: string
  description: string
  status: string
  priority: string
  category: string
  created_at: string
  messages?: { count: number }[]
}

export function TicketSystem({ userRole }: { userRole: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*, messages:ticket_messages(count)")
        .order("created_at", { ascending: false })

      if (error) throw error
      setTickets(data || [])
    } catch (error) {
      console.error("Error loading tickets:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить тикеты",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createTicket = async (formData: FormData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("support_tickets").insert({
        user_id: user.id,
        subject: formData.get("subject"),
        description: formData.get("description"),
        category: formData.get("category"),
        priority: formData.get("priority"),
      })

      if (error) throw error

      toast({
        title: "Успешно",
        description: "Тикет создан",
      })
      setIsCreateDialogOpen(false)
      loadTickets()
    } catch (error) {
      console.error("Error creating ticket:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось создать тикет",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-500/10 text-green-500"
      case "in_progress":
        return "bg-blue-500/10 text-blue-500"
      case "waiting":
        return "bg-yellow-500/10 text-yellow-500"
      case "closed":
        return "bg-gray-500/10 text-gray-500"
      default:
        return "bg-orange-500/10 text-orange-500"
    }
  }

  if (loading) {
    return <div className="text-center py-8">Загрузка тикетов...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Поддержка</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Создать тикет</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый тикет</DialogTitle>
              <DialogDescription>Опишите вашу проблему или вопрос</DialogDescription>
            </DialogHeader>
            <form action={createTicket} className="space-y-4">
              <Input name="subject" placeholder="Тема" required />
              <Textarea name="description" placeholder="Описание" rows={4} required />
              <Select name="category" defaultValue="general">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Техническая проблема</SelectItem>
                  <SelectItem value="billing">Оплата</SelectItem>
                  <SelectItem value="general">Общий вопрос</SelectItem>
                  <SelectItem value="feature_request">Запрос функции</SelectItem>
                  <SelectItem value="bug">Ошибка</SelectItem>
                </SelectContent>
              </Select>
              <Select name="priority" defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                  <SelectItem value="urgent">Срочный</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full">
                Создать тикет
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                    <Badge variant="outline">{ticket.ticket_number}</Badge>
                  </div>
                  <CardDescription>{ticket.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {ticket.priority}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {ticket.messages?.[0]?.count || 0} сообщений
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(ticket.created_at).toLocaleDateString("ru-RU")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
