-- Add indexes for better query performance

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at DESC);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Tickets indexes
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);

-- Promotions indexes
CREATE INDEX IF NOT EXISTS idx_promotions_code ON promotions(code);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON promotions(active);
CREATE INDEX IF NOT EXISTS idx_promotions_expires_at ON promotions(expires_at);

-- Price calculations indexes
CREATE INDEX IF NOT EXISTS idx_price_calculations_user_id ON price_calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_price_calculations_created_at ON price_calculations(created_at DESC);

COMMENT ON INDEX idx_profiles_role IS 'Index for filtering users by role';
COMMENT ON INDEX idx_orders_status IS 'Index for filtering orders by status';
COMMENT ON INDEX idx_projects_status IS 'Index for filtering projects by status';
COMMENT ON INDEX idx_tickets_priority IS 'Index for filtering tickets by priority';
