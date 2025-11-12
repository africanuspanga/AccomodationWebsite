-- =============================================
-- BACKFILL ACCOMMODATION SLUGS
-- Generates URL-friendly slugs for existing accommodations
-- =============================================

-- Function to generate slug from text
CREATE OR REPLACE FUNCTION generate_slug(text TEXT) RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    trim(
      regexp_replace(
        regexp_replace(
          regexp_replace(text, '[^\w\s-]', '', 'g'),
          '\s+', '-', 'g'
        ),
        '-+', '-', 'g'
      )
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update existing accommodations with auto-generated slugs
UPDATE accommodations 
SET slug = generate_slug(name)
WHERE slug IS NULL OR slug = '';

-- Update existing admin_accommodations with auto-generated slugs
UPDATE admin_accommodations 
SET slug = generate_slug(name)
WHERE slug IS NULL OR slug = '';

-- Handle duplicate slugs by appending IDs (if any duplicates exist)
-- For accommodations
WITH duplicates AS (
  SELECT slug, COUNT(*) as count
  FROM accommodations
  WHERE slug IS NOT NULL
  GROUP BY slug
  HAVING COUNT(*) > 1
)
UPDATE accommodations a
SET slug = a.slug || '-' || substring(a.id from 1 for 6)
WHERE a.slug IN (SELECT slug FROM duplicates);

-- For admin_accommodations
WITH duplicates AS (
  SELECT slug, COUNT(*) as count
  FROM admin_accommodations
  WHERE slug IS NOT NULL
  GROUP BY slug
  HAVING COUNT(*) > 1
)
UPDATE admin_accommodations a
SET slug = a.slug || '-' || substring(a.id from 1 for 6)
WHERE a.slug IN (SELECT slug FROM duplicates);

-- Verify the results
SELECT id, name, slug FROM accommodations ORDER BY name;
SELECT id, name, slug FROM admin_accommodations ORDER BY name;

-- Clean up the temporary function
DROP FUNCTION IF EXISTS generate_slug(TEXT);
