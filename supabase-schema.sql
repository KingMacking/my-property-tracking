-- Property Tracker — properties + interactions table
-- Run this in Supabase SQL Editor

-- Drop旧 table if recreating (optional, skip if you have data)
-- DROP TABLE IF EXISTS properties;

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  address TEXT DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  expenses NUMERIC NOT NULL DEFAULT 0,
  rooms INT NOT NULL DEFAULT 1,
  bedrooms INT NOT NULL DEFAULT 1,
  bathrooms INT NOT NULL DEFAULT 1,
  area NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'contactado', 'visitado', 'interesado', 'descartado')),
  notes TEXT DEFAULT '',
  url TEXT DEFAULT '',
  interactions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- If table already exists, add the column:
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS interactions JSONB DEFAULT '[]'::jsonb;

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_updated_at ON properties;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Expose table to Data API (anon role)
GRANT SELECT, INSERT, UPDATE, DELETE ON properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON properties TO authenticated;

-- Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read properties" ON properties;
DROP POLICY IF EXISTS "Anyone can insert properties" ON properties;
DROP POLICY IF EXISTS "Anyone can update properties" ON properties;
DROP POLICY IF EXISTS "Anyone can delete properties" ON properties;

CREATE POLICY "Anyone can read properties" ON properties
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert properties" ON properties
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update properties" ON properties
  FOR UPDATE USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete properties" ON properties
  FOR DELETE USING (true);
