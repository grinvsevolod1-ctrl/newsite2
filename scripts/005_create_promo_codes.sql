-- Insert default promo codes for new users and special offers

-- Welcome promo for new users
INSERT INTO promotions (
  code,
  discount_type,
  discount_value,
  description_ru,
  description_en,
  valid_from,
  valid_until,
  max_uses,
  current_uses,
  is_active
) VALUES
(
  'WELCOME15',
  'percentage',
  15,
  'Скидка 15% на первый заказ для новых пользователей',
  '15% discount on first order for new users',
  NOW(),
  NOW() + INTERVAL '1 year',
  1000,
  0,
  true
),
(
  'TRANSFER2024',
  'percentage',
  20,
  'Бесплатный перенос сайта + 20% скидка на разработку',
  'Free website transfer + 20% discount on development',
  NOW(),
  NOW() + INTERVAL '6 months',
  100,
  0,
  true
),
(
  'SUPPORT3M',
  'percentage',
  10,
  '3 месяца бесплатной поддержки + 10% скидка',
  '3 months free support + 10% discount',
  NOW(),
  NOW() + INTERVAL '6 months',
  200,
  0,
  true
),
(
  'PREMIUM25',
  'percentage',
  25,
  'Скидка 25% на премиум пакет',
  '25% discount on premium package',
  NOW(),
  NOW() + INTERVAL '3 months',
  50,
  0,
  true
),
(
  'NEWYEAR2025',
  'percentage',
  30,
  'Новогодняя скидка 30% на все услуги',
  'New Year 30% discount on all services',
  NOW(),
  NOW() + INTERVAL '1 month',
  500,
  0,
  true
);

-- Create notification for admin about new promo codes
INSERT INTO notifications (
  user_id,
  title,
  message,
  type,
  is_read
)
SELECT 
  id,
  'Промокоды созданы',
  'Создано 5 новых промокодов для привлечения клиентов',
  'info',
  false
FROM profiles
WHERE role = 'admin'
LIMIT 1;
