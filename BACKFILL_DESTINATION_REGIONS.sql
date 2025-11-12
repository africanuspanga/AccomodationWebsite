-- Backfill Destination Regions
-- This script updates existing destinations that have null regions
-- to ensure they appear on the /destinations page

-- Update admin_destinations with null regions to default 'northern-circuit'
-- You can manually adjust specific destinations to 'southern-circuit' or 'coast' as needed
UPDATE admin_destinations 
SET region = 'northern-circuit' 
WHERE region IS NULL OR region = '';

-- Verify the update
SELECT id, name, region FROM admin_destinations;

-- INSTRUCTIONS:
-- 1. Run this script in your Supabase SQL Editor
-- 2. Review the results
-- 3. Manually update specific destinations to 'southern-circuit' or 'coast' if needed:
--    UPDATE admin_destinations SET region = 'southern-circuit' WHERE name = 'Ruaha National Park';
--    UPDATE admin_destinations SET region = 'coast' WHERE name IN ('Zanzibar', 'Pemba Island');
