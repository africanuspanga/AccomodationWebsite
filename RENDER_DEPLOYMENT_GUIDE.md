# Complete Render Deployment Guide
## Accommodation Collection Website

This guide covers deploying your Supabase-powered travel website to Render with Cloudinary image uploads.

---

## 🚀 Quick Deployment Checklist

- [ ] Supabase project created and seeded
- [ ] Cloudinary account configured
- [ ] Render web service created
- [ ] All 8 environment variables configured
- [ ] Build and deploy successful
- [ ] Image uploads tested in production

---

## Part 1: Supabase Setup (Database)

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and project name
4. Set a strong database password
5. Select region (choose closest to your users)
6. Click "Create new project"

### 1.2 Run Migration SQL
1. Wait for project to finish setting up
2. Go to "SQL Editor" in left sidebar
3. Click "New query"
4. Copy entire contents of `SUPABASE_MIGRATION.sql`
5. Paste and click "Run"
6. Verify success: "Query returned successfully"

### 1.3 Seed Database with Content
1. In SQL Editor, click "New query" again
2. Copy entire contents of `SUPABASE_SEED.sql`
3. Paste and click "Run"
4. Verify output shows:
   ```
   Accommodations: 10
   Destinations: 16
   Itineraries: 12
   ```

### 1.4 Get Supabase Credentials
1. Go to Project Settings (gear icon)
2. Click "API" in left menu
3. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **service_role key**: Long string starting with `eyJ...`
   - **anon key**: Another long string starting with `eyJ...`

⚠️ **IMPORTANT**: Use `service_role` key for backend, NOT `anon` key

---

## Part 2: Cloudinary Setup (Image Storage)

### 2.1 Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Verify your email

### 2.2 Get Cloudinary Credentials
1. Go to Dashboard (automatically shown after login)
2. Copy these values:
   - **Cloud Name**: Short alphanumeric string
   - **API Key**: Numeric string
   - **API Secret**: Alphanumeric string (click "eye" icon to reveal)

### 2.3 Create Upload Preset
1. Go to Settings (gear icon) → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Configure preset:
   - **Preset name**: `accommodation-uploads` (or your choice)
   - **Signing Mode**: Select "Signed"
   - **Folder**: `accommodation-collection` (optional, organizes images)
   - **Allowed formats**: jpg, png, webp
   - **Max file size**: 10 MB
