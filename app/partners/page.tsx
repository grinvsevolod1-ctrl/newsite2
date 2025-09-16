export default function PartnersPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Философия */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">NetNext.site — партнёрство в адаптации</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Мы строим цифровые экосистемы, которые адаптируются под бизнес, команду и пользователя. Telegram, CRM, сайты, визуальные системы — всё масштабируемо и сопровождаемо.
        </p>
      </div>

      {/* Кейсы */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold mb-6">Выбранные кейсы</h2>
        {/* Вставка компонента FeaturedSlider или карточек из featuredData */}
      </div>

      {/* Команда */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold mb-6">Кто за этим стоит</h2>
        <p className="text-gray-600 max-w-3xl">
          Команда NetNext.site — разработчики, архитекторы, дизайнеры и интеграторы. Мы не просто создаём — мы сопровождаем, адаптируем и масштабируем.
        </p>
      </div>

      {/* Метрики */}
      <div className="mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="bg-lightgrey p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold">7+ каналов</h3>
          <p className="text-sm text-gray-600">Telegram, WhatsApp, Viber, Instagram, Email, Web, CRM</p>
        </div>
        <div className="bg-lightgrey p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold">100% адаптация</h3>
          <p className="text-sm text-gray-600">Мобильные, десктоп, мессенджеры, API</p>
        </div>
        <div className="bg-lightgrey p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold">Модульная архитектура</h3>
          <p className="text-sm text-gray-600">Каждый блок — масштабируемый и переиспользуемый</p>
        </div>
        <div className="bg-lightgrey p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold">Сопровождение</h3>
          <p className="text-sm text-gray-600">Обновления, визуал, поддержка, Telegram-интеграции</p>
        </div>
      </div>

      {/* Связь */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Готовы обсудить партнёрство?</h2>
        <p className="text-gray-600 mb-6">Свяжитесь с нами через Telegram или email — мы адаптируемся под ваш формат.</p>
        <div className="flex justify-center gap-4">
          <Link
            href="https://t.me/skufig1"
            target="_blank"
            className="bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
          >
            Telegram
          </Link>
          <Link
            href="mailto:info@netnext.site"
            className="bg-darkblue text-white px-6 py-3 rounded-full hover:bg-black transition"
          >
            Email
          </Link>
        </div>
      </div>
    </section>
  );
}
