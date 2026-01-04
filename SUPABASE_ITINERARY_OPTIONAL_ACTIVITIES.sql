-- SQL Migration: Add optional_activities column to itineraries tables
-- Run this in Supabase SQL Editor

-- Add optional_activities column to itineraries table (public data)
ALTER TABLE itineraries 
ADD COLUMN IF NOT EXISTS optional_activities TEXT[];

-- Add optional_activities column to admin_itineraries table (admin CMS)
ALTER TABLE admin_itineraries 
ADD COLUMN IF NOT EXISTS optional_activities TEXT[];

-- Verify the columns were added
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE column_name = 'optional_activities' 
AND table_name IN ('itineraries', 'admin_itineraries');