5. Click "Save"
6. Copy the **preset name** (you'll need this)

---

## Part 3: Render Deployment

### 3.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up (can use GitHub account)
3. Verify your email

### 3.2 Connect GitHub Repository
1. Push your code to GitHub
2. In Render dashboard, click "New +"
3. Select "Web Service"
4. Click "Connect GitHub"
5. Authorize Render to access your repository
6. Select your repository

### 3.3 Configure Web Service
**Basic Settings:**
- **Name**: `accommodation-collection` (or your choice)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave blank
- **Runtime**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Instance Type:**
- Select "Free" for testing or "Starter" for production

### 3.4 Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these **8 environment variables** (critical for production):

| Variable Name | Value | Where to Get It |
|---------------|-------|-----------------|
| `NODE_ENV` | `production` | Type manually |
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | From Supabase API settings |
| `SUPABASE_SERVICE_KEY` | `eyJ...` | From Supabase API settings (service_role) |
| `VITE_SUPABASE_URL` | Same as SUPABASE_URL | Same value as above |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | From Supabase API settings (anon) |
| `CLOUDINARY_CLOUD_NAME` | Your cloud name | From Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Your API key | From Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Your API secret | From Cloudinary Dashboard |
| `CLOUDINARY_UPLOAD_PRESET` | `accommodation-uploads` | From Cloudinary Upload preset you created |

⚠️ **Common Mistakes to Avoid:**
- Using `anon` key instead of `service_role` for SUPABASE_SERVICE_KEY
- Forgetting to add `VITE_` prefix for frontend variables
- Using wrong upload preset name
- Not setting `NODE_ENV=production`

### 3.5 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Watch build logs for errors
4. Once deployed, you'll get a URL like `https://accommodation-collection.onrender.com`

---

## Part 4: Testing Production Deployment

### 4.1 Test Website Loads
1. Visit your Render URL
2. Check homepage loads correctly
3. Navigate to Accommodations, Destinations, Itineraries
4. Verify content from database displays

### 4.2 Test Admin Image Upload (Critical!)

**Why Admin Uploads Fail in Production:**
Admin image uploads fail when Cloudinary environment variables aren't set correctly in Render.

**Test Steps:**
1. Navigate to `/admin` on your production site
2. Login with: `admin@accommodations.guide` / `Guide@1961`
3. Click "Accommodations" tab
4. Click "Add Accommodation"
5. Try uploading an image
6. **Expected Result**: Image uploads successfully
7. **If it fails**: See troubleshooting below

### 4.3 Test Database Operations
1. Still in admin panel, fill out accommodation form
2. Add name, location, category, price, etc.
3. Click "Save"
4. Verify new accommodation appears in list
5. Visit `/accommodations` page
6. Verify new item shows up

---

## Part 5: Troubleshooting

### Issue: "Failed to get upload signature"

**Symptoms:**
- Image upload button doesn't work
- Console shows error: `Failed to get upload signature`

**Solution:**
1. Go to Render dashboard
2. Select your web service
3. Go to "Environment" tab
4. Verify these 4 Cloudinary variables exist:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - CLOUDINARY_UPLOAD_PRESET
5. If missing, add them and redeploy
6. Check they match exactly with Cloudinary dashboard values

### Issue: "Invalid signature" or "Unauthorized"

**Symptoms:**
- Upload starts but fails
- Cloudinary returns 401 error

**Solution:**
1. Check `CLOUDINARY_API_SECRET` is correct
2. Check `CLOUDINARY_UPLOAD_PRESET` name matches exactly
3. Verify preset is set to "Signed" mode in Cloudinary settings
4. Regenerate API secret in Cloudinary if needed

### Issue: "Database operation failed"

**Symptoms:**
- Can't save accommodations
- Error mentions database or Supabase

**Solution:**
1. Verify `SUPABASE_URL` is correct
2. Check you're using `service_role` key, NOT `anon` key for SUPABASE_SERVICE_KEY
3. Test Supabase connection:
   ```bash
   curl -X GET "YOUR_SUPABASE_URL/rest/v1/accommodations" \
     -H "apikey: YOUR_SERVICE_ROLE_KEY" \
     -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY"
   ```

### Issue: Build Fails on Render

**Symptoms:**
- Deployment fails during build
- Error about missing dependencies

**Solution:**
1. Check build logs for specific error
2. Verify `package.json` has all dependencies
3. Try manual deploy trigger
4. Check Node version (should be 20.x)

### Issue: Images Don't Display

**Symptoms:**
- Upload succeeds but images don't show
- Broken image icon

**Solution:**
1. Check image URL in database (should be `https://res.cloudinary.com/...`)
2. Verify Cloudinary URL is public
3. Check browser console for CORS errors
4. Verify image URL is saved correctly in Supabase

---

## Part 6: Custom Domain Setup (Optional)

### 6.1 Add Custom Domain
1. In Render dashboard, go to your web service
2. Click "Settings"
3. Scroll to "Custom Domains"
4. Click "Add Custom Domain"
5. Enter your domain: `www.yourdomain.com`

### 6.2 Configure DNS
1. Go to your domain registrar
2. Add CNAME record:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: Your Render URL
   - **TTL**: 3600
3. Wait 5-60 minutes for DNS propagation
4. Render will automatically provision SSL certificate

---

## Part 7: Environment Variables Reference

### Complete List (8 Required)

```env
# Node Environment
NODE_ENV=production

# Supabase Database (Backend)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...your-service-role-key

# Supabase Database (Frontend)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key

# Cloudinary Image Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbC123DeFgHiJkLmNoPqRsTuVwXyZ
CLOUDINARY_UPLOAD_PRESET=accommodation-uploads
```

### What Each Variable Does

| Variable | Purpose | Used By |
|----------|---------|---------|
| NODE_ENV | Enables production mode | Server |
| SUPABASE_URL | Database connection | Backend API |
| SUPABASE_SERVICE_KEY | Admin database access | Backend API |
| VITE_SUPABASE_URL | Database connection | Frontend |
| VITE_SUPABASE_ANON_KEY | Public database access | Frontend |
| CLOUDINARY_CLOUD_NAME | Image storage account | Image uploads |
| CLOUDINARY_API_KEY | Cloudinary authentication | Image uploads |
| CLOUDINARY_API_SECRET | Upload signature | Image uploads |
| CLOUDINARY_UPLOAD_PRESET | Upload configuration | Image uploads |

---

## Part 8: How Image Upload Works

### Upload Flow
1. **Admin uploads image** in browser
2. **Frontend** calls `/api/cloudinary/signature` endpoint
3. **Backend** generates signed upload signature using API secret
4. **Frontend** uploads image to Cloudinary with signature
5. **Cloudinary** returns secure image URL
6. **Frontend** saves URL to database via Supabase
7. **Website** displays image from Cloudinary URL

### Why It Can Fail in Production
- **Missing env vars**: Cloudinary credentials not in Render
- **Wrong API secret**: Signature validation fails
- **Wrong preset**: Cloudinary rejects upload
- **CORS issues**: Browser blocks cross-origin upload
- **Database fails**: Can't save URL after upload succeeds

---

## Part 9: Monitoring & Maintenance

### Check Application Logs
1. Go to Render dashboard
2. Select your web service
3. Click "Logs" tab
4. Look for errors or warnings

### Monitor Cloudinary Usage
1. Go to Cloudinary dashboard
2. Check "Usage" tab
3. Free tier: 25 GB storage, 25 GB bandwidth/month
4. Upgrade if you exceed limits

### Monitor Supabase Usage
1. Go to Supabase dashboard
2. Check "Database" → "Usage"
3. Free tier: 500 MB database, 2 GB bandwidth
4. Upgrade to Pro if needed

---

## Part 10: Production Checklist

Before going live:
- [ ] All 8 environment variables set in Render
- [ ] Supabase database seeded with content
- [ ] Cloudinary upload preset created and tested
- [ ] Admin login works (`admin@accommodations.guide` / `Guide@1961`)
- [ ] Image uploads work in admin panel
- [ ] New accommodations/destinations/itineraries save correctly
- [ ] Public pages load and display content
- [ ] Images display correctly from Cloudinary
- [ ] Custom domain configured (if using)
- [ ] SSL certificate active (automatic on Render)
- [ ] Error monitoring enabled

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Cloudinary Docs**: https://cloudinary.com/documentation

---

## Common Production URLs

- **Admin Panel**: `https://your-site.onrender.com/admin`
- **API Health**: `https://your-site.onrender.com/api/public/accommodations`
- **Supabase Dashboard**: `https://app.supabase.com/project/your-project-id`
- **Cloudinary Media Library**: `https://console.cloudinary.com/console/media_library`

---

**Deployment Complete!** 🎉

Your Accommodation Collection website is now live with:
- ✅ Supabase PostgreSQL database
- ✅ Cloudinary image storage and URLs
- ✅ Admin content management system
- ✅ Production-ready on Render
