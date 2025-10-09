-- Create team table
CREATE TABLE IF NOT EXISTS public.team (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  all INTEGER NOT NULL DEFAULT 0,
  fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on team"
  ON public.team
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on team"
  ON public.team
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update on team"
  ON public.team
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO public.team (name, all, fee) VALUES
  ('김철수 팀', 5, 150000.00),
  ('이영희 팀', 8, 250000.00),
  ('박민수 팀', 12, 350000.00);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_name ON public.team(name);
CREATE INDEX IF NOT EXISTS idx_team_created_at ON public.team(created_at);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_team_updated_at
  BEFORE UPDATE ON public.team
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

