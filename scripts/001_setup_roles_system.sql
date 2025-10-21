-- Create role enum type if not exists
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'manager', 'developer', 'freelancer', 'client', 'customer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add role column to profiles table if not exists
DO $$ BEGIN
    ALTER TABLE profiles ADD COLUMN role user_role DEFAULT 'client';
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Set admin role for your account
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'grin.vsevolod1@gmail.com';

-- If profile doesn't exist yet, create a trigger to set admin role on signup
CREATE OR REPLACE FUNCTION set_admin_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email = 'grin.vsevolod1@gmail.com' THEN
        NEW.role = 'admin';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger if not exists
DROP TRIGGER IF EXISTS set_admin_role_trigger ON profiles;
CREATE TRIGGER set_admin_role_trigger
    BEFORE INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION set_admin_role();

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Create RLS policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles"
    ON profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Grant necessary permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON profiles TO service_role;
