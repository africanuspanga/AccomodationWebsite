-- Supabase Database Setup for Admin Content Management
-- Run this script in your Supabase SQL Editor to create the required tables

-- Admin Blogs Table
CREATE TABLE IF NOT EXISTS admin_blogs (
  id TEXT PRIMARY KEY DEFAULT 'sb-' || gen_random_uuid()::text,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Volunteer Programs Table
CREATE TABLE IF NOT EXISTS admin_volunteer_programs (
  id TEXT PRIMARY KEY DEFAULT 'sb-' || gen_random_uuid()::text,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  country TEXT NOT NULL,
  flag TEXT NOT NULL,
  min_age TEXT NOT NULL,
  duration TEXT NOT NULL,
  cost TEXT NOT NULL,
  focus_areas TEXT[] NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  full_explanation TEXT NOT NULL,
  activities TEXT NOT NULL,
  highlights TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Accommodations Table
CREATE TABLE IF NOT EXISTS admin_accommodations (
  id TEXT PRIMARY KEY DEFAULT 'sb-' || gen_random_uuid()::text,
  name TEXT NOT NULL,
  continental TEXT NOT NULL,
  country TEXT NOT NULL,
  destination TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  rating INTEGER DEFAULT 5,
  features TEXT[] NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Itineraries Table
CREATE TABLE IF NOT EXISTS admin_itineraries (
  id TEXT PRIMARY KEY DEFAULT 'sb-' || gen_random_uuid()::text,
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL,
  includes TEXT[] NOT NULL,
  difficulty TEXT,
  group_size TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE admin_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_volunteer_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_itineraries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (adjust based on your security needs)
-- Allow all operations for authenticated users (you may want to restrict this)
CREATE POLICY "Allow all operations on admin_blogs" ON admin_blogs FOR ALL USING (true);
CREATE POLICY "Allow all operations on admin_volunteer_programs" ON admin_volunteer_programs FOR ALL USING (true);
CREATE POLICY "Allow all operations on admin_accommodations" ON admin_accommodations FOR ALL USING (true);
CREATE POLICY "Allow all operations on admin_itineraries" ON admin_itineraries FOR ALL USING (true);

