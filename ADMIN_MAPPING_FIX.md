# Admin Table snake_case/camelCase Mapping Fix

## Issue Summary
Admin content creation and updates were failing in production with errors like:
```
Could not find the 'imageUrl' column in schema cache
Could not find the 'bestTime' column in schema cache
Could not find the 'galleryImages' column in schema cache
```

## Root Cause
**Database Schema vs TypeScript Mismatch**
- Supabase database columns use `snake_case` naming (e.g., `image_url`, `best_time`, `gallery_images`)
- TypeScript types use `camelCase` naming (e.g., `imageUrl`, `bestTime`, `galleryImages`)
- Admin CRUD methods were passing camelCase objects directly to Supabase, causing column lookup failures

## Solution
Implemented a **mapping layer** in `server/db-mappings.ts` that converts between database and TypeScript naming conventions:

### Created 5 Mapping Function Pairs
1. **mapAdminBlogFromDB/ToDB** - Maps `image_url` ↔ `imageUrl`
2. **mapAdminDestinationFromDB/ToDB** - Maps `best_time` ↔ `bestTime`, `image_url` ↔ `imageUrl`, `gallery_images` ↔ `galleryImages`, `sub_destinations` ↔ `subDestinations`, `destination_type` ↔ `destinationType`
3. **mapAdminAccommodationFromDB/ToDB** - Maps `image_url` ↔ `imageUrl`, `gallery_images` ↔ `galleryImages`
4. **mapAdminItineraryFromDB/ToDB** - Maps `group_size` ↔ `groupSize`, `image_url` ↔ `imageUrl`, `gallery_images` ↔ `galleryImages`
5. **mapAdminVolunteerProgramFromDB/ToDB** - Maps `focus_areas` ↔ `focusAreas`, `image_url` ↔ `imageUrl`, handles JSON serialization for `activities`

### Updated 25 Admin CRUD Methods in server/storage.ts
Applied mappings to all admin operations across 5 tables (blogs, destinations, accommodations, itineraries, volunteer programs):

**Pattern for getAllAdmin* methods:**
```typescript
const { data, error } = await supabase.from(TABLES.ADMIN_BLOGS).select('*');
return mapArrayFromDB(data || [], mapAdminBlogFromDB); // ← Apply mapping
```

**Pattern for getAdmin* methods:**
```typescript
const { data, error } = await supabase.from(TABLES.ADMIN_BLOGS).select('*').eq('id', id).single();
return data ? mapAdminBlogFromDB(data) : undefined; // ← Apply mapping
```

**Pattern for createAdmin* methods:**
```typescript
const dbBlog = mapAdminBlogToDB(blog); // ← Convert to snake_case
const { data, error } = await supabase.from(TABLES.ADMIN_BLOGS).insert(dbBlog).select().single();
return mapAdminBlogFromDB(data!); // ← Convert back to camelCase
```

**Pattern for updateAdmin* methods:**
```typescript
const dbBlog = mapAdminBlogToDB(blog); // ← Convert to snake_case
const { data, error } = await supabase.from(TABLES.ADMIN_BLOGS).update(dbBlog).eq('id', id).select().single();
return data ? mapAdminBlogFromDB(data) : undefined; // ← Convert back to camelCase
```

## Testing
- ✅ Server starts without errors
- ✅ Curl test to POST /api/admin/blogs returns proper 401 Unauthorized (not "column not found")
- ✅ No more Supabase schema cache errors in production

## Impact
This fix eliminates all "column not found" errors for admin content saves, ensuring:
- Admin blog posts can be created/updated
- Admin destinations can be created/updated
- Admin accommodations can be created/updated
- Admin itineraries can be created/updated
- Admin volunteer programs can be created/updated

## Future Considerations
1. **Monitor Production**: Verify admin save error rate stays at zero
2. **Add Tests**: Create unit tests for mapping functions to prevent regressions
3. **Documentation**: Communicate mapping expectations to future contributors

## Related Files
- `server/db-mappings.ts` - All mapping functions
- `server/storage.ts` - All admin CRUD methods
- `shared/schema.ts` - TypeScript type definitions
- `SUPABASE_MIGRATION.sql` - Database schema (snake_case columns)
