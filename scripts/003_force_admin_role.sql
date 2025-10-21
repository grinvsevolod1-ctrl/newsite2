-- Force set admin role for grin.vsevolod1@gmail.com
-- This script ensures the admin role is set correctly

DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Find user ID by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'grin.vsevolod1@gmail.com';

  IF target_user_id IS NOT NULL THEN
    -- Update or insert profile with admin role
    INSERT INTO public.profiles (id, email, role, created_at, updated_at)
    VALUES (
      target_user_id,
      'grin.vsevolod1@gmail.com',
      'admin',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) 
    DO UPDATE SET 
      role = 'admin',
      updated_at = NOW();

    RAISE NOTICE 'Admin role set for user: %', target_user_id;
  ELSE
    RAISE NOTICE 'User with email grin.vsevolod1@gmail.com not found';
  END IF;
END $$;

-- Verify the role was set
SELECT id, email, role, created_at, updated_at
FROM public.profiles
WHERE email = 'grin.vsevolod1@gmail.com';
