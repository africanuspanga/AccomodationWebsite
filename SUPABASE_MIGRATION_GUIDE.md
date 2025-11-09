# Complete Migration Guide: Neon + Drizzle → Supabase Only

## Overview
This guide will help you migrate from Neon Database + Drizzle ORM to pure Supabase PostgreSQL (no Drizzle). All the necessary files have been created for you.

---

## 📋 Migration Checklist

- [ ] Step 1: Run SQL migration script in Supabase
- [ ] Step 2: Get Supabase credentials
- [ ] Step 3: Update environment variables
- [ ] Step 4: Swap to Supabase code files
- [ ] Step 5: Seed the database (optional)
- [ ] Step 6: Test the application
- [ ] Step 7: Clean up old files

---

## Step 1: Run SQL Migration in Supabase

### 1.1 Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"

### 1.2 Run the Migration Script
1. Open the file `SUPABASE_MIGRATION.sql` in this project
2. Copy ALL the content
3. Paste it into the Supabase SQL Editor
4. Click "Run" button

**Expected Result:** You should see output showing all tables were created successfully.

### 1.3 Verify Tables Were Created
Run this query in Supabase SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see 15 tables:
- users
- accommodations
- destinations
- itineraries
- inquiries
- volunteer_applications
- bookings
- admin_blogs
- admin_volunteer_programs
- admin_accommodations
- admin_itineraries
- admin_destinations
- destination_details
- itinerary_details
- accommodation_details

---

## Step 2: Get Supabase Credentials

### 2.1 Find Your Supabase URL
1. Go to your Supabase project settings (gear icon)
2. Click "API" in the left menu
3. Copy the "Project URL" (looks like `https://xxxxx.supabase.co`)

### 2.2 Find Your Service Role Key
1. In the same "API" settings page
2. Scroll down to "Project API keys"
3. Copy the `service_role` key (NOT the `anon` key)
4. **⚠️ IMPORTANT:** Keep this key secret - it bypasses all security rules

---

## Step 3: Update Environment Variables

### 3.1 Add Supabase Variables
Add these to your Replit Secrets (or `.env` file):

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

**Replace:**
- `https://your-project-id.supabase.co` with your actual Supabase URL from Step 2.1
- `your-service-role-key-here` with your actual service role key from Step 2.2

### 3.2 Keep Existing Supabase Auth Variables
Your existing frontend Supabase variables should remain:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 4: Swap to Supabase Code Files

### 4.1 Replace Schema File
**Backup old file:**
```bash
mv shared/schema.ts shared/schema-drizzle-backup.ts
```

**Activate new file:**
```bash
mv shared/schema-supabase.ts shared/schema.ts
```

### 4.2 Replace Database Client
**Backup old file:**
```bash
mv server/db.ts server/db-neon-backup.ts
```

**Activate new file:**
```bash
mv server/db-supabase.ts server/db.ts
```

### 4.3 Replace Storage Layer
**Backup old file:**
```bash
mv server/storage.ts server/storage-drizzle-backup.ts
```

**Activate new file:**
```bash
mv server/storage-supabase.ts server/storage.ts
```

### 4.4 Update Package Dependencies (Optional)
You can optionally remove Drizzle and Neon packages:
```bash
npm uninstall drizzle-orm drizzle-kit @neondatabase/serverless drizzle-zod
npm install
```

**Note:** If you want to keep the old packages temporarily for reference, you can skip this step.

---

## Step 5: Seed the Database (Recommended)

To populate your database with initial content (10 accommodations, 16 destinations, 12 itineraries):

### Run the Seed SQL Script

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

2. **Run the Seed Script**
   - Open the file `SUPABASE_SEED.sql` in this project
   - Copy ALL the content
   - Paste it into the Supabase SQL Editor
   - Click "Run" button

3. **Verify Data Was Inserted**
   You should see output showing:
   ```
   Accommodations: 10
   Destinations: 16
   Itineraries: 12
   ```

4. **Check in Table Editor (Optional)**
   - Go to "Table Editor" in Supabase
   - Select `accommodations`, `destinations`, or `itineraries` table
   - You should see all the records with proper data

**What Gets Loaded:**
- ✅ 10 luxury accommodations (Four Seasons, Singita, Park Hyatt, etc.)
- ✅ 16 destinations (Serengeti, Zanzibar, Kilimanjaro, Kenya, Rwanda, Uganda, etc.)
- ✅ 12 safari and trekking itineraries
- ✅ All with proper images from `/attached_assets/`
- ✅ All with correct prices, ratings, and features

**Alternative: Skip Seeding**
You can skip this step and create content later through the admin interface. However, running the seed script gives you a fully populated site immediately.

---

## Step 6: Test the Application

### 6.1 Restart the Application
Click the "Restart" button in Replit or restart your development server.

### 6.2 Check for Errors
Look for any errors in the console. If you see:
- ✅ "serving on port 5000" - Database connection successful
- ❌ "SUPABASE_URL must be set" - Environment variables not configured (go back to Step 3)
- ❌ "Database operation failed" - Check your Supabase credentials

### 6.3 Test CRUD Operations
Try these operations to verify everything works:

1. **Create Test Inquiry** - Submit the contact form
2. **View Accommodations** - Navigate to /accommodations page
3. **Admin Login** - Try logging into admin panel (if you've created an admin user)

### 6.4 Verify Database Writes
In Supabase dashboard:
1. Go to "Table Editor"
2. Select a table (e.g., `inquiries`)
3. You should see any data you created through the app

---

## Step 7: Clean Up Old Files (Optional)

Once everything is working perfectly, you can remove old files:

### 7.1 Remove Backup Files
```bash
rm shared/schema-drizzle-backup.ts
rm server/db-neon-backup.ts
rm server/storage-drizzle-backup.ts
```

### 7.2 Remove Drizzle Configuration
```bash
rm drizzle.config.ts
rm -rf migrations/
```

### 7.3 Remove Old Seed Script (Optional)
```bash
rm server/seed.ts
```

---

## 🎯 Quick Reference: What Changed

| Component | Old (Drizzle + Neon) | New (Supabase Only) |
|-----------|---------------------|---------------------|
| **Schema** | `shared/schema.ts` (pgTable definitions) | `shared/schema.ts` (TS interfaces + Zod) |
| **Database Client** | `server/db.ts` (Neon Pool + Drizzle) | `server/db.ts` (Supabase client) |
| **Storage Layer** | `server/storage.ts` (Drizzle queries) | `server/storage.ts` (Supabase operations) |
| **Database** | Neon PostgreSQL | Supabase PostgreSQL |
| **ORM** | Drizzle ORM | None (direct Supabase client) |
| **Env Variables** | `DATABASE_URL` | `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` |

---

## 🔧 Troubleshooting

### Error: "SUPABASE_URL must be set"
**Solution:** Add `SUPABASE_URL` to your environment variables (Step 3)

### Error: "SUPABASE_SERVICE_KEY must be set"
**Solution:** Add `SUPABASE_SERVICE_KEY` to your environment variables (Step 3)

### Error: "relation does not exist"
**Solution:** Run the migration script in Supabase SQL Editor (Step 1)

### Error: "insert or update on table violates foreign key constraint"
**Solution:** Make sure you're using the correct table name format (snake_case in database, camelCase in code)

### Data not showing up on frontend
**Solution:** 
1. Check if data exists in Supabase Table Editor
2. Verify API endpoints are returning data (check Network tab in browser)
3. Make sure content merging logic is still working (admin + hardcoded content)

### Session/Authentication not working
**Solution:** The session store still uses MemoryStore. This is intentional and doesn't depend on the database migration. Supabase Auth is separate from this migration.

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for frontend errors
2. Check the server logs for backend errors
3. Verify all environment variables are set correctly
4. Check Supabase Table Editor to see if tables exist
5. Test SQL queries directly in Supabase SQL Editor

---

## ✅ Migration Complete!

Once all steps are complete and tests pass, your application is now running on **Supabase only** with no Drizzle ORM or Neon Database dependencies!

**Key Benefits:**
- ✅ Single database provider (Supabase)
- ✅ Simpler codebase (no ORM layer)
- ✅ Direct SQL queries (easier to understand and debug)
- ✅ Better integration with Supabase features (Auth, Storage, etc.)
- ✅ SQL scripts you can run and manage yourself

---

## 🚀 Next Steps

1. **Create Admin User:** Add an admin user to the `users` table via Supabase SQL Editor
2. **Seed Content:** Populate your database with accommodations, destinations, and itineraries
3. **Test All Features:** Go through the entire application and test all CRUD operations
4. **Deploy:** Once everything works locally, deploy to production

Enjoy your Supabase-powered application! 🎉
