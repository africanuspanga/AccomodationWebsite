# Admin System Setup Guide

## Overview

The admin system allows you to manage content (accommodations, blogs, volunteer programs, and itineraries) that will be displayed alongside your existing hardcoded content. All new content is stored in Supabase and will appear seamlessly integrated with your current content.

## Quick Setup (3 Steps)

### Step 1: Create Supabase Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-setup.sql` into the editor
4. Click **Run** to create all the required tables

### Step 2: Verify Environment Variables

Make sure these secrets are set in your Replit project (they should already be configured):
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Step 3: Access the Admin Dashboard

1. Navigate to `/admin/login` in your browser
2. Login with these credentials:
   - **Email**: `admin@accommodations.guide`
   - **Password**: `Guide@1961`
3. You'll be redirected to the admin dashboard at `/admin`

## How It Works

### Dual-Source Content System

The application now displays content from **two sources**:

1. **Hardcoded Content** (Protected - Cannot be edited/deleted)
   - Existing accommodations from `content.json`
   - Existing blogs from `blog-data.ts`
   - Existing volunteer programs from `volunteer-programs.ts`
   - Existing itineraries from `content.json`

2. **Admin-Created Content** (Managed via Dashboard)
   - New content created through the admin dashboard
   - Stored in Supabase database
   - Uses "sb-" prefix for IDs to avoid conflicts

Both sources are merged and displayed together on the public-facing pages.

### Admin Dashboard Features

**Content Management Tabs:**
- **Accommodations** - Add/edit/delete accommodations
- **Blogs** - Add/edit/delete blog posts
- **Volunteer Programs** - Add/edit/delete volunteer opportunities
- **Itineraries** - Add/edit/delete safari itineraries

**For Each Content Type:**
- View all admin-created items in a table
- Add new items with "Add New" button
- Edit existing items
- Delete items with confirmation dialog
- Logout button to end admin session

### Security

- Simple token-based authentication
- Token stored in localStorage
- Admin routes protected by authentication middleware
- Row Level Security (RLS) enabled on all Supabase tables

## Database Schema

### admin_blogs
- `id` (TEXT, Primary Key) - Auto-generated with "sb-" prefix
- `title` (TEXT)
- `excerpt` (TEXT)
- `content` (TEXT)
- `author` (TEXT)
- `category` (TEXT)
- `image_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### admin_volunteer_programs
- `id` (TEXT, Primary Key) - Auto-generated with "sb-" prefix
- `title` (TEXT)
- `location` (TEXT)
- `duration` (TEXT)
- `description` (TEXT)
- `requirements` (TEXT[])
- `responsibilities` (TEXT[])
- `benefits` (TEXT[])
- `start_date` (TEXT)
- `application_deadline` (TEXT)
- `image_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### admin_accommodations
- `id` (TEXT, Primary Key) - Auto-generated with "sb-" prefix
- `name` (TEXT)
- `continental` (TEXT)
- `country` (TEXT)
- `destination` (TEXT)
- `category` (TEXT)
- `description` (TEXT)
- `price` (NUMERIC)
- `rating` (NUMERIC)
- `features` (TEXT[])
- `image_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### admin_itineraries
- `id` (TEXT, Primary Key) - Auto-generated with "sb-" prefix
- `name` (TEXT)
- `duration` (TEXT)
- `price` (NUMERIC)
- `category` (TEXT)
- `description` (TEXT)
- `highlights` (TEXT[])
- `includes` (TEXT[])
- `difficulty` (TEXT)
- `group_size` (TEXT)
- `rating` (NUMERIC)
- `image_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## API Endpoints

### Admin Routes (Require Authentication)

**Authentication:**
- POST `/api/admin/login` - Login with email/password

**Blogs:**
- GET `/api/admin/blogs` - Get all admin blogs
- POST `/api/admin/blogs` - Create new blog
- PUT `/api/admin/blogs/:id` - Update blog
- DELETE `/api/admin/blogs/:id` - Delete blog

**Volunteer Programs:**
- GET `/api/admin/volunteer-programs` - Get all admin volunteer programs
- POST `/api/admin/volunteer-programs` - Create new program
- PUT `/api/admin/volunteer-programs/:id` - Update program
- DELETE `/api/admin/volunteer-programs/:id` - Delete program

**Accommodations:**
- GET `/api/admin/accommodations` - Get all admin accommodations
- POST `/api/admin/accommodations` - Create new accommodation
- PUT `/api/admin/accommodations/:id` - Update accommodation
- DELETE `/api/admin/accommodations/:id` - Delete accommodation

**Itineraries:**
- GET `/api/admin/itineraries` - Get all admin itineraries
- POST `/api/admin/itineraries` - Create new itinerary
- PUT `/api/admin/itineraries/:id` - Update itinerary
- DELETE `/api/admin/itineraries/:id` - Delete itinerary

### Public Routes (No Authentication)

- GET `/api/public/blogs` - Get all admin blogs for public display
- GET `/api/public/volunteer-programs` - Get all admin programs for public display
- GET `/api/public/accommodations` - Get all admin accommodations for public display
- GET `/api/public/itineraries` - Get all admin itineraries for public display

## Next Steps

After completing the setup:

1. **Run the SQL script** in Supabase to create tables
2. **Login to the admin dashboard** to verify everything works
3. **Create your first content** to test the system
4. **Check the public pages** to see the merged content display

## Troubleshooting

**Issue: 500 error when accessing admin dashboard**
- Solution: Make sure you've run the SQL script in Supabase to create the tables

**Issue: Login fails**
- Solution: Verify credentials are exactly:
  - Email: `admin@accommodations.guide`
  - Password: `Guide@1961`

**Issue: Content not showing on public pages**
- Solution: The frontend pages need to be updated to fetch and merge Supabase content (coming in next phase)

**Issue: CORS or authentication errors**
- Solution: Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are properly set in environment variables
