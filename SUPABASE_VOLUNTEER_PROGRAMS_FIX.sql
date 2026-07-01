-- Repair/upgrade admin_volunteer_programs so admin saves work.
-- Safe to run more than once in Supabase SQL Editor.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS admin_volunteer_programs (
  id TEXT PRIMARY KEY DEFAULT ('sb-' || gen_random_uuid()::text),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  country TEXT,
  flag TEXT,
  min_age TEXT,
  duration TEXT NOT NULL,
  cost TEXT,
  focus_areas TEXT[],
  image TEXT,
  image_url TEXT,
  description TEXT,
  full_explanation TEXT,
  activities TEXT,
  highlights TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_volunteer_programs
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS flag TEXT,
  ADD COLUMN IF NOT EXISTS min_age TEXT,
  ADD COLUMN IF NOT EXISTS cost TEXT,
  ADD COLUMN IF NOT EXISTS focus_areas TEXT[],
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS full_explanation TEXT,
  ADD COLUMN IF NOT EXISTS activities TEXT,
  ADD COLUMN IF NOT EXISTS highlights TEXT[],
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- The app reads/writes this table through the server using SUPABASE_SERVICE_KEY.
-- Keep direct anon/authenticated Supabase clients blocked unless a narrower
-- policy is added later on purpose.
ALTER TABLE admin_volunteer_programs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on admin_volunteer_programs" ON admin_volunteer_programs;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'admin_volunteer_programs'
      AND column_name = 'requirements'
  ) THEN
    EXECUTE 'UPDATE admin_volunteer_programs SET focus_areas = requirements WHERE focus_areas IS NULL AND requirements IS NOT NULL';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'admin_volunteer_programs'
      AND column_name = 'responsibilities'
  ) THEN
    EXECUTE 'UPDATE admin_volunteer_programs SET highlights = responsibilities WHERE highlights IS NULL AND responsibilities IS NOT NULL';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'admin_volunteer_programs'
      AND column_name = 'benefits'
  ) THEN
    EXECUTE 'UPDATE admin_volunteer_programs SET highlights = benefits WHERE (highlights IS NULL OR array_length(highlights, 1) IS NULL) AND benefits IS NOT NULL';
  END IF;
END $$;

UPDATE admin_volunteer_programs
SET
  country = COALESCE(NULLIF(country, ''), 'Tanzania'),
  flag = COALESCE(NULLIF(flag, ''), 'TZ'),
  min_age = COALESCE(NULLIF(min_age, ''), '18+'),
  cost = COALESCE(NULLIF(cost, ''), 'Contact us'),
  focus_areas = COALESCE(focus_areas, ARRAY['Volunteering']::TEXT[]),
  image = COALESCE(NULLIF(image, ''), NULLIF(image_url, ''), ''),
  image_url = COALESCE(NULLIF(image_url, ''), NULLIF(image, ''), ''),
  description = COALESCE(NULLIF(description, ''), ''),
  full_explanation = COALESCE(NULLIF(full_explanation, ''), NULLIF(description, ''), ''),
  activities = COALESCE(NULLIF(activities, ''), '{"safari":false,"hiking":false,"mountainClimbing":false,"culturalTours":false}'),
  highlights = COALESCE(highlights, ARRAY[]::TEXT[])
WHERE
  country IS NULL OR country = ''
  OR flag IS NULL OR flag = ''
  OR min_age IS NULL OR min_age = ''
  OR cost IS NULL OR cost = ''
  OR focus_areas IS NULL
  OR image IS NULL OR image = ''
  OR image_url IS NULL OR image_url = ''
  OR description IS NULL
  OR full_explanation IS NULL OR full_explanation = ''
  OR activities IS NULL OR activities = ''
  OR highlights IS NULL;

CREATE INDEX IF NOT EXISTS idx_admin_volunteer_programs_created_at
  ON admin_volunteer_programs(created_at);

-- Make PostgREST refresh its schema cache after the table shape changes.
NOTIFY pgrst, 'reload schema';

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'admin_volunteer_programs'
ORDER BY ordinal_position;
