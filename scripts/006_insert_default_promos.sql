-- Use existing promotions table instead of non-existent promo_codes table
-- Insert default promotions for promo section
INSERT INTO promotions (code, discount_type, discount_value, description_ru, description_en, valid_from, valid_until, is_active, max_uses)
VALUES 
  ('WELCOME15', 'percentage', 15, 'Скидка 15% на первый заказ для новых клиентов', '15% discount on first order for new clients', NOW(), NOW() + INTERVAL '1 year', true, 1000),
  ('TRANSFER2024', 'fixed', 0, 'Бесплатный перенос сайта при заказе разработки от 1500 BYN', 'Free website migration with development order over 1500 BYN', NOW(), NOW() + INTERVAL '1 year', true, 500),
  ('SUPPORT3M', 'fixed', 0, '3 месяца бесплатной технической поддержки при заказе от 3000 BYN', '3 months of free technical support with order over 3000 BYN', NOW(), NOW() + INTERVAL '1 year', true, 500),
  ('PREMIUM25', 'percentage', 25, 'Скидка 25% на премиум пакет разработки', '25% discount on premium development package', NOW(), NOW() + INTERVAL '6 months', true, 100),
  ('NEWYEAR2025', 'percentage', 20, 'Новогодняя скидка 20% на все услуги', 'New Year 20% discount on all services', NOW(), NOW() + INTERVAL '3 months', true, 200),
  ('AUDIT2025', 'fixed', 0, 'Бесплатный аудит сайта и консультация по улучшению', 'Free website audit and improvement consultation', NOW(), NOW() + INTERVAL '1 year', true, 300)
ON CONFLICT (code) DO UPDATE SET
  discount_type = EXCLUDED.discount_type,
  discount_value = EXCLUDED.discount_value,
  description_ru = EXCLUDED.description_ru,
  description_en = EXCLUDED.description_en,
  valid_from = EXCLUDED.valid_from,
  valid_until = EXCLUDED.valid_until,
  is_active = EXCLUDED.is_active,
  max_uses = EXCLUDED.max_uses;
