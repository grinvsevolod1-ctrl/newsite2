"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Play, Square } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TimeEntry {
  id: string
  task_id: string
  description: string
  hours: number
  date: string
  is_billable: boolean
  task?: { title: string }
}

export function TimeTracker({ userRole }: { userRole: string }) {
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [isTracking, setIsTracking] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    if (["developer", "freelancer", "admin", "manager"].includes(userRole)) {
      loadEntries()
      loadTasks()
    }
  }, [userRole])

  const loadEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("time_entries")
        .select("*, task:project_tasks(title)")
        .order("date", { ascending: false })
        .limit(10)

      if (error) throw error
      setEntries(data || [])
    } catch (error) {
      console.error("Error loading time entries:", error)
    }
  }

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("project_tasks")
        .select("id, title")
        .in("status", ["todo", "in_progress"])

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error("Error loading tasks:", error)
    }
  }

  const startTracking = () => {
    setIsTracking(true)
    setStartTime(new Date())
  }

  const stopTracking = async (taskId: string, description: string) => {
    if (!startTime) return

    const endTime = new Date()
    const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("time_entries").insert({
        user_id: user.id,
        task_id: taskId,
        description,
        hours: Math.round(hours * 100) / 100,
        date: new Date().toISOString().split("T")[0],
        is_billable: true,
      })

      if (error) throw error

      toast({
        title: "Успешно",
        description: `Записано ${Math.round(hours * 100) / 100} часов`,
      })

      setIsTracking(false)
      setStartTime(null)
      loadEntries()
    } catch (error) {
      console.error("Error saving time entry:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить запись",
        variant: "destructive",
      })
    }
  }

  if (!["developer", "freelancer", "admin", "manager"].includes(userRole)) {
    return null
  }

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Учет времени
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isTracking ? (
            <Button onClick={startTracking} className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Начать отслеживание
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-center text-2xl font-mono">
                {startTime && new Date().getTime() - startTime.getTime() > 0
                  ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000 / 60)
                  : 0}{" "}
                мин
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите задачу" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea placeholder="Описание работы" />
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  // Get values from form
                  const taskId = (document.querySelector('[role="combobox"]') as any)?.value
                  const description = (document.querySelector("textarea") as HTMLTextAreaElement)?.value
                  if (taskId) stopTracking(taskId, description)
                }}
              >
                <Square className="h-4 w-4 mr-2" />
                Остановить и сохранить
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Последние записи</CardTitle>
          <p className="text-sm text-muted-foreground">Всего: {totalHours.toFixed(2)} часов</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {entries.map((entry) => (
              <div key={entry.id} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <p className="font-medium text-sm">{entry.task?.title}</p>
                  <p className="text-xs text-muted-foreground">{entry.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString("ru-RU")}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold">{entry.hours}ч</p>
                  {entry.is_billable && <p className="text-xs text-green-500">Оплачиваемо</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
