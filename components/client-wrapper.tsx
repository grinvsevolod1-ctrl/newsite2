"use client"

import dynamic from "next/dynamic"

export const AIChatWidget = dynamic(
  () => import("@/components/chat/ai-chat-widget").then((mod) => ({ default: mod.AIChatWidget })),
  {
    ssr: false,
    loading: () => null,
  },
)

export const CustomCursor = dynamic(
  () => import("@/components/effects/custom-cursor").then((mod) => ({ default: mod.CustomCursor })),
  {
    ssr: false,
    loading: () => null,
  },
)

export const SimpleBackground = dynamic(
  () => import("@/components/effects/simple-background").then((mod) => ({ default: mod.SimpleBackground })),
  {
    ssr: false,
    loading: () => null,
  },
)

export const PageProgress = dynamic(
  () => import("@/components/effects/page-progress").then((mod) => ({ default: mod.PageProgress })),
  {
    ssr: false,
    loading: () => null,
  },
)

export const ScrollToTop = dynamic(
  () => import("@/components/effects/scroll-to-top").then((mod) => ({ default: mod.ScrollToTop })),
  {
    ssr: false,
    loading: () => null,
  },
)
