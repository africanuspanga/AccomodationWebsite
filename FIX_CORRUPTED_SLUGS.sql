-- Fix corrupted slugs in admin_accommodations table
-- Run this in Supabase SQL Editor to fix slugs that have spaces or invalid characters

-- Update accommodations with invalid slugs (containing spaces or special chars)
UPDATE admin_accommodations
SET slug = LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                TRIM(COALESCE(slug, name)),
                '[^a-zA-Z0-9\s-]', '', 'g'
            ),
            '\s+', '-', 'g'
        ),
        '-+', '-', 'g'
    )
)
WHERE slug IS NULL 
   OR slug LIKE '% %' 
   OR slug ~ '[^a-z0-9-]';

-- Remove leading/trailing hyphens
UPDATE admin_accommodations
SET slug = TRIM(BOTH '-' FROM slug)
WHERE slug LIKE '-%' OR slug LIKE '%-';

-- Fix itineraries as well
UPDATE admin_itineraries
SET slug = LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                TRIM(COALESCE(slug, name)),
                '[^a-zA-Z0-9\s-]', '', 'g'
            ),
            '\s+', '-', 'g'
        ),
        '-+', '-', 'g'
    )
)
WHERE slug IS NULL 
   OR slug LIKE '% %' 
   OR slug ~ '[^a-z0-9-]';

-- Remove leading/trailing hyphens from itineraries
UPDATE admin_itineraries
SET slug = TRIM(BOTH '-' FROM slug)
WHERE slug LIKE '-%' OR slug LIKE '%-';

-- Fix destinations as well
UPDATE admin_destinations
SET slug = LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                TRIM(COALESCE(slug, name)),
                '[^a-zA-Z0-9\s-]', '', 'g'
            ),
            '\s+', '-', 'g'
        ),
        '-+', '-', 'g'
    )
)
WHERE slug IS NULL 
   OR slug LIKE '% %' 
   OR slug ~ '[^a-z0-9-]';

-- Remove leading/trailing hyphens from destinations
UPDATE admin_destinations
SET slug = TRIM(BOTH '-' FROM slug)
WHERE slug LIKE '-%' OR slug LIKE '%-';

-- Verify the results
SELECT name, slug FROM admin_accommodations;
SELECT name, slug FROM admin_itineraries;
SELECT name, slug FROM admin_destinations;
