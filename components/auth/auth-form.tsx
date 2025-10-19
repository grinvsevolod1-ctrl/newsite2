"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/translations"
import { Loader2, Mail, Lock, User, Phone } from "lucide-react"
import { MagneticButton } from "@/components/effects/magnetic-button"

export function AuthForm() {
  const { locale } = useLocale()
  const t = translations[locale]
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })
      if (error) throw error

      await new Promise((resolve) => setTimeout(resolve, 500))
      window.location.href = "/profile"
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (signupData.password !== signupData.confirmPassword) {
      setError(locale === "ru" ? "Пароли не совпадают" : "Passwords do not match")
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/profile`,
          data: {
            full_name: signupData.fullName,
            phone: signupData.phone,
          },
        },
      })
      if (error) throw error
      setSuccess(
        locale === "ru"
          ? "Регистрация успешна! Проверьте email для подтверждения."
          : "Sign up successful! Check your email to confirm.",
      )
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full bg-white/[0.04] backdrop-blur-xl border-primary/20 shadow-2xl">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl sm:text-3xl gradient-text">
          {locale === "ru" ? "Вход в систему" : "Authentication"}
        </CardTitle>
        <CardDescription className="text-base">
          {locale === "ru" ? "Войдите или создайте новый аккаунт" : "Sign in or create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="text-sm sm:text-base">
              {t.nav.login}
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-sm sm:text-base">
              {t.nav.signup}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm sm:text-base">
                  {t.contact.email}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="h-11 sm:h-12 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm sm:text-base">
                  {locale === "ru" ? "Пароль" : "Password"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="h-11 sm:h-12 pl-10"
                  />
                </div>
              </div>
              {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}
              <MagneticButton>
                <Button type="submit" className="w-full h-11 sm:h-12 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {locale === "ru" ? "Вход..." : "Signing in..."}
                    </>
                  ) : (
                    t.nav.login
                  )}
                </Button>
              </MagneticButton>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-sm sm:text-base">
                  {locale === "ru" ? "Полное имя" : "Full Name"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={locale === "ru" ? "Иван Иванов" : "John Doe"}
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                    className="h-11 sm:h-12 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm sm:text-base">
                  {t.contact.email}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="h-11 sm:h-12 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-phone" className="text-sm sm:text-base">
                  {t.contact.phone}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+375291414555"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="h-11 sm:h-12 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm sm:text-base">
                  {locale === "ru" ? "Пароль" : "Password"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    className="h-11 sm:h-12 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm" className="text-sm sm:text-base">
                  {locale === "ru" ? "Подтвердите пароль" : "Confirm Password"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    className="h-11 sm:h-12 pl-10"
                  />
                </div>
              </div>
              {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}
              {success && <p className="text-sm text-green-600 bg-green-600/10 p-3 rounded-lg">{success}</p>}
              <MagneticButton>
                <Button type="submit" className="w-full h-11 sm:h-12 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {locale === "ru" ? "Регистрация..." : "Signing up..."}
                    </>
                  ) : (
                    t.nav.signup
                  )}
                </Button>
              </MagneticButton>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
