"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, ShoppingCart, DollarSign, TrendingUp, Search } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useLocale } from "@/contexts/locale-context"

interface User {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
}

interface Order {
  id: string
  order_number: string
  user_id: string
  service_type: string
  package_name: string
  final_price: number
  currency: string
  status: string
  payment_status: string
  created_at: string
  profiles: { full_name: string; email: string }
}

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0, pendingOrders: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { locale } = useLocale()
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    // Load users
    const { data: usersData } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

    if (usersData) setUsers(usersData)

    // Load orders
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false })

    if (ordersData) {
      setOrders(ordersData as any)

      // Calculate stats
      const totalRevenue = ordersData.reduce((sum, order) => sum + Number(order.final_price), 0)
      const pendingOrders = ordersData.filter((o) => o.status === "pending").length

      setStats({
        totalUsers: usersData?.length || 0,
        totalOrders: ordersData.length,
        totalRevenue,
        pendingOrders,
      })
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", userId)

    if (error) {
      console.log("[v0] Error updating role:", error)
      alert(locale === "ru" ? "Ошибка обновления роли" : "Error updating role")
    } else {
      console.log("[v0] Role updated successfully")
      alert(locale === "ru" ? "Роль обновлена" : "Role updated")
      loadData()
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId)

    if (error) {
      console.log("[v0] Error updating status:", error)
      alert(locale === "ru" ? "Ошибка обновления статуса" : "Error updating status")
    } else {
      console.log("[v0] Status updated successfully")
      alert(locale === "ru" ? "Статус обновлен" : "Status updated")
      loadData()
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const content = {
    ru: {
      title: "Панель администратора",
      users: "Пользователи",
      orders: "Заказы",
      stats: "Статистика",
      totalUsers: "Всего пользователей",
      totalOrders: "Всего заказов",
      totalRevenue: "Общий доход",
      pendingOrders: "Ожидающие заказы",
      search: "Поиск...",
      filter: "Фильтр",
      all: "Все",
      pending: "Ожидает",
      processing: "В работе",
      completed: "Завершен",
      cancelled: "Отменен",
      name: "Имя",
      email: "Email",
      role: "Роль",
      registered: "Зарегистрирован",
      actions: "Действия",
      orderNumber: "Номер заказа",
      service: "Услуга",
      price: "Цена",
      status: "Статус",
      paymentStatus: "Оплата",
      date: "Дата",
    },
    en: {
      title: "Admin Panel",
      users: "Users",
      orders: "Orders",
      stats: "Statistics",
      totalUsers: "Total Users",
      totalOrders: "Total Orders",
      totalRevenue: "Total Revenue",
      pendingOrders: "Pending Orders",
      search: "Search...",
      filter: "Filter",
      all: "All",
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
      cancelled: "Cancelled",
      name: "Name",
      email: "Email",
      role: "Role",
      registered: "Registered",
      actions: "Actions",
      orderNumber: "Order Number",
      service: "Service",
      price: "Price",
      status: "Status",
      paymentStatus: "Payment",
      date: "Date",
    },
  }

  const t = content[locale]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">{t.title}</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalUsers}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalOrders}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalRevenue}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalRevenue / 100).toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.pendingOrders}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">{t.orders}</TabsTrigger>
          <TabsTrigger value="users">{t.users}</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>{t.orders}</CardTitle>
                  <CardDescription>Manage all orders</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t.search}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.all}</SelectItem>
                      <SelectItem value="pending">{t.pending}</SelectItem>
                      <SelectItem value="processing">{t.processing}</SelectItem>
                      <SelectItem value="completed">{t.completed}</SelectItem>
                      <SelectItem value="cancelled">{t.cancelled}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.orderNumber}</TableHead>
                      <TableHead>{t.email}</TableHead>
                      <TableHead>{t.service}</TableHead>
                      <TableHead>{t.price}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead>{t.paymentStatus}</TableHead>
                      <TableHead>{t.date}</TableHead>
                      <TableHead>{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">{order.order_number}</TableCell>
                        <TableCell className="text-sm">{order.profiles?.email}</TableCell>
                        <TableCell className="text-sm">{order.package_name}</TableCell>
                        <TableCell className="text-sm">${(order.final_price / 100).toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "processing"
                                  ? "secondary"
                                  : order.status === "cancelled"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.payment_status === "paid" ? "default" : "outline"}>
                            {order.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">{t.pending}</SelectItem>
                              <SelectItem value="processing">{t.processing}</SelectItem>
                              <SelectItem value="completed">{t.completed}</SelectItem>
                              <SelectItem value="cancelled">{t.cancelled}</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.users}</CardTitle>
              <CardDescription>Manage user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.name}</TableHead>
                      <TableHead>{t.email}</TableHead>
                      <TableHead>{t.role}</TableHead>
                      <TableHead>{t.registered}</TableHead>
                      <TableHead>{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name || "N/A"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role || "user"}</Badge>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select value={user.role || "user"} onValueChange={(value) => updateUserRole(user.id, value)}>
                            <SelectTrigger className="w-28 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
