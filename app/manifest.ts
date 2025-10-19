import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NetNext - Premium Software Development Studio",
    short_name: "NetNext",
    description: "50+ professional developers creating innovative solutions for businesses worldwide",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#00f5ff",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    categories: ["business", "productivity", "technology"],
    shortcuts: [
      {
        name: "Калькулятор",
        short_name: "Калькулятор",
        description: "Рассчитать стоимость проекта",
        url: "/calculator",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Портфолио",
        short_name: "Портфолио",
        description: "Посмотреть наши работы",
        url: "/portfolio",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Контакты",
        short_name: "Контакты",
        description: "Связаться с нами",
        url: "/contacts",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  }
}
