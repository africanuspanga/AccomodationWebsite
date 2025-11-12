-- =============================================
-- ACCOMMODATION ENHANCEMENTS
-- Adds slug, room_types, and terms_and_conditions
-- =============================================

-- Update accommodations table
ALTER TABLE accommodations 
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS room_types TEXT,
ADD COLUMN IF NOT EXISTS terms_and_conditions TEXT;

-- Update admin_accommodations table
ALTER TABLE admin_accommodations 
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS room_types TEXT,
ADD COLUMN IF NOT EXISTS terms_and_conditions TEXT;

-- Create unique indexes on slug for better performance and uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS idx_accommodations_slug ON accommodations(slug) WHERE slug IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_accommodations_slug ON admin_accommodations(slug) WHERE slug IS NOT NULL;

-- Verify changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('accommodations', 'admin_accommodations') 
ORDER BY table_name, ordinal_position;

-- NEXT STEP: Run the backfill script (BACKFILL_ACCOMMODATION_SLUGS.sql) to generate slugs for existing records
