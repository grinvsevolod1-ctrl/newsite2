-- Job vacancies
CREATE TABLE IF NOT EXISTS public.vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  description_en TEXT NOT NULL,
  requirements_ru TEXT[] DEFAULT '{}',
  requirements_en TEXT[] DEFAULT '{}',
  responsibilities_ru TEXT[] DEFAULT '{}',
  responsibilities_en TEXT[] DEFAULT '{}',
  employment_type TEXT NOT NULL, -- 'full-time', 'part-time', 'contract', 'freelance'
  experience_level TEXT NOT NULL, -- 'junior', 'middle', 'senior', 'lead'
  location TEXT DEFAULT 'remote',
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'byn',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active vacancies"
  ON public.vacancies FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage vacancies"
  ON public.vacancies FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Job applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vacancy_id UUID REFERENCES public.vacancies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  portfolio_url TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'reviewing', 'interview', 'rejected', 'accepted'
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications"
  ON public.job_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can submit applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all applications"
  ON public.job_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update applications"
  ON public.job_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
