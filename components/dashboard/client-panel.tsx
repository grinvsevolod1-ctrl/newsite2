"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Clock, CheckCircle2 } from "lucide-react"

interface ClientPanelProps {
  isCustomer: boolean
}

export default function ClientPanel({ isCustomer }: ClientPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{isCustomer ? "Панель заказчика" : "Панель клиента"}</h2>
          <p className="text-muted-foreground">Ваши заказы и проекты</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Новый заказ
        </Button>
      </div>

      {isCustomer && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">VIP</Badge>
              Статус заказчика
            </CardTitle>
            <CardDescription>У вас есть доступ к приоритетной поддержке и персональным скидкам</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">В работе</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Завершено</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ваши заказы</CardTitle>
          <CardDescription>История и статус ваших заказов</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Разработка корпоративного сайта</h4>
              <p className="text-sm text-muted-foreground">Создан: 15 января 2025</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge>В работе</Badge>
              <Button size="sm" variant="outline">
                Детали
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
