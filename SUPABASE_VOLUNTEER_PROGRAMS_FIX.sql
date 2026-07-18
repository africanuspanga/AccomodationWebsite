-- Final repair for admin_volunteer_programs.
-- Safe to run more than once in Supabase SQL Editor.
--
-- This fixes the common save error:
--   null value in column "requirements" violates not-null constraint
--
-- The current app writes focus_areas/highlights. Some older Supabase tables
-- still have legacy requirements/responsibilities/benefits columns marked
-- NOT NULL, so inserts fail before the current columns can be used.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.admin_volunteer_programs (
  id TEXT PRIMARY KEY DEFAULT ('sb-' || gen_random_uuid()::text),
  title TEXT NOT NULL,
  slug TEXT,
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

ALTER TABLE public.admin_volunteer_programs
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS slug TEXT,
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

-- Move old data into the columns used by the current app.
DO $$
DECLARE
  legacy_type TEXT;
BEGIN
  SELECT udt_name INTO legacy_type
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'admin_volunteer_programs'
    AND column_name = 'requirements';

  IF legacy_type = '_text' THEN
    EXECUTE '
      UPDATE public.admin_volunteer_programs
      SET focus_areas = requirements
      WHERE (focus_areas IS NULL OR array_length(focus_areas, 1) IS NULL)
        AND requirements IS NOT NULL
    ';
  ELSIF legacy_type IN ('text', 'varchar') THEN
    EXECUTE '
      UPDATE public.admin_volunteer_programs
      SET focus_areas = ARRAY[requirements]::TEXT[]
      WHERE (focus_areas IS NULL OR array_length(focus_areas, 1) IS NULL)
        AND requirements IS NOT NULL
        AND requirements <> ''''
    ';
  END IF;

  SELECT udt_name INTO legacy_type
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'admin_volunteer_programs'
    AND column_name = 'responsibilities';

  IF legacy_type = '_text' THEN
    EXECUTE '
      UPDATE public.admin_volunteer_programs
      SET highlights = responsibilities
      WHERE (highlights IS NULL OR array_length(highlights, 1) IS NULL)
        AND responsibilities IS NOT NULL
    ';
  ELSIF legacy_type IN ('text', 'varchar') THEN
    EXECUTE '
      UPDATE public.admin_volunteer_programs
      SET highlights = ARRAY[responsibilities]::TEXT[]
      WHERE (highlights IS NULL OR array_length(highlights, 1) IS NULL)
        AND responsibilities IS NOT NULL
        AND responsibilities <> ''''
    ';
  END IF;

  SELECT udt_name INTO legacy_type
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'admin_volunteer_programs'
    AND column_name = 'benefits';

  IF legacy_type = '_text' THEN
    EXECUTE '
      UPDATE public.admin_volunteer_programs
      SET highlights = benefits
      WHERE (highlights IS NULL OR array_length(highlights, 1) IS NULL)
        AND benefits IS NOT NULL
    ';
  ELSIF legacy_type IN ('text', 'varchar') THEN
    EXECUTE '
      UPDATE public.admin_volunteer_programs
      SET highlights = ARRAY[benefits]::TEXT[]
      WHERE (highlights IS NULL OR array_length(highlights, 1) IS NULL)
        AND benefits IS NOT NULL
        AND benefits <> ''''
    ';
  END IF;
END $$;

-- Build readable, unique volunteer slugs from titles instead of exposing IDs.
WITH normalized AS (
  SELECT
    id,
    COALESCE(
      NULLIF(
        TRIM(BOTH '-' FROM REGEXP_REPLACE(
          REGEXP_REPLACE(
            REGEXP_REPLACE(LOWER(COALESCE(NULLIF(slug, ''), title, 'volunteer-program')), '[^a-z0-9\s-]', '', 'g'),
            '\s+',
            '-',
            'g'
          ),
          '-+',
          '-',
          'g'
        )),
        ''
      ),
      'volunteer-program'
    ) AS base_slug,
    created_at
  FROM public.admin_volunteer_programs
),
ranked AS (
  SELECT
    id,
    CASE
      WHEN ROW_NUMBER() OVER (PARTITION BY base_slug ORDER BY created_at NULLS LAST, id) = 1 THEN base_slug
      ELSE base_slug || '-' || ROW_NUMBER() OVER (PARTITION BY base_slug ORDER BY created_at NULLS LAST, id)::TEXT
    END AS next_slug
  FROM normalized
)
UPDATE public.admin_volunteer_programs AS programs
SET slug = ranked.next_slug
FROM ranked
WHERE programs.id = ranked.id
  AND programs.slug IS DISTINCT FROM ranked.next_slug;

-- Fill missing current-app values so existing rows are healthy.
UPDATE public.admin_volunteer_programs
SET
  title = COALESCE(NULLIF(title, ''), 'Untitled volunteer program'),
  location = COALESCE(NULLIF(location, ''), 'Tanzania'),
  country = COALESCE(NULLIF(country, ''), 'Tanzania'),
  flag = COALESCE(NULLIF(flag, ''), 'TZ'),
  min_age = COALESCE(NULLIF(min_age, ''), '18+'),
  duration = COALESCE(NULLIF(duration, ''), 'Contact us'),
  cost = COALESCE(NULLIF(cost, ''), 'Contact us'),
  focus_areas = CASE
    WHEN focus_areas IS NULL OR array_length(focus_areas, 1) IS NULL THEN ARRAY['Volunteering']::TEXT[]
    ELSE focus_areas
  END,
  image = COALESCE(NULLIF(image, ''), NULLIF(image_url, ''), ''),
  image_url = COALESCE(NULLIF(image_url, ''), NULLIF(image, ''), ''),
  description = COALESCE(NULLIF(description, ''), 'Details coming soon.'),
  full_explanation = COALESCE(NULLIF(full_explanation, ''), NULLIF(description, ''), 'Details coming soon.'),
  activities = COALESCE(NULLIF(activities, ''), '{"safari":false,"hiking":false,"mountainClimbing":false,"culturalTours":false}'),
  highlights = CASE
    WHEN highlights IS NULL OR array_length(highlights, 1) IS NULL THEN ARRAY['Meaningful volunteer experience']::TEXT[]
    ELSE highlights
  END,
  created_at = COALESCE(created_at, NOW()),
  updated_at = COALESCE(updated_at, NOW())
WHERE
  title IS NULL OR title = ''
  OR location IS NULL OR location = ''
  OR country IS NULL OR country = ''
  OR flag IS NULL OR flag = ''
  OR min_age IS NULL OR min_age = ''
  OR duration IS NULL OR duration = ''
  OR cost IS NULL OR cost = ''
  OR focus_areas IS NULL OR array_length(focus_areas, 1) IS NULL
  OR image IS NULL OR image = ''
  OR image_url IS NULL OR image_url = ''
  OR description IS NULL OR description = ''
  OR full_explanation IS NULL OR full_explanation = ''
  OR activities IS NULL OR activities = ''
  OR highlights IS NULL OR array_length(highlights, 1) IS NULL
  OR created_at IS NULL
  OR updated_at IS NULL;

-- Give current-app columns safe defaults for future inserts.
ALTER TABLE public.admin_volunteer_programs
  ALTER COLUMN title SET DEFAULT 'Untitled volunteer program',
  ALTER COLUMN location SET DEFAULT 'Tanzania',
  ALTER COLUMN country SET DEFAULT 'Tanzania',
  ALTER COLUMN flag SET DEFAULT 'TZ',
  ALTER COLUMN min_age SET DEFAULT '18+',
  ALTER COLUMN duration SET DEFAULT 'Contact us',
  ALTER COLUMN cost SET DEFAULT 'Contact us',
  ALTER COLUMN focus_areas SET DEFAULT ARRAY['Volunteering']::TEXT[],
  ALTER COLUMN image SET DEFAULT '',
  ALTER COLUMN image_url SET DEFAULT '',
  ALTER COLUMN description SET DEFAULT 'Details coming soon.',
  ALTER COLUMN full_explanation SET DEFAULT 'Details coming soon.',
  ALTER COLUMN activities SET DEFAULT '{"safari":false,"hiking":false,"mountainClimbing":false,"culturalTours":false}',
  ALTER COLUMN highlights SET DEFAULT ARRAY['Meaningful volunteer experience']::TEXT[],
  ALTER COLUMN created_at SET DEFAULT NOW(),
  ALTER COLUMN updated_at SET DEFAULT NOW();

-- Make the fields the app validates required at the database level.
ALTER TABLE public.admin_volunteer_programs
  ALTER COLUMN title SET NOT NULL,
  ALTER COLUMN location SET NOT NULL,
  ALTER COLUMN country SET NOT NULL,
  ALTER COLUMN flag SET NOT NULL,
  ALTER COLUMN min_age SET NOT NULL,
  ALTER COLUMN duration SET NOT NULL,
  ALTER COLUMN cost SET NOT NULL,
  ALTER COLUMN focus_areas SET NOT NULL,
  ALTER COLUMN image SET NOT NULL,
  ALTER COLUMN description SET NOT NULL,
  ALTER COLUMN full_explanation SET NOT NULL,
  ALTER COLUMN activities SET NOT NULL,
  ALTER COLUMN highlights SET NOT NULL,
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN updated_at SET NOT NULL;

-- Legacy columns are no longer written by the app. Keep them for old data, but
-- remove NOT NULL so they cannot block new admin saves.
DO $$
DECLARE
  legacy_col RECORD;
BEGIN
  FOR legacy_col IN
    SELECT column_name, udt_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'admin_volunteer_programs'
      AND column_name IN ('requirements', 'responsibilities', 'benefits')
  LOOP
    EXECUTE format(
      'ALTER TABLE public.admin_volunteer_programs ALTER COLUMN %I DROP NOT NULL',
      legacy_col.column_name
    );

    IF legacy_col.udt_name = '_text' THEN
      EXECUTE format(
        'ALTER TABLE public.admin_volunteer_programs ALTER COLUMN %I SET DEFAULT ARRAY[]::TEXT[]',
        legacy_col.column_name
      );
    ELSIF legacy_col.udt_name IN ('text', 'varchar') THEN
      EXECUTE format(
        'ALTER TABLE public.admin_volunteer_programs ALTER COLUMN %I SET DEFAULT %L',
        legacy_col.column_name,
        ''
      );
    END IF;
  END LOOP;
END $$;

CREATE INDEX IF NOT EXISTS idx_admin_volunteer_programs_created_at
  ON public.admin_volunteer_programs(created_at);

CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_volunteer_programs_slug
  ON public.admin_volunteer_programs(slug)
  WHERE slug IS NOT NULL AND slug <> '';

CREATE OR REPLACE FUNCTION public.set_admin_volunteer_programs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admin_volunteer_programs_updated_at
  ON public.admin_volunteer_programs;

CREATE TRIGGER trg_admin_volunteer_programs_updated_at
BEFORE UPDATE ON public.admin_volunteer_programs
FOR EACH ROW
EXECUTE FUNCTION public.set_admin_volunteer_programs_updated_at();

-- The server uses SUPABASE_SERVICE_KEY, which bypasses RLS.
-- Direct browser/anon clients stay blocked unless you add a narrower policy.
ALTER TABLE public.admin_volunteer_programs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on admin_volunteer_programs"
  ON public.admin_volunteer_programs;

-- Make PostgREST refresh its schema cache after the table shape changes.
NOTIFY pgrst, 'reload schema';

-- Confirmation output: slug should exist, and requirements/responsibilities/benefits should now be nullable.
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'admin_volunteer_programs'
ORDER BY ordinal_position;
