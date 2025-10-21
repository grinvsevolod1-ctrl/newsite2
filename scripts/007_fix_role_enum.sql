-- Create new script to properly convert role column to enum type
-- Step 1: Create enum type if not exists
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM (
    'admin',
    'manager',
    'developer',
    'freelancer',
    'client',
    'customer'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add new column with enum type
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role_new user_role;

-- Step 3: Copy data from old column to new column with type conversion
UPDATE public.profiles 
SET role_new = CASE 
  WHEN role = 'admin' THEN 'admin'::user_role
  WHEN role = 'manager' THEN 'manager'::user_role
  WHEN role = 'developer' THEN 'developer'::user_role
  WHEN role = 'freelancer' THEN 'freelancer'::user_role
  WHEN role = 'customer' THEN 'customer'::user_role
  ELSE 'client'::user_role
END
WHERE role_new IS NULL;

-- Step 4: Drop old column and rename new column
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;
ALTER TABLE public.profiles RENAME COLUMN role_new TO role;

-- Step 5: Set default value
ALTER TABLE public.profiles 
ALTER COLUMN role SET DEFAULT 'client'::user_role;

-- Step 6: Set admin role for main account
UPDATE public.profiles 
SET role = 'admin'::user_role 
WHERE email = 'grin.vsevolod1@gmail.com';

-- Step 7: Create permissions table
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  permission TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, permission)
);

-- Step 8: Insert permissions for each role
INSERT INTO public.role_permissions (role, permission, description) VALUES
  ('admin', 'manage_users', 'Управление пользователями'),
  ('admin', 'manage_orders', 'Управление заказами'),
  ('admin', 'manage_payments', 'Управление платежами'),
  ('admin', 'manage_promotions', 'Управление акциями'),
  ('admin', 'view_analytics', 'Просмотр аналитики'),
  ('admin', 'assign_roles', 'Назначение ролей'),
  ('admin', 'manage_projects', 'Управление проектами'),
  ('manager', 'manage_orders', 'Управление заказами'),
  ('manager', 'view_analytics', 'Просмотр аналитики'),
  ('manager', 'manage_projects', 'Управление проектами'),
  ('manager', 'assign_tasks', 'Назначение задач'),
  ('developer', 'view_projects', 'Просмотр проектов'),
  ('developer', 'update_tasks', 'Обновление задач'),
  ('developer', 'view_orders', 'Просмотр заказов'),
  ('freelancer', 'view_available_projects', 'Просмотр доступных проектов'),
  ('freelancer', 'apply_to_projects', 'Подача заявок на проекты'),
  ('freelancer', 'update_tasks', 'Обновление задач'),
  ('client', 'create_orders', 'Создание заказов'),
  ('client', 'view_own_orders', 'Просмотр своих заказов'),
  ('client', 'make_payments', 'Оплата заказов'),
  ('customer', 'create_orders', 'Создание заказов'),
  ('customer', 'view_own_orders', 'Просмотр своих заказов'),
  ('customer', 'make_payments', 'Оплата заказов'),
  ('customer', 'priority_support', 'Приоритетная поддержка'),
  ('customer', 'view_discounts', 'Просмотр персональных скидок')
ON CONFLICT (role, permission) DO NOTHING;

-- Step 9: Enable RLS on role_permissions
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view permissions"
  ON public.role_permissions FOR SELECT
  TO authenticated
  USING (true);
