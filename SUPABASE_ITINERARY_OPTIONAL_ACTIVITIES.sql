-- SQL Migration: Add optional_activities column to itineraries table
-- Run this in Supabase SQL Editor

-- Add optional_activities column to itineraries table
ALTER TABLE itineraries 
ADD COLUMN IF NOT EXISTS optional_activities TEXT[];

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'itineraries' 
AND column_name = 'optional_activities';
