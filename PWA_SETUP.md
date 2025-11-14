# PWA Setup Documentation

## Overview
NetNext сайт теперь полностью поддерживает Progressive Web App (PWA) функционал, позволяя пользователям устанавливать сайт как нативное приложение на любое устройство.

## Реализованные функции

### 1. Фавиконы и иконки
- ✅ `favicon.ico` - основной фавикон (32x32)
- ✅ `favicon-16x16.png` - маленький фавикон для браузеров
- ✅ `favicon-32x32.png` - стандартный фавикон
- ✅ `apple-touch-icon.png` - иконка для iOS (180x180)
- ✅ `icon-192.png` - иконка для Android (192x192)
- ✅ `icon-512.png` - большая иконка для Android (512x512)

### 2. Web App Manifest
Файл `public/manifest.json` содержит:
- Название приложения на русском и английском
- Описание
- Иконки всех размеров
- Цветовую схему (theme_color, background_color)
- Display mode: standalone (приложение открывается в полноэкранном режиме)
- Start URL и scope
- Ориентацию: portrait-primary

### 3. Service Worker
Файл `public/sw.js` обеспечивает:
- Кеширование статических ресурсов (HTML, CSS, JS, изображения)
- Offline работу сайта
- Стратегию Cache First для статики
- Network First для API запросов
- Автоматическое обновление кеша при новой версии

### 4. Install Prompt
Компонент `components/pwa/install-prompt.tsx`:
- Автоматически определяет возможность установки
- Показывает красивый промпт с анимацией
- Поддерживает русский и английский языки
- Адаптивный дизайн для всех устройств
- Автоматически скрывается после установки или закрытия

### 5. Meta теги
В `app/layout.tsx` добавлены все необходимые meta теги:
- `theme-color` для Android
- `apple-mobile-web-app-capable` для iOS
- `apple-mobile-web-app-status-bar-style`
- `apple-mobile-web-app-title`
- `mobile-web-app-capable`
- Ссылки на manifest и иконки

## Как это работает

### На Android:
1. Пользователь заходит на сайт через Chrome/Edge
2. Браузер автоматически показывает баннер "Добавить на главный экран"
3. Или появляется наш кастомный InstallPrompt
4. После установки приложение открывается в standalone режиме
5. Иконка появляется на главном экране

### На iOS:
1. Пользователь заходит на сайт через Safari
2. Нажимает кнопку "Поделиться" (квадрат со стрелкой вверх)
3. Выбирает "На экран «Домой»"
4. Приложение устанавливается с нашей иконкой

### На Desktop:
1. В Chrome/Edge появляется иконка установки в адресной строке
2. Или наш InstallPrompt показывает кнопку установки
3. После установки приложение открывается в отдельном окне

## Offline функционал

Service Worker кеширует:
- Все HTML страницы
- CSS и JavaScript файлы
- Изображения и шрифты
- API ответы (с ограниченным временем жизни)

При отсутствии интернета:
- Пользователь видит последнюю закешированную версию
- Статический контент работает полностью
- API запросы возвращают закешированные данные

## Производительность

### Оптимизации:
- React Compiler включен для автоматической оптимизации
- Lazy loading для всех тяжелых компонентов
- Image optimization через Next.js Image
- Prefetching критичных страниц
- Code splitting по роутам
- Минификация и сжатие всех ресурсов

### Кеширование:
- Статические ресурсы: 1 год (immutable)
- Service Worker: без кеша (must-revalidate)
- Manifest: 1 год (immutable)
- API ответы: 5 минут

## Безопасность

Добавлены заголовки безопасности:
- `Strict-Transport-Security` - принудительный HTTPS
- `X-Frame-Options` - защита от clickjacking
- `X-Content-Type-Options` - защита от MIME sniffing
- `X-XSS-Protection` - защита от XSS атак
- `Referrer-Policy` - контроль referrer
- `Permissions-Policy` - ограничение доступа к API браузера

## Тестирование

### Проверка PWA:
1. Откройте Chrome DevTools
2. Перейдите в Lighthouse
3. Запустите аудит PWA
4. Проверьте что все критерии выполнены

### Проверка Service Worker:
1. Откройте Chrome DevTools
2. Перейдите в Application > Service Workers
3. Проверьте что SW активен
4. Проверьте Cache Storage

### Проверка установки:
1. Откройте сайт в Chrome
2. Проверьте появление иконки установки
3. Установите приложение
4. Проверьте что оно открывается в standalone режиме

## Метрики производительности

Целевые показатели:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

## Поддержка браузеров

- ✅ Chrome 90+ (полная поддержка)
- ✅ Edge 90+ (полная поддержка)
- ✅ Safari 15+ (частичная поддержка, без beforeinstallprompt)
- ✅ Firefox 90+ (частичная поддержка)
- ✅ Samsung Internet 14+ (полная поддержка)

## Обновления

Service Worker автоматически проверяет обновления:
- При каждом посещении сайта
- Каждые 24 часа
- При изменении файла sw.js

Пользователь получает новую версию:
- Автоматически при следующем визите
- Без необходимости переустановки приложения

## Дополнительные возможности

### Будущие улучшения:
- [ ] Push уведомления
- [ ] Background sync
- [ ] Periodic background sync
- [ ] Web Share API
- [ ] File System Access API
- [ ] Payment Request API

## Поддержка

Для вопросов и проблем:
- Email: info@netnext.site
- Telegram: @skufig1
- Phone: +375 29 141 45 55
