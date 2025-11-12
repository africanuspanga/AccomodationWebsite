# Accommodation Collection - Travel Web Application

## Overview
Accommodation Collection is a premium Tanzania travel web application designed to curate tours, accommodations, and travel services. It aims to provide users with an immersive experience for discovering and booking travel experiences in Tanzania, with a future vision to expand to broader African destinations. The platform supports dual-source content (admin-managed and hardcoded), comprehensive booking functionalities, and an integrated content management system.

## Recent Changes (November 12, 2025)
- **Slug-Based URLs**: Implemented SEO-friendly slug-based URLs for accommodations (e.g., `/accommodations/four-seasons-abc123` instead of `/accommodations/1`)
- **Room Types & Pricing**: Added support for multiple room types with individual pricing for each accommodation
- **Terms & Conditions**: Added terms and conditions field and display tab for accommodations
- **Category Badge Visibility**: Enhanced category badges on listing pages with solid colors (ultra-luxury: gold, luxury: blue, mid-range: green) for better visibility
- **Collision-Aware Slug Generation**: Auto-generates unique slugs using random suffixes to prevent duplicate slug conflicts
- **Admin CMS Enhancements**: Updated admin accommodation form with room types management, terms & conditions textarea, and optional slug field for manual override

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite.
- **Styling**: Tailwind CSS with custom design tokens, emphasizing a warm, earthy color palette.
- **UI Components**: shadcn/ui for consistent, accessible components.
- **Routing**: Wouter for lightweight client-side routing with slug-based URLs for SEO optimization.
- **State Management**: React Query for server state; React hooks for local state.
- **Form Handling**: React Hook Form with Zod validation.
- **UI/UX Decisions**:
    - Mobile-first responsive design.
    - Inter (body) and Playfair Display (headings) typography.
    - Global scroll-to-top on page navigation.
    - Floating WhatsApp button for direct communication.
    - Cascading search filters (Continent → Country → Destination), defaulting to Africa → Tanzania.
    - Testimonials carousel with auto-scroll and responsive display.
    - Professional branding with custom company logo.
    - Enhanced category badges with high-visibility solid colors on listing pages.
    - Room types and pricing display on accommodation detail pages.
    - Terms & Conditions tab on accommodation detail pages.

### Backend Architecture
- **Server Framework**: Express.js with TypeScript.
- **Database ORM**: Drizzle ORM for PostgreSQL.
- **Database Schema**: Defined for users, accommodations, destinations, itineraries, bookings, volunteer applications, and inquiries.
- **Content Management**: Dual-source architecture merging admin-created Supabase content with hardcoded JSON data, unified via `/api/public/*` endpoints.
- **Image Management**: Cloudinary integration for single and multiple image uploads within the admin CMS.
- **Data Mapping**: `server/db-mappings.ts` handles `snake_case` (DB) to `camelCase` (TypeScript) conversion for admin CRUD operations.
- **Slug Generation**: `server/utils/slug.ts` provides collision-aware slug generation with unique random suffixes to prevent duplicate URL conflicts.
- **Room Types Storage**: Room types stored as JSON strings in database, automatically parsed/stringified in mapping functions.

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Supabase.
- **Schema Management**: Direct SQL migrations (`SUPABASE_MIGRATION.sql`, `SUPABASE_SEED.sql`).
- **Recent Migrations**:
  - `SUPABASE_ACCOMMODATION_UPDATE.sql`: Adds slug (with unique index), room_types (TEXT/JSON), and terms_and_conditions columns to accommodations table.
  - `BACKFILL_ACCOMMODATION_SLUGS.sql`: Generates slugs for existing accommodations without slugs.

### Authentication and Authorization
- **User Authentication**: Supabase Auth with email/password.
- **Admin Authentication**: Separate hardcoded credentials (`admin@accommodations.guide`).
- **Session Management**: SupabaseAuthProvider context for user sessions and protected routes.

### Content Management System (CMS)
- **Admin Dashboard**: Features 5 tabs for managing Accommodations, Destinations, Blogs, Volunteer Programs, and Itineraries.
- **CRUD Operations**: Comprehensive forms for all content types, including rich text editing and image uploads via Cloudinary.
- **Form Validation**: Zod schemas used for robust input validation.
- **Accommodation Form Features**:
  - Dynamic room types management (add/remove room types with pricing)
  - Terms & Conditions textarea for accommodation-specific policies
  - Optional slug field for manual URL customization (auto-generated if left empty)
  - Single and multiple image uploads via Cloudinary

### System Design Choices
- **SEO & Production Readiness**: 
  - SEO meta tags with slug-based canonical URLs
  - `sitemap.xml`, `robots.txt`, and `LLMs.txt`
  - Slug-based URLs for accommodations (e.g., `/accommodations/four-seasons-safari-lodge-abc123`)
  - SEO canonical URLs prefer slug over ID when available
- **Booking System**: Airbnb-style booking forms with calendar pickers, guest counts, and special requests, integrated with a `bookings` table.
- **Data Safety**: 
  - Collision-aware slug generation prevents duplicate URL conflicts
  - Room types safely stored as JSON strings with try-catch parsing
  - Backward compatibility maintained for ID-based accommodation URLs

## External Dependencies
- **Core Framework**: `@vitejs/plugin-react`, `wouter`, `@tanstack/react-query`.
- **UI & Styling**: `tailwindcss`, `@radix-ui/*`, `class-variance-authority`, `clsx`.
- **Database**: `drizzle-orm`, `@neondatabase/serverless`, `connect-pg-simple`, `drizzle-zod`.
- **Form & Validation**: `react-hook-form`, `@hookform/resolvers`, `zod`.
- **Development**: `tsx`, `esbuild`, `@replit/vite-plugin-*`.
- **Utilities**: `date-fns`, `embla-carousel-react`, `cmdk`.
- **Cloud Services**: Cloudinary (image storage), Supabase (database, authentication).