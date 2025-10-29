"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBrowserClient } from "@supabase/ssr"
import { toast } from "sonner"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const orderSchema = z.object({
  serviceType: z.string().min(1, "Выберите тип услуги"),
  packageName: z.string().min(1, "Выберите пакет"),
  description: z.string().min(10, "Опишите ваш проект (минимум 10 символов)"),
  promoCode: z.string().optional(),
  email: z.string().email("Введите корректный email").optional(),
  phone: z.string().min(10, "Введите корректный номер телефона").optional(),
  name: z.string().min(2, "Введите ваше имя").optional(),
})

type OrderFormValues = z.infer<typeof orderSchema>

const services = [
  { value: "landing", label: "Лендинг (одностраничный сайт)", basePrice: 300 },
  { value: "corporate", label: "Корпоративный сайт", basePrice: 800 },
  { value: "ecommerce", label: "Интернет-магазин", basePrice: 2000 },
  { value: "webapp", label: "Веб-приложение", basePrice: 3000 },
  { value: "mobile", label: "Мобильное приложение", basePrice: 4000 },
]

const packages = [
  { value: "basic", label: "Базовый", multiplier: 1 },
  { value: "standard", label: "Стандарт", multiplier: 1.5 },
  { value: "premium", label: "Премиум", multiplier: 2 },
]

export function OrderForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoCode, setPromoCode] = useState<any>(null)
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const router = useRouter()

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      serviceType: "",
      packageName: "",
      description: "",
      promoCode: "",
      email: "",
      phone: "",
      name: "",
    },
  })

  const serviceType = form.watch("serviceType")
  const packageName = form.watch("packageName")

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (serviceType && packageName) {
      const service = services.find((s) => s.value === serviceType)
      const pkg = packages.find((p) => p.value === packageName)

      if (service && pkg) {
        const basePrice = service.basePrice * pkg.multiplier
        const finalPrice = basePrice - (basePrice * promoDiscount) / 100
        setCalculatedPrice(finalPrice)
      }
    }
  }, [serviceType, packageName, promoDiscount])

  const checkPromoCode = async (code: string) => {
    if (!code) {
      setPromoDiscount(0)
      setPromoCode(null)
      return
    }

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { data: promo } = await supabase
      .from("promotions")
      .select("*")
      .eq("code", code.toUpperCase())
      .eq("is_active", true)
      .gte("valid_until", new Date().toISOString())
      .lte("valid_from", new Date().toISOString())
      .single()

    if (promo) {
      if (promo.max_uses && promo.current_uses >= promo.max_uses) {
        toast.error("Промокод исчерпан")
        setPromoDiscount(0)
        setPromoCode(null)
        return
      }

      if (promo.discount_type === "percentage") {
        setPromoDiscount(promo.discount_value)
      }
      setPromoCode(promo)
      toast.success(`Промокод применен! Скидка ${promo.discount_value}%`)
    } else {
      toast.error("Промокод недействителен")
      setPromoDiscount(0)
      setPromoCode(null)
    }
  }

  const onSubmit = async (data: OrderFormValues) => {
    setIsLoading(true)

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const service = services.find((s) => s.value === data.serviceType)
      const pkg = packages.find((p) => p.value === data.packageName)
      const basePrice = service!.basePrice * pkg!.multiplier
      const discountAmount = (basePrice * promoDiscount) / 100
      const finalPrice = basePrice - discountAmount

      const orderData: any = {
        service_type: data.serviceType,
        package_name: data.packageName,
        description: data.description,
        price: basePrice,
        discount_amount: discountAmount,
        final_price: finalPrice,
        promo_code: data.promoCode?.toUpperCase() || null,
        status: "pending",
        payment_status: "pending",
        currency: "BYN",
        order_number: `ORD-${Date.now()}`,
      }

      if (user) {
        orderData.user_id = user.id
      } else {
        // Guest order
        orderData.guest_email = data.email
        orderData.guest_phone = data.phone
        orderData.guest_name = data.name
      }

      const { data: order, error: orderError } = await supabase.from("orders").insert(orderData).select().single()

      if (orderError) throw orderError

      if (promoCode && user) {
        await supabase
          .from("promotions")
          .update({ current_uses: promoCode.current_uses + 1 })
          .eq("id", promoCode.id)

        await supabase.from("user_promotions").insert({
          user_id: user.id,
          promotion_id: promoCode.id,
          order_id: order.id,
        })
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          amount: finalPrice,
          currency: "byn",
          description: `${service!.label} - ${pkg!.label}`,
          customerEmail: user?.email || data.email,
        }),
      })

      const { sessionId } = await response.json()

      const stripe = await stripePromise
      await stripe!.redirectToCheckout({ sessionId })
    } catch (error: any) {
      console.error("Order error:", error)
      toast.error(error.message || "Ошибка при создании заказа")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2 border-cyan-500/20 shadow-xl shadow-cyan-500/5">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl sm:text-3xl">Детали заказа</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Выберите услугу и пакет, примените промокод для получения скидки
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {!user && (
              <div className="space-y-4 p-4 sm:p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
                <p className="text-sm font-medium text-muted-foreground">
                  Заполните контактные данные или{" "}
                  <a href="/auth" className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline">
                    войдите в систему
                  </a>
                </p>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base font-medium">Ваше имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Иван Иванов" className="h-11 sm:h-12 text-sm sm:text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="ivan@example.com"
                          className="h-11 sm:h-12 text-sm sm:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base font-medium">Телефон</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+375 29 123 45 67"
                          className="h-11 sm:h-12 text-sm sm:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Тип услуги</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                        <SelectValue placeholder="Выберите тип услуги" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value} className="text-sm sm:text-base">
                          {service.label} - от {service.basePrice} BYN
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Пакет</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                        <SelectValue placeholder="Выберите пакет" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.value} value={pkg.value} className="text-sm sm:text-base">
                          {pkg.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Описание проекта</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Расскажите о вашем проекте подробнее..."
                      className="min-h-[140px] text-sm sm:text-base resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="promoCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Промокод (необязательно)</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите промокод"
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value)
                        if (value.length >= 3) {
                          checkPromoCode(value)
                        } else {
                          setPromoDiscount(0)
                          setPromoCode(null)
                        }
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
                    />
                    {promoCode && (
                      <div className="flex items-center gap-2 px-4 bg-green-500/10 text-green-600 rounded-lg shrink-0">
                        <Check className="h-5 w-5" />
                        <span className="text-sm font-semibold">-{promoDiscount}%</span>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {calculatedPrice > 0 && (
              <Card className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-2 border-cyan-500/20">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-muted-foreground">Базовая стоимость:</span>
                      <span className="font-medium">
                        {(calculatedPrice / (1 - promoDiscount / 100)).toFixed(2)} BYN
                      </span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-sm sm:text-base text-green-600 dark:text-green-500">
                        <span className="font-medium">Скидка ({promoDiscount}%):</span>
                        <span className="font-semibold">
                          -{(calculatedPrice / (1 - promoDiscount / 100) - calculatedPrice).toFixed(2)} BYN
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl sm:text-2xl font-bold pt-3 border-t-2 border-cyan-500/20">
                      <span>Итого к оплате:</span>
                      <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        {calculatedPrice.toFixed(2)} BYN
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Обработка заказа...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Перейти к оплате
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
