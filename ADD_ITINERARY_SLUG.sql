-- Add slug column to itineraries table
-- Run this in your Supabase SQL Editor

-- Add the slug column if it doesn't exist
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create a unique index on slug for SEO-friendly URLs
CREATE UNIQUE INDEX IF NOT EXISTS idx_itineraries_slug ON itineraries(slug) WHERE slug IS NOT NULL;

-- Generate slugs for existing itineraries that don't have one
UPDATE itineraries 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(name, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ),
    '-+', '-', 'g'
  )
) || '-' || SUBSTRING(id::text, 1, 8)
WHERE slug IS NULL OR slug = '';

-- Verify the changes
SELECT id, name, slug FROM itineraries ORDER BY name;
