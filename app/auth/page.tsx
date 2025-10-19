import { AuthForm } from "@/components/auth/auth-form"
import { Sparkles, Shield, Clock, Star } from "lucide-react"
import { BlobMorph } from "@/components/effects/blob-morph"
import { ScrollReveal } from "@/components/effects/scroll-reveal"
import { TiltCard } from "@/components/effects/tilt-card"

export const metadata = {
  title: "Авторизация | NetNext",
  description: "Войдите или создайте аккаунт",
}

export default function AuthPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-background via-background to-muted relative overflow-hidden">
      <BlobMorph />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <ScrollReveal className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Преимущества регистрации</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text">Станьте частью NetNext</h1>
              <p className="text-lg text-muted-foreground">
                Получите доступ к эксклюзивным возможностям и персональному кабинету
              </p>
            </ScrollReveal>

            <div className="grid gap-6">
              <ScrollReveal delay={100}>
                <TiltCard>
                  <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-primary/10 hover:border-primary/20 transition-all group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Shield className="h-6 w-6 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Сохранение расчетов</h3>
                      <p className="text-sm text-muted-foreground">
                        Сохраняйте расчеты стоимости проектов и возвращайтесь к ним в любое время
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <TiltCard>
                  <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-primary/10 hover:border-primary/20 transition-all group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="h-6 w-6 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">История заказов</h3>
                      <p className="text-sm text-muted-foreground">
                        Отслеживайте статус ваших проектов и историю взаимодействия с нами
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <TiltCard>
                  <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-primary/10 hover:border-primary/20 transition-all group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Star className="h-6 w-6 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Персональные скидки</h3>
                      <p className="text-sm text-muted-foreground">
                        Получайте эксклюзивные предложения и скидки на наши услуги
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <TiltCard>
                  <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-primary/10 hover:border-primary/20 transition-all group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="h-6 w-6 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Приоритетная поддержка</h3>
                      <p className="text-sm text-muted-foreground">
                        Быстрая связь с менеджером и приоритетное рассмотрение заявок
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <ScrollReveal delay={100} direction="left">
              <AuthForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
