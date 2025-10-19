-- Partnership requests
CREATE TABLE IF NOT EXISTS public.partnership_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  partnership_type TEXT NOT NULL, -- 'reseller', 'technology', 'referral', 'investment', 'other'
  description TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'reviewing', 'approved', 'rejected'
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.partnership_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own partnership requests"
  ON public.partnership_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can submit partnership requests"
  ON public.partnership_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all partnership requests"
  ON public.partnership_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update partnership requests"
  ON public.partnership_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
