export interface FeaturedItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export const featuredData: FeaturedItem[] = [
  {
    slug: "computer-brand-design",
    title: "Брендинг для компьютерного бренда",
    description: "Фирменный стиль, логотип, упаковка и визуальные паттерны для IT-компании.",
    image: "/images/featured/feat1.jpg",
    tags: ["брендинг", "дизайн", "IT"],
  },
  {
    slug: "mobile-3d-wallpaper",
    title: "3D-обои для мобильного приложения",
    description: "Анимации, визуальные эффекты и адаптация под iOS и Android.",
    image: "/images/featured/feat2.jpg",
    tags: ["мобильные", "3D", "анимация"],
  },
];
