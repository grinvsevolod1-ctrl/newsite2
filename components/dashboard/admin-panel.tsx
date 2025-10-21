"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  ShoppingCart,
  DollarSign,
  Search,
  Plus,
  Trash2,
  FileText,
  Briefcase,
  Tag,
  MessageSquare,
  Shield,
  Eye,
} from "lucide-react"
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

export const AdminPanel = () => {
  const [users, setUsers] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [vacancies, setVacancies] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [promotions, setPromotions] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeProjects: 0,
    openTickets: 0,
    newUsersThisMonth: 0,
    revenueThisMonth: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"user" | "project" | "vacancy" | "promotion">("user")
  const { locale } = useLocale()
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [usersData, ordersData, projectsData, vacanciesData, ticketsData, promotionsData] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*, profiles(full_name, email)").order("created_at", { ascending: false }),
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("vacancies").select("*").order("created_at", { ascending: false }),
      supabase
        .from("support_tickets")
        .select("*, profiles(full_name, email)")
        .order("created_at", { ascending: false }),
      supabase.from("promotions").select("*").order("created_at", { ascending: false }),
    ])

    if (usersData.data) setUsers(usersData.data)
    if (ordersData.data) setOrders(ordersData.data as any)
    if (projectsData.data) setProjects(projectsData.data)
    if (vacanciesData.data) setVacancies(vacanciesData.data)
    if (ticketsData.data) setTickets(ticketsData.data as any)
    if (promotionsData.data) setPromotions(promotionsData.data)

    if (ordersData.data && usersData.data) {
      const totalRevenue = ordersData.data.reduce((sum, order) => sum + Number(order.final_price || 0), 0)
      const pendingOrders = ordersData.data.filter((o) => o.status === "pending").length
      const activeProjects = projectsData.data?.filter((p) => p.featured).length || 0
      const openTickets = ticketsData.data?.filter((t) => t.status === "open").length || 0

      const now = new Date()
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const newUsersThisMonth = usersData.data.filter((u) => new Date(u.created_at) >= firstDayOfMonth).length
      const revenueThisMonth = ordersData.data
        .filter((o) => new Date(o.created_at) >= firstDayOfMonth)
        .reduce((sum, order) => sum + Number(order.final_price || 0), 0)

      setStats({
        totalUsers: usersData.data.length,
        totalOrders: ordersData.data.length,
        totalRevenue,
        pendingOrders,
        activeProjects,
        openTickets,
        newUsersThisMonth,
        revenueThisMonth,
      })
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", userId)

    if (error) {
      console.log("[v0] Error updating role:", error)
      alert(locale === "ru" ? "Ошибка обновления роли" : "Error updating role")
    } else {
      alert(locale === "ru" ? "Роль успешно обновлена" : "Role updated successfully")
      loadData()
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId)

    if (error) {
      console.log("[v0] Error updating status:", error)
      alert(locale === "ru" ? "Ошибка обновления статуса" : "Error updating status")
    } else {
      alert(locale === "ru" ? "Статус обновлен" : "Status updated")
      loadData()
    }
  }

  const saveProject = async (projectData: any) => {
    const { error } = projectData.id
      ? await supabase.from("projects").update(projectData).eq("id", projectData.id)
      : await supabase.from("projects").insert([projectData])

    if (error) {
      alert(locale === "ru" ? "Ошибка сохранения проекта" : "Error saving project")
    } else {
      alert(locale === "ru" ? "Проект сохранен" : "Project saved")
      setIsDialogOpen(false)
      loadData()
    }
  }

  const saveVacancy = async (vacancyData: any) => {
    const { error } = vacancyData.id
      ? await supabase.from("vacancies").update(vacancyData).eq("id", vacancyData.id)
      : await supabase.from("vacancies").insert([vacancyData])

    if (error) {
      alert(locale === "ru" ? "Ошибка сохранения вакансии" : "Error saving vacancy")
    } else {
      alert(locale === "ru" ? "Вакансия сохранена" : "Vacancy saved")
      setIsDialogOpen(false)
      loadData()
    }
  }

  const savePromotion = async (promotionData: any) => {
    const { error } = promotionData.id
      ? await supabase.from("promotions").update(promotionData).eq("id", promotionData.id)
      : await supabase.from("promotions").insert([promotionData])

    if (error) {
      alert(locale === "ru" ? "Ошибка сохранения промокода" : "Error saving promotion")
    } else {
      alert(locale === "ru" ? "Промокод сохранен" : "Promotion saved")
      setIsDialogOpen(false)
      loadData()
    }
  }

  const deleteItem = async (table: string, id: string) => {
    if (!confirm(locale === "ru" ? "Вы уверены?" : "Are you sure?")) return

    const { error } = await supabase.from(table).delete().eq("id", id)

    if (error) {
      alert(locale === "ru" ? "Ошибка удаления" : "Error deleting")
    } else {
      alert(locale === "ru" ? "Удалено" : "Deleted")
      loadData()
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const content = {
    ru: {
      title: "Панель администратора",
      users: "Пользователи",
      orders: "Заказы",
      projects: "Проекты",
      vacancies: "Вакансии",
      tickets: "Тикеты",
      promotions: "Промокоды",
      analytics: "Аналитика",
      settings: "Настройки",
      totalUsers: "Всего пользователей",
      totalOrders: "Всего заказов",
      totalRevenue: "Общий доход",
      pendingOrders: "Ожидающие заказы",
      activeProjects: "Активные проекты",
      openTickets: "Открытые тикеты",
      newUsersMonth: "Новых за месяц",
      revenueMonth: "Доход за месяц",
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
      add: "Добавить",
      edit: "Редактировать",
      delete: "Удалить",
      view: "Просмотр",
      admin: "Администратор",
      manager: "Менеджер",
      developer: "Разработчик",
      freelancer: "Фрилансер",
      client: "Клиент",
      customer: "Постоянный клиент",
      title: "Название",
      description: "Описание",
      category: "Категория",
      featured: "Избранное",
      active: "Активно",
      code: "Код",
      discount: "Скидка",
      validFrom: "Действует с",
      validUntil: "Действует до",
      maxUses: "Макс. использований",
      currentUses: "Использовано",
      priority: "Приоритет",
      assignedTo: "Назначено",
      subject: "Тема",
      open: "Открыт",
      closed: "Закрыт",
      resolved: "Решен",
    },
    en: {
      title: "Admin Panel",
      users: "Users",
      orders: "Orders",
      projects: "Projects",
      vacancies: "Vacancies",
      tickets: "Tickets",
      promotions: "Promotions",
      analytics: "Analytics",
      settings: "Settings",
      totalUsers: "Total Users",
      totalOrders: "Total Orders",
      totalRevenue: "Total Revenue",
      pendingOrders: "Pending Orders",
      activeProjects: "Active Projects",
      openTickets: "Open Tickets",
      newUsersMonth: "New This Month",
      revenueMonth: "Revenue This Month",
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
      add: "Add",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      admin: "Admin",
      manager: "Manager",
      developer: "Developer",
      freelancer: "Freelancer",
      client: "Client",
      customer: "Customer",
      title: "Title",
      description: "Description",
      category: "Category",
      featured: "Featured",
      active: "Active",
      code: "Code",
      discount: "Discount",
      validFrom: "Valid From",
      validUntil: "Valid Until",
      maxUses: "Max Uses",
      currentUses: "Current Uses",
      priority: "Priority",
      assignedTo: "Assigned To",
      subject: "Subject",
      open: "Open",
      closed: "Closed",
      resolved: "Resolved",
    },
  }

  const t = content[locale]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{t.title}</h2>
        <Badge variant="default" className="gap-1">
          <Shield className="h-3 w-3" />
          {t.admin}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalUsers}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newUsersThisMonth} {locale === "ru" ? "в этом месяце" : "this month"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalOrders}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingOrders} {locale === "ru" ? "ожидают" : "pending"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalRevenue}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalRevenue / 100).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${(stats.revenueThisMonth / 100).toFixed(2)} {locale === "ru" ? "в этом месяце" : "this month"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.activeProjects}</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.openTickets} {locale === "ru" ? "открытых тикетов" : "open tickets"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{t.users}</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">{t.orders}</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">{t.projects}</span>
          </TabsTrigger>
          <TabsTrigger value="vacancies" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">{t.vacancies}</span>
          </TabsTrigger>
          <TabsTrigger value="tickets" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">{t.tickets}</span>
          </TabsTrigger>
          <TabsTrigger value="promotions" className="gap-2">
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline">{t.promotions}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>{t.users}</CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
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
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.all}</SelectItem>
                      <SelectItem value="admin">{t.admin}</SelectItem>
                      <SelectItem value="manager">{t.manager}</SelectItem>
                      <SelectItem value="developer">{t.developer}</SelectItem>
                      <SelectItem value="freelancer">{t.freelancer}</SelectItem>
                      <SelectItem value="client">{t.client}</SelectItem>
                      <SelectItem value="customer">{t.customer}</SelectItem>
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
                      <TableHead>{t.name}</TableHead>
                      <TableHead>{t.email}</TableHead>
                      <TableHead>{t.role}</TableHead>
                      <TableHead>{t.registered}</TableHead>
                      <TableHead>{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name || "N/A"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "admin" ? "default" : user.role === "manager" ? "secondary" : "outline"
                            }
                          >
                            {user.role || "user"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select
                            value={user.role || "client"}
                            onValueChange={(value) => updateUserRole(user.id, value)}
                          >
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">{t.admin}</SelectItem>
                              <SelectItem value="manager">{t.manager}</SelectItem>
                              <SelectItem value="developer">{t.developer}</SelectItem>
                              <SelectItem value="freelancer">{t.freelancer}</SelectItem>
                              <SelectItem value="client">{t.client}</SelectItem>
                              <SelectItem value="customer">{t.customer}</SelectItem>
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

        {/* Orders Tab - existing functionality */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>{t.orders}</CardTitle>
                  <CardDescription>Manage all orders and payments</CardDescription>
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

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.projects}</CardTitle>
                  <CardDescription>Manage portfolio projects</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setDialogType("project")
                    setIsDialogOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t.add}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title_ru || project.title_en}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description_ru || project.description_en}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant={project.featured ? "default" : "outline"}>
                          {project.featured ? t.featured : t.active}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => deleteItem("projects", project.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vacancies" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.vacancies}</CardTitle>
                  <CardDescription>Manage job openings</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setDialogType("vacancy")
                    setIsDialogOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t.add}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.title}</TableHead>
                    <TableHead>{t.category}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.date}</TableHead>
                    <TableHead>{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vacancies.map((vacancy) => (
                    <TableRow key={vacancy.id}>
                      <TableCell className="font-medium">{vacancy.title_ru || vacancy.title_en}</TableCell>
                      <TableCell>{vacancy.employment_type}</TableCell>
                      <TableCell>
                        <Badge variant={vacancy.is_active ? "default" : "outline"}>
                          {vacancy.is_active ? t.active : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{new Date(vacancy.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => deleteItem("vacancies", vacancy.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.tickets}</CardTitle>
              <CardDescription>Manage support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.subject}</TableHead>
                    <TableHead>{t.email}</TableHead>
                    <TableHead>{t.priority}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.date}</TableHead>
                    <TableHead>{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.subject}</TableCell>
                      <TableCell>{ticket.profiles?.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ticket.priority === "high"
                              ? "destructive"
                              : ticket.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={ticket.status === "open" ? "default" : "outline"}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.promotions}</CardTitle>
                  <CardDescription>Manage promo codes and discounts</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setDialogType("promotion")
                    setIsDialogOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t.add}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.code}</TableHead>
                    <TableHead>{t.discount}</TableHead>
                    <TableHead>{t.validFrom}</TableHead>
                    <TableHead>{t.validUntil}</TableHead>
                    <TableHead>{t.currentUses}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-mono font-bold">{promo.code}</TableCell>
                      <TableCell>
                        {promo.discount_type === "percentage" ? `${promo.discount_value}%` : `$${promo.discount_value}`}
                      </TableCell>
                      <TableCell className="text-sm">{new Date(promo.valid_from).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm">{new Date(promo.valid_until).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {promo.current_uses} / {promo.max_uses}
                      </TableCell>
                      <TableCell>
                        <Badge variant={promo.is_active ? "default" : "outline"}>
                          {promo.is_active ? t.active : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => deleteItem("promotions", promo.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanel
