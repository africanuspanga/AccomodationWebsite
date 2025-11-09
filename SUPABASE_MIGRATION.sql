-- =============================================
-- SUPABASE DATABASE MIGRATION SCRIPT
-- Accommodation Collection Website
-- =============================================
-- Run this script in your Supabase SQL Editor
-- This will create all tables required for the application
-- =============================================

-- Enable UUID extension (Supabase has this by default, but ensuring it's enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: users
-- Stores admin user credentials
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- =============================================
-- TABLE: accommodations
-- Stores static accommodation data (hardcoded content)
-- =============================================
CREATE TABLE IF NOT EXISTS accommodations (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    continental TEXT NOT NULL,
    country TEXT NOT NULL,
    destination TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    features TEXT[]
);

-- =============================================
-- TABLE: destinations
-- Stores static destination data (hardcoded content)
-- =============================================
CREATE TABLE IF NOT EXISTS destinations (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    continental TEXT NOT NULL,
    country TEXT NOT NULL,
    region TEXT NOT NULL,
    description TEXT NOT NULL,
    highlights TEXT[],
    best_time TEXT,
    image_url TEXT
);

-- =============================================
-- TABLE: itineraries
-- Stores static itinerary/tour data (hardcoded content)
-- =============================================
CREATE TABLE IF NOT EXISTS itineraries (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    duration TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    highlights TEXT[],
    includes TEXT[],
    difficulty TEXT,
    group_size TEXT,
    rating INTEGER DEFAULT 5,
    image_url TEXT
);

-- =============================================
-- TABLE: inquiries
-- Stores contact form submissions
-- =============================================
CREATE TABLE IF NOT EXISTS inquiries (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    arrival_date TEXT,
    departure_date TEXT,
    adults INTEGER,
    children INTEGER,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: volunteer_applications
-- Stores volunteer program applications
-- =============================================
CREATE TABLE IF NOT EXISTS volunteer_applications (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    gender TEXT NOT NULL,
    full_address TEXT NOT NULL,
    country TEXT NOT NULL,
    telephone TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    nationality TEXT NOT NULL,
    passport_number TEXT NOT NULL,
    education_profession TEXT NOT NULL,
    language TEXT NOT NULL,
    working_experience TEXT NOT NULL,
    how_found_us TEXT NOT NULL,
    expected_arrival_date TEXT NOT NULL,
    volunteer_duration TEXT NOT NULL,
    dietary_restrictions BOOLEAN DEFAULT FALSE,
    dietary_details TEXT,
    excursions TEXT[],
    emergency_contact_name TEXT NOT NULL,
    emergency_relation TEXT NOT NULL,
    emergency_phone TEXT NOT NULL,
    emergency_email TEXT NOT NULL,
    created_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: bookings
-- Stores accommodation and itinerary bookings
-- =============================================
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_type TEXT NOT NULL, -- 'accommodation' or 'itinerary'
    item_id TEXT NOT NULL, -- ID of the accommodation or itinerary
    item_name TEXT NOT NULL, -- Name for reference
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL, -- includes country code
    check_in_date TEXT NOT NULL,
    check_out_date TEXT NOT NULL,
    number_of_days INTEGER NOT NULL,
    adults INTEGER NOT NULL,
    children INTEGER NOT NULL DEFAULT 0,
    special_requests TEXT,
    created_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: admin_blogs
-- Stores admin-created blog posts
-- =============================================
CREATE TABLE IF NOT EXISTS admin_blogs (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    created_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: admin_volunteer_programs
-- Stores admin-created volunteer programs
-- =============================================
CREATE TABLE IF NOT EXISTS admin_volunteer_programs (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
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
    activities TEXT NOT NULL, -- JSON stringified object
    highlights TEXT[] NOT NULL,
    created_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: admin_accommodations
-- Stores admin-created accommodations
-- =============================================
CREATE TABLE IF NOT EXISTS admin_accommodations (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
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
    gallery_images TEXT[], -- Array of gallery image URLs
    created_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: admin_itineraries
-- Stores admin-created itineraries
-- =============================================
CREATE TABLE IF NOT EXISTS admin_itineraries (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    duration TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    highlights TEXT[] NOT NULL,
    includes TEXT[] NOT NULL,
    difficulty TEXT,
    group_size TEXT,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    gallery_images TEXT[], -- Array of gallery image URLs
    created_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: admin_destinations
-- Stores admin-created destinations
-- =============================================
CREATE TABLE IF NOT EXISTS admin_destinations (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    continental TEXT NOT NULL,
    country TEXT NOT NULL,
    region TEXT, -- 'northern-circuit', 'southern-circuit', 'coast', null for cities/mountains/countries
    destination_type TEXT NOT NULL, -- 'safari-circuit', 'beach', 'mountain', 'city', 'country'
    description TEXT NOT NULL,
    highlights TEXT[],
    best_time TEXT,
    image_url TEXT,
    gallery_images TEXT[],
    sub_destinations TEXT[], -- For countries with multiple destinations
    created_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: destination_details
-- Stores detailed destination information
-- =============================================
CREATE TABLE IF NOT EXISTS destination_details (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id TEXT NOT NULL UNIQUE, -- References destination.id
    detailed_description TEXT NOT NULL, -- 600+ characters
    overview TEXT,
    wildlife TEXT,
    activities TEXT,
    best_time_to_visit TEXT,
    getting_there TEXT,
    accommodation TEXT,
    practical_info TEXT,
    image_url TEXT,
    created_at TEXT DEFAULT NOW(),
    updated_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: itinerary_details
-- Stores comprehensive tour details, itinerary, and pricing
-- =============================================
CREATE TABLE IF NOT EXISTS itinerary_details (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    itinerary_id TEXT NOT NULL UNIQUE, -- References itinerary.id
    
    -- Tour Details Tab
    whats_included TEXT[], -- Array of included items
    whats_not_included TEXT[], -- Array of excluded items
    what_to_bring TEXT[], -- Array of items to bring
    
    -- Itinerary Tab
    itinerary_overview TEXT, -- Overview paragraph
    day_by_day TEXT, -- JSON stringified array of {day: number, title: string, description: string}
    
    -- Prices & Terms Tab
    pricing_data TEXT, -- JSON stringified pricing structure with seasons, packages, and group sizes
    
    -- Map and other details
    map_image_url TEXT,
    tour_highlights TEXT[], -- For sidebar
    
    created_at TEXT DEFAULT NOW(),
    updated_at TEXT DEFAULT NOW()
);

-- =============================================
-- TABLE: accommodation_details
-- Stores accommodation facilities, rooms, and gallery
-- =============================================
CREATE TABLE IF NOT EXISTS accommodation_details (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    accommodation_id TEXT NOT NULL UNIQUE, -- References accommodation.id
    
    -- Facilities Tab
    facilities TEXT[], -- Array of facility names
    
    -- Rooms Tab
    rooms TEXT, -- JSON stringified array of room objects with {name, description, images, units, guests, amenities}
    
    -- Gallery Tab
    gallery_images TEXT[], -- Array of image URLs for gallery
    
    created_at TEXT DEFAULT NOW(),
    updated_at TEXT DEFAULT NOW()
);

-- =============================================
-- CREATE INDEXES for better query performance
-- =============================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Accommodations indexes
CREATE INDEX IF NOT EXISTS idx_accommodations_continental ON accommodations(continental);
CREATE INDEX IF NOT EXISTS idx_accommodations_country ON accommodations(country);
CREATE INDEX IF NOT EXISTS idx_accommodations_destination ON accommodations(destination);
CREATE INDEX IF NOT EXISTS idx_accommodations_category ON accommodations(category);

-- Admin Accommodations indexes
CREATE INDEX IF NOT EXISTS idx_admin_accommodations_continental ON admin_accommodations(continental);
CREATE INDEX IF NOT EXISTS idx_admin_accommodations_country ON admin_accommodations(country);
CREATE INDEX IF NOT EXISTS idx_admin_accommodations_destination ON admin_accommodations(destination);

-- Destinations indexes
CREATE INDEX IF NOT EXISTS idx_destinations_continental ON destinations(continental);
CREATE INDEX IF NOT EXISTS idx_destinations_country ON destinations(country);
CREATE INDEX IF NOT EXISTS idx_destinations_region ON destinations(region);

-- Admin Destinations indexes
CREATE INDEX IF NOT EXISTS idx_admin_destinations_continental ON admin_destinations(continental);
CREATE INDEX IF NOT EXISTS idx_admin_destinations_country ON admin_destinations(country);
CREATE INDEX IF NOT EXISTS idx_admin_destinations_type ON admin_destinations(destination_type);

-- Itineraries indexes
CREATE INDEX IF NOT EXISTS idx_itineraries_category ON itineraries(category);

-- Admin Itineraries indexes
CREATE INDEX IF NOT EXISTS idx_admin_itineraries_category ON admin_itineraries(category);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_type ON bookings(booking_type);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Inquiries indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- Blogs indexes
CREATE INDEX IF NOT EXISTS idx_admin_blogs_category ON admin_blogs(category);
CREATE INDEX IF NOT EXISTS idx_admin_blogs_created_at ON admin_blogs(created_at);

-- Volunteer Applications indexes
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_program_id ON volunteer_applications(program_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_email ON volunteer_applications(email);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_created_at ON volunteer_applications(created_at);

-- Detail tables indexes
CREATE INDEX IF NOT EXISTS idx_destination_details_destination_id ON destination_details(destination_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_details_itinerary_id ON itinerary_details(itinerary_id);
CREATE INDEX IF NOT EXISTS idx_accommodation_details_accommodation_id ON accommodation_details(accommodation_id);

-- =============================================
-- OPTIONAL: Insert default admin user
-- =============================================
-- Uncomment if you want to create a default admin user
-- Password is hashed using bcrypt (you'll need to hash it properly in your application)
-- INSERT INTO users (username, password) VALUES ('admin@accommodations.guide', '$2b$10$yourHashedPasswordHere');

-- =============================================
-- VERIFICATION QUERIES
-- Run these to verify tables were created successfully
-- =============================================

-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Count rows in each table
SELECT 
    'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'accommodations', COUNT(*) FROM accommodations
UNION ALL
SELECT 'destinations', COUNT(*) FROM destinations
UNION ALL
SELECT 'itineraries', COUNT(*) FROM itineraries
UNION ALL
SELECT 'inquiries', COUNT(*) FROM inquiries
UNION ALL
SELECT 'volunteer_applications', COUNT(*) FROM volunteer_applications
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'admin_blogs', COUNT(*) FROM admin_blogs
UNION ALL
SELECT 'admin_volunteer_programs', COUNT(*) FROM admin_volunteer_programs
UNION ALL
SELECT 'admin_accommodations', COUNT(*) FROM admin_accommodations
UNION ALL
SELECT 'admin_itineraries', COUNT(*) FROM admin_itineraries
UNION ALL
SELECT 'admin_destinations', COUNT(*) FROM admin_destinations
UNION ALL
SELECT 'destination_details', COUNT(*) FROM destination_details
UNION ALL
SELECT 'itinerary_details', COUNT(*) FROM itinerary_details
UNION ALL
SELECT 'accommodation_details', COUNT(*) FROM accommodation_details;

-- =============================================
-- MIGRATION COMPLETE
-- =============================================
-- All tables have been created successfully!
-- Next steps:
-- 1. Run the seed data script (SUPABASE_SEED.sql) to populate initial data
-- 2. Update your application environment variables with Supabase credentials
-- 3. Test the connection from your application
-- =============================================
