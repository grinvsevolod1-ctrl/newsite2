-- Create enum for user roles
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM (
    'admin',           -- Полный доступ ко всему
    'manager',         -- Управление заказами и пользователями
    'developer',       -- Штатный программист - работа над проектами
    'freelancer',      -- Фрилансер - доступ к проектам
    'client',          -- Обычный клиент - создание заказов
    'customer'         -- Заказчик - расширенные возможности
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Update profiles table to use enum
ALTER TABLE public.profiles 
  ALTER COLUMN role TYPE user_role USING role::user_role,
  ALTER COLUMN role SET DEFAULT 'client'::user_role;

-- Set admin role for main account
UPDATE public.profiles 
SET role = 'admin'::user_role 
WHERE email = 'grin.vsevolod1@gmail.com';

-- Create permissions table
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  permission TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, permission)
);

-- Insert permissions for each role
INSERT INTO public.role_permissions (role, permission, description) VALUES
  -- Admin permissions (полный доступ)
  ('admin', 'manage_users', 'Управление пользователями'),
  ('admin', 'manage_orders', 'Управление заказами'),
  ('admin', 'manage_payments', 'Управление платежами'),
  ('admin', 'manage_promotions', 'Управление акциями'),
  ('admin', 'view_analytics', 'Просмотр аналитики'),
  ('admin', 'assign_roles', 'Назначение ролей'),
  ('admin', 'manage_projects', 'Управление проектами'),
  
  -- Manager permissions
  ('manager', 'manage_orders', 'Управление заказами'),
  ('manager', 'view_analytics', 'Просмотр аналитики'),
  ('manager', 'manage_projects', 'Управление проектами'),
  ('manager', 'assign_tasks', 'Назначение задач'),
  
  -- Developer permissions
  ('developer', 'view_projects', 'Просмотр проектов'),
  ('developer', 'update_tasks', 'Обновление задач'),
  ('developer', 'view_orders', 'Просмотр заказов'),
  
  -- Freelancer permissions
  ('freelancer', 'view_available_projects', 'Просмотр доступных проектов'),
  ('freelancer', 'apply_to_projects', 'Подача заявок на проекты'),
  ('freelancer', 'update_tasks', 'Обновление задач'),
  
  -- Client permissions
  ('client', 'create_orders', 'Создание заказов'),
  ('client', 'view_own_orders', 'Просмотр своих заказов'),
  ('client', 'make_payments', 'Оплата заказов'),
  
  -- Customer permissions (расширенные для постоянных клиентов)
  ('customer', 'create_orders', 'Создание заказов'),
  ('customer', 'view_own_orders', 'Просмотр своих заказов'),
  ('customer', 'make_payments', 'Оплата заказов'),
  ('customer', 'priority_support', 'Приоритетная поддержка'),
  ('customer', 'view_discounts', 'Просмотр персональных скидок')
ON CONFLICT (role, permission) DO NOTHING;

-- Update RLS policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins and managers can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Enable RLS on role_permissions
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view permissions"
  ON public.role_permissions FOR SELECT
  TO authenticated
  USING (true);

-- Create function to check user permission
CREATE OR REPLACE FUNCTION public.has_permission(
  user_id UUID,
  required_permission TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role user_role;
BEGIN
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = user_id;
  
  RETURN EXISTS (
    SELECT 1 FROM public.role_permissions
    WHERE role = user_role
    AND permission = required_permission
  );
END;
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role user_role;
BEGIN
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = user_id;
  
  RETURN user_role;
END;
$$;
