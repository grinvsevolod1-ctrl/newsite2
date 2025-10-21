"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, TrendingUp, Users, CheckCircle } from "lucide-react"

export default function ManagerPanel() {
  const [stats, setStats] = useState({
    activeOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    activeProjects: 0,
  })
  const [orders, setOrders] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    // Load orders
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(10)

    if (ordersData) {
      setOrders(ordersData)

      const active = ordersData.filter((o) => o.status === "in_progress").length
      const completed = ordersData.filter((o) => o.status === "completed").length
      const revenue = ordersData
        .filter((o) => o.status === "completed")
        .reduce((sum, o) => sum + (o.total_amount || 0), 0)

      setStats({
        activeOrders: active,
        completedOrders: completed,
        totalRevenue: revenue,
        activeProjects: active,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Панель менеджера</h2>
        <p className="text-muted-foreground">Управление заказами и проектами</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные заказы</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Завершено</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Выручка</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Проекты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Management */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Активные</TabsTrigger>
          <TabsTrigger value="pending">Ожидают</TabsTrigger>
          <TabsTrigger value="completed">Завершенные</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {orders
            .filter((o) => o.status === "in_progress")
            .map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.service_type}</CardTitle>
                      <CardDescription>Клиент: {order.profiles?.full_name || order.profiles?.email}</CardDescription>
                    </div>
                    <Badge variant="default">В работе</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Сумма: ${order.total_amount}</div>
                    <Button size="sm">Управление</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        {/* Similar for other tabs */}
      </Tabs>
    </div>
  )
}
