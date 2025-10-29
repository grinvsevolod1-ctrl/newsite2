"use client"

import dynamic from "next/dynamic"
import { usePerformance } from "@/contexts/performance-context"

const AIChatWidget = dynamic(
  () => import("@/components/chat/ai-chat-widget").then((mod) => ({ default: mod.AIChatWidget })),
  {
    ssr: false,
    loading: () => null,
  },
)

const CustomCursor = dynamic(
  () => import("@/components/effects/custom-cursor").then((mod) => ({ default: mod.CustomCursor })),
  {
    ssr: false,
    loading: () => null,
  },
)

const SimpleBackground = dynamic(
  () => import("@/components/effects/simple-background").then((mod) => ({ default: mod.SimpleBackground })),
  {
    ssr: false,
    loading: () => null,
  },
)

const PageProgress = dynamic(
  () => import("@/components/effects/page-progress").then((mod) => ({ default: mod.PageProgress })),
  {
    ssr: false,
    loading: () => null,
  },
)

const ScrollToTop = dynamic(
  () => import("@/components/effects/scroll-to-top").then((mod) => ({ default: mod.ScrollToTop })),
  {
    ssr: false,
    loading: () => null,
  },
)

const InstallPrompt = dynamic(
  () => import("@/components/pwa/install-prompt").then((mod) => ({ default: mod.InstallPrompt })),
  {
    ssr: false,
    loading: () => null,
  },
)

export function ClientWrapper() {
  const { shouldUseHeavyEffects, mode } = usePerformance()

  return (
    <>
      <AIChatWidget />
      <CustomCursor />
      <SimpleBackground />
      <PageProgress />
      <ScrollToTop />
      <InstallPrompt />
    </>
  )
}
