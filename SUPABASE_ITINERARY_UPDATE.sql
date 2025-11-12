-- ============================================================================
-- ITINERARY SCHEMA UPDATE: Add PRICES & TERMS fields
-- Run this script in Supabase SQL Editor to add new columns
-- Date: November 12, 2025
-- ============================================================================

-- Add new columns to itineraries table (hardcoded content)
ALTER TABLE itineraries 
ADD COLUMN IF NOT EXISTS whats_not_included text[] DEFAULT NULL,
ADD COLUMN IF NOT EXISTS what_to_bring text[] DEFAULT NULL,
ADD COLUMN IF NOT EXISTS terms_and_conditions text DEFAULT NULL;

-- Add new columns to admin_itineraries table (admin-created content)
ALTER TABLE admin_itineraries 
ADD COLUMN IF NOT EXISTS whats_not_included text[] DEFAULT NULL,
ADD COLUMN IF NOT EXISTS what_to_bring text[] DEFAULT NULL,
ADD COLUMN IF NOT EXISTS terms_and_conditions text DEFAULT NULL;

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'itineraries' 
AND column_name IN ('whats_not_included', 'what_to_bring', 'terms_and_conditions');

SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'admin_itineraries' 
AND column_name IN ('whats_not_included', 'what_to_bring', 'terms_and_conditions');
