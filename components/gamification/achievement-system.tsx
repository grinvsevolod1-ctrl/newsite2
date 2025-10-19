"use client"

import { useState, useEffect } from "react"
import { Trophy, Star, Zap, Target, Award, Crown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Achievement {
  id: string
  title: string
  description: string
  icon: typeof Trophy
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

const achievements: Achievement[] = [
  {
    id: "first-visit",
    title: "Первый визит",
    description: "Посетите сайт впервые",
    icon: Star,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: "common",
  },
  {
    id: "calculator-user",
    title: "Калькулятор",
    description: "Рассчитайте стоимость проекта",
    icon: Target,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: "common",
  },
  {
    id: "portfolio-explorer",
    title: "Исследователь",
    description: "Просмотрите 5 проектов",
    icon: Zap,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: "rare",
  },
  {
    id: "contact-sender",
    title: "Коммуникатор",
    description: "Отправьте заявку",
    icon: Award,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: "epic",
  },
  {
    id: "registered-user",
    title: "Член команды",
    description: "Зарегистрируйтесь на сайте",
    icon: Crown,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: "legendary",
  },
]

const rarityColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-yellow-600",
}

export function AchievementSystem() {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements)
  const [showNotification, setShowNotification] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [showPanel, setShowPanel] = useState(false)

  const unlockedCount = userAchievements.filter((a) => a.unlocked).length
  const totalXP = unlockedCount * 100
  const xpForNextLevel = level * 500

  useEffect(() => {
    // Load achievements from localStorage
    const saved = localStorage.getItem("achievements")
    if (saved) {
      setUserAchievements(JSON.parse(saved))
    }

    const savedXP = localStorage.getItem("xp")
    if (savedXP) {
      setXp(Number.parseInt(savedXP))
    }

    const savedLevel = localStorage.getItem("level")
    if (savedLevel) {
      setLevel(Number.parseInt(savedLevel))
    }
  }, [])

  const unlockAchievement = (id: string) => {
    const updated = userAchievements.map((achievement) => {
      if (achievement.id === id && !achievement.unlocked) {
        setNewAchievement(achievement)
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 5000)

        const newXP = xp + 100
        setXp(newXP)
        localStorage.setItem("xp", newXP.toString())

        if (newXP >= xpForNextLevel) {
          setLevel(level + 1)
          localStorage.setItem("level", (level + 1).toString())
        }

        return { ...achievement, unlocked: true, progress: achievement.maxProgress }
      }
      return achievement
    })

    setUserAchievements(updated)
    localStorage.setItem("achievements", JSON.stringify(updated))
  }

  // Expose function globally for other components to trigger
  useEffect(() => {
    ;(window as any).unlockAchievement = unlockAchievement
  }, [userAchievements, xp, level])

  return (
    <>
      {/* Achievement notification */}
      <AnimatePresence>
        {showNotification && newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed right-4 top-20 z-50 w-80"
          >
            <div className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-background/95 to-background/80 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-2 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Достижение разблокировано!</span>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br",
                    rarityColors[newAchievement.rarity],
                  )}
                >
                  <newAchievement.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{newAchievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{newAchievement.description}</p>
                  <div className="mt-2 text-xs text-primary">+100 XP</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level indicator button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50 transition-all hover:scale-110 hover:shadow-xl hover:shadow-primary/70"
      >
        <div className="text-center">
          <div className="text-xs font-bold text-white">LVL</div>
          <div className="text-lg font-bold text-white">{level}</div>
        </div>
      </button>

      {/* Achievements panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed bottom-24 right-20 z-40 w-96 max-h-[600px] overflow-y-auto rounded-2xl border border-primary/20 bg-gradient-to-br from-background/95 to-background/80 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-bold text-foreground">Ваш прогресс</h3>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Уровень {level}</span>
                <span className="text-primary">
                  {xp} / {xpForNextLevel} XP
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${(xp / xpForNextLevel) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Достижения ({unlockedCount}/{userAchievements.length})
              </h4>
              {userAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-3 transition-all",
                    achievement.unlocked ? "border-primary/20 bg-primary/5" : "border-muted bg-muted/20 opacity-50",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br",
                      achievement.unlocked ? rarityColors[achievement.rarity] : "from-gray-600 to-gray-800",
                    )}
                  >
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground">{achievement.title}</h5>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {!achievement.unlocked && achievement.maxProgress > 1 && (
                      <div className="mt-2">
                        <div className="h-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {achievement.progress}/{achievement.maxProgress}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
