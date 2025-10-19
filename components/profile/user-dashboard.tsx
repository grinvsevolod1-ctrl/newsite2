"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Loader2, Save, Calculator, Briefcase, LogOut } from "lucide-react"
import { TiltCard } from "@/components/effects/tilt-card"
import { ScrollReveal } from "@/components/effects/scroll-reveal"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/translations"

interface Profile {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  avatar_url: string | null
  company: string | null
  preferred_language: string | null
  preferred_currency: string | null
}

interface Calculation {
  id: string
  project_type: string
  estimated_price: number
  currency: string
  created_at: string
}

export function UserDashboard() {
  const { locale } = useLocale()
  const t = translations[locale]
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [calculations, setCalculations] = useState<Calculation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/auth")
      return
    }

    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    const { data: calculationsData } = await supabase
      .from("price_calculations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    setProfile(
      profileData || {
        id: user.id,
        email: user.email,
        full_name: null,
        phone: null,
        avatar_url: null,
        company: null,
        preferred_language: "ru",
        preferred_currency: "BYN",
      },
    )
    setCalculations(calculationsData || [])
    setIsLoading(false)
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setIsSaving(true)
    setMessage(null)

    const supabase = createClient()
    const { error } = await supabase.from("profiles").upsert({
      id: profile.id,
      full_name: profile.full_name,
      phone: profile.phone,
      company: profile.company,
      preferred_language: profile.preferred_language,
      preferred_currency: profile.preferred_currency,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      setMessage({ type: "error", text: t.profile.updateError })
    } else {
      setMessage({ type: "success", text: t.profile.profileUpdated })
    }

    setIsSaving(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-primary">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="text-xl bg-primary/20">
                {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
                {profile?.full_name || (locale === "ru" ? "Пользователь" : "User")}
              </h1>
              <p className="text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            {t.nav.logout}
          </Button>
        </div>
      </ScrollReveal>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="profile">{t.profile.title}</TabsTrigger>
          <TabsTrigger value="calculations">{t.profile.calculations}</TabsTrigger>
          <TabsTrigger value="activity">{t.profile.activity}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ScrollReveal delay={100}>
            <TiltCard>
              <Card className="bg-white/[0.04] backdrop-blur-xl border-primary/20">
                <CardHeader>
                  <CardTitle>{t.profile.personalInfo}</CardTitle>
                  <CardDescription>{t.profile.updateData}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t.profile.fullName}</Label>
                        <Input
                          id="fullName"
                          value={profile?.full_name || ""}
                          onChange={(e) => setProfile({ ...profile!, full_name: e.target.value })}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.profile.phone}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profile?.phone || ""}
                          onChange={(e) => setProfile({ ...profile!, phone: e.target.value })}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">{t.profile.company}</Label>
                        <Input
                          id="company"
                          value={profile?.company || ""}
                          onChange={(e) => setProfile({ ...profile!, company: e.target.value })}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">{t.profile.currency}</Label>
                        <select
                          id="currency"
                          value={profile?.preferred_currency || "BYN"}
                          onChange={(e) => setProfile({ ...profile!, preferred_currency: e.target.value })}
                          className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                          <option value="BYN">BYN</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="RUB">RUB</option>
                        </select>
                      </div>
                    </div>
                    {message && (
                      <p
                        className={`text-sm p-3 rounded-lg ${message.type === "success" ? "text-green-600 bg-green-600/10" : "text-destructive bg-destructive/10"}`}
                      >
                        {message.text}
                      </p>
                    )}
                    <Button type="submit" disabled={isSaving} className="gap-2">
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t.profile.saving}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          {t.profile.saveChanges}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TiltCard>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="calculations">
          <div className="grid gap-4">
            {calculations.length === 0 ? (
              <ScrollReveal>
                <Card className="bg-white/[0.04] backdrop-blur-xl border-primary/20">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calculator className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">{t.profile.noCalculations}</p>
                    <Button onClick={() => router.push("/calculator")} className="mt-4">
                      {t.profile.createCalculation}
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ) : (
              calculations.map((calc, index) => (
                <ScrollReveal key={calc.id} delay={index * 50}>
                  <TiltCard>
                    <Card className="bg-white/[0.04] backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{calc.project_type}</CardTitle>
                            <CardDescription>
                              {new Date(calc.created_at).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US")}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold gradient-text">
                              {calc.estimated_price.toLocaleString()} {calc.currency}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </TiltCard>
                </ScrollReveal>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <ScrollReveal>
            <Card className="bg-white/[0.04] backdrop-blur-xl border-primary/20">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Briefcase className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">{t.profile.activityHistory}</p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </TabsContent>
      </Tabs>
    </div>
  )
}
