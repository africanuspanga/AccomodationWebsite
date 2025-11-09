import { createClient } from '@supabase/supabase-js';

// Supabase setup requires two environment variables:
// 1. SUPABASE_URL - Your Supabase project URL
// 2. SUPABASE_SERVICE_KEY - Your Supabase service role key (for server-side operations)

if (!process.env.SUPABASE_URL) {
  throw new Error(
    "SUPABASE_URL must be set. Please add it to your environment variables."
  );
}

if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error(
    "SUPABASE_SERVICE_KEY must be set. Please add it to your environment variables."
  );
}

// Create Supabase client with service role key for server-side operations
// This bypasses Row Level Security (RLS) and should only be used on the server
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Export a helper function for error handling
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'Database operation failed');
}

// Type-safe table name constants
export const TABLES = {
  USERS: 'users',
  ACCOMMODATIONS: 'accommodations',
  DESTINATIONS: 'destinations',
  ITINERARIES: 'itineraries',
  INQUIRIES: 'inquiries',
  VOLUNTEER_APPLICATIONS: 'volunteer_applications',
  BOOKINGS: 'bookings',
  ADMIN_BLOGS: 'admin_blogs',
  ADMIN_VOLUNTEER_PROGRAMS: 'admin_volunteer_programs',
  ADMIN_ACCOMMODATIONS: 'admin_accommodations',
  ADMIN_ITINERARIES: 'admin_itineraries',
  ADMIN_DESTINATIONS: 'admin_destinations',
  DESTINATION_DETAILS: 'destination_details',
  ITINERARY_DETAILS: 'itinerary_details',
  ACCOMMODATION_DETAILS: 'accommodation_details',
} as const;
