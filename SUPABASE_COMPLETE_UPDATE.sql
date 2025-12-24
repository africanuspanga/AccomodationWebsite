-- =============================================
-- COMPREHENSIVE DATABASE UPDATE SCRIPT
-- Run this in Supabase SQL Editor to add all missing columns
-- =============================================

-- =============================================
-- ADMIN DESTINATIONS - Add card and full description + slug
-- =============================================
ALTER TABLE admin_destinations 
ADD COLUMN IF NOT EXISTS card_description TEXT,
ADD COLUMN IF NOT EXISTS full_description TEXT,
ADD COLUMN IF NOT EXISTS slug TEXT;

-- Backfill: Use existing description as card_description if card_description is null
UPDATE admin_destinations 
SET card_description = description 
WHERE card_description IS NULL AND description IS NOT NULL;

-- Generate slugs for existing destinations
UPDATE admin_destinations 
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL AND name IS NOT NULL;

-- =============================================
-- ADMIN ACCOMMODATIONS - Add slug, room_types, terms_and_conditions
-- =============================================
ALTER TABLE admin_accommodations 
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS room_types TEXT,
ADD COLUMN IF NOT EXISTS terms_and_conditions TEXT;

-- Generate slugs for existing accommodations
UPDATE admin_accommodations 
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL AND name IS NOT NULL;

-- =============================================
-- ADMIN ITINERARIES - Add all missing fields
-- =============================================
ALTER TABLE admin_itineraries 
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS whats_not_included TEXT[],
ADD COLUMN IF NOT EXISTS what_to_bring TEXT[],
ADD COLUMN IF NOT EXISTS terms_and_conditions TEXT,
ADD COLUMN IF NOT EXISTS day_by_day TEXT,
ADD COLUMN IF NOT EXISTS pricing_data TEXT;

-- Generate slugs for existing itineraries
UPDATE admin_itineraries 
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL AND name IS NOT NULL;

-- =============================================
-- DESTINATION DETAILS - Add gallery images
-- =============================================
ALTER TABLE destination_details 
ADD COLUMN IF NOT EXISTS gallery_images TEXT[];

-- =============================================
-- ITINERARY DETAILS - Add terms and conditions
-- =============================================
ALTER TABLE itinerary_details 
ADD COLUMN IF NOT EXISTS terms_and_conditions TEXT;

-- =============================================
-- ACCOMMODATION DETAILS - Add terms and conditions
-- =============================================
ALTER TABLE accommodation_details 
ADD COLUMN IF NOT EXISTS terms_and_conditions TEXT;

-- =============================================
-- CREATE UNIQUE INDEXES FOR SLUGS
-- =============================================
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_destinations_slug ON admin_destinations(slug) WHERE slug IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_accommodations_slug ON admin_accommodations(slug) WHERE slug IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_itineraries_slug ON admin_itineraries(slug) WHERE slug IS NOT NULL;

-- =============================================
-- VERIFICATION - Check columns were added
-- =============================================
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_name IN ('admin_destinations', 'admin_accommodations', 'admin_itineraries')
AND column_name IN ('slug', 'card_description', 'full_description', 'room_types', 'terms_and_conditions', 'day_by_day', 'pricing_data', 'whats_not_included', 'what_to_bring', 'gallery_images')
ORDER BY table_name, column_name;

-- =============================================
-- COMPLETE! All columns should now exist
-- =============================================
