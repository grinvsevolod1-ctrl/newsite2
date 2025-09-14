import Image from "next/image";
import Link from "next/link";

interface SectionType {
  id: number;
  section: string;
  links: { label: string; href: string }[];
}

const sections: SectionType[] = [
  {
    id: 1,
    section: "Навигация",
    links: [
      { label: "Главная", href: "/" },
      { label: "Услуги", href: "/services" },
      { label: "Кейсы", href: "/cases" },
      { label: "Контакты", href: "/contact" },
    ],
  },
  {
    id: 2,
    section: "Решения",
    links: [
      { label: "Telegram-боты", href: "/services/telegram" },
      { label: "CRM-интеграции", href: "/services/crm" },
      { label: "Визуальные системы", href: "/services/branding" },
      { label: "Сопровождение", href: "/services/support" },
    ],
  },
  {
    id: 3,
    section: "Документы",
    links: [
      { label: "Инструкции", href: "/docs/instructions" },
      { label: "Лицензия", href: "/docs/license" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-32 pb-10 -mt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-16">
          {/* Бренд */}
          <div className="col-span-4">
            <h3 className="text-4xl font-semibold mb-6">NetNext</h3>
            <p className="text-sm text-gray-400 mb-6">
              Адаптивные цифровые системы: Telegram, CRM, сайты, визуал. Всё масштабируемо и сопровождаемо.
            </p>
            <div className="flex gap-4">
              <div className="footer-icons">
                <Link href="https://t.me/skufig1" target="_blank">
                  <Image src="/images/footer/telegram.svg" alt="Telegram" width={20} height={20} />
                </Link>
              </div>
              <div className="footer-icons">
                <Link href="https://instagram.com" target="_blank">
                  <Image src="/images/footer/instagram.svg" alt="Instagram" width={20} height={20} />
                </Link>
              </div>
              <div className="footer-icons">
                <Link href="https://github.com" target="_blank">
                  <Image src="/images/footer/github.svg" alt="GitHub" width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Секции */}
          {sections.map((block) => (
            <div key={block.id} className="col-span-2">
              <p className="text-xl font-bold mb-6">{block.section}</p>
              <ul>
                {block.links.map((item, i) => (
                  <li key={i} className="mb-4">
                    <Link href={item.href} className="text-white text-sm hover:text-blue transition space-links">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Нижняя строка */}
        <div className="mt-16 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center md:text-left">
            © 2025 NetNext. Все права защищены.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-white transition">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
