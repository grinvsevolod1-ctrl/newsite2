-- Price calculator results
CREATE TABLE IF NOT EXISTS public.price_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  project_type TEXT NOT NULL,
  features JSONB NOT NULL,
  estimated_price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'byn',
  contact_email TEXT,
  contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.price_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own calculations"
  ON public.price_calculations FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert calculations"
  ON public.price_calculations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all calculations"
  ON public.price_calculations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
