-- Set admin role for grin.vsevolod1@gmail.com
UPDATE profiles 
SET role = 'admin'
WHERE email = 'grin.vsevolod1@gmail.com';

-- Verify the update
SELECT id, email, full_name, role 
FROM profiles 
WHERE email = 'grin.vsevolod1@gmail.com';
