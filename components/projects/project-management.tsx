"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Calendar, Clock, User, AlertCircle, CheckCircle, PlayCircle, PauseCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  assigned_to: string
  estimated_hours: number
  actual_hours: number
  due_date: string
  assignee?: { full_name: string }
}

export function ProjectManagement({ orderId, userRole }: { orderId?: string; userRole: string }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    loadTasks()
  }, [orderId])

  const loadTasks = async () => {
    try {
      let query = supabase
        .from("project_tasks")
        .select(`
          *,
          assignee:assigned_to(full_name)
        `)
        .order("created_at", { ascending: false })

      if (orderId) {
        query = query.eq("order_id", orderId)
      }

      const { data, error } = await query

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error("Error loading tasks:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить задачи",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (formData: FormData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("project_tasks").insert({
        order_id: orderId,
        title: formData.get("title"),
        description: formData.get("description"),
        priority: formData.get("priority"),
        estimated_hours: formData.get("estimated_hours"),
        due_date: formData.get("due_date"),
        created_by: user.id,
      })

      if (error) throw error

      toast({
        title: "Успешно",
        description: "Задача создана",
      })
      setIsCreateDialogOpen(false)
      loadTasks()
    } catch (error) {
      console.error("Error creating task:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось создать задачу",
        variant: "destructive",
      })
    }
  }

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("project_tasks")
        .update({
          status: newStatus,
          ...(newStatus === "completed" && { completed_at: new Date().toISOString() }),
        })
        .eq("id", taskId)

      if (error) throw error

      toast({
        title: "Успешно",
        description: "Статус задачи обновлен",
      })
      loadTasks()
    } catch (error) {
      console.error("Error updating task:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in_progress":
        return <PlayCircle className="h-4 w-4" />
      case "blocked":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <PauseCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "in_progress":
        return "bg-blue-500/10 text-blue-500"
      case "blocked":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/10 text-red-500"
      case "high":
        return "bg-orange-500/10 text-orange-500"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  if (loading) {
    return <div className="text-center py-8">Загрузка задач...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление задачами</h2>
        {["admin", "manager"].includes(userRole) && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>Создать задачу</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новая задача</DialogTitle>
                <DialogDescription>Создайте новую задачу для проекта</DialogDescription>
              </DialogHeader>
              <form action={createTask} className="space-y-4">
                <Input name="title" placeholder="Название задачи" required />
                <Textarea name="description" placeholder="Описание" rows={3} />
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
                <Input name="estimated_hours" type="number" placeholder="Оценка часов" />
                <Input name="due_date" type="date" />
                <Button type="submit" className="w-full">
                  Создать
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="todo">К выполнению</TabsTrigger>
          <TabsTrigger value="in_progress">В работе</TabsTrigger>
          <TabsTrigger value="completed">Завершено</TabsTrigger>
        </TabsList>

        {["all", "todo", "in_progress", "completed"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {tasks
              .filter((task) => tab === "all" || task.status === tab)
              .map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1">{task.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {task.assignee && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {task.assignee.full_name}
                        </div>
                      )}
                      {task.estimated_hours && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {task.estimated_hours}ч / {task.actual_hours}ч
                        </div>
                      )}
                      {task.due_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(task.due_date).toLocaleDateString("ru-RU")}
                        </div>
                      )}
                    </div>
                    {["admin", "manager", "developer"].includes(userRole) && (
                      <div className="flex gap-2 mt-4">
                        {task.status !== "in_progress" && (
                          <Button size="sm" variant="outline" onClick={() => updateTaskStatus(task.id, "in_progress")}>
                            Начать
                          </Button>
                        )}
                        {task.status !== "completed" && (
                          <Button size="sm" onClick={() => updateTaskStatus(task.id, "completed")}>
                            Завершить
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
