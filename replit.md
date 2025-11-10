# Accommodation Collection - Travel Web Application

## Overview
Accommodation Collection is a premium Tanzania travel web application designed to curate tours, accommodations, and travel services. It aims to provide users with an immersive experience for discovering and booking travel experiences in Tanzania, with a future vision to expand to broader African destinations. The platform supports dual-source content (admin-managed and hardcoded), comprehensive booking functionalities, and an integrated content management system.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite.
- **Styling**: Tailwind CSS with custom design tokens, emphasizing a warm, earthy color palette.
- **UI Components**: shadcn/ui for consistent, accessible components.
- **Routing**: Wouter for lightweight client-side routing.
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

### Backend Architecture
- **Server Framework**: Express.js with TypeScript.
- **Database ORM**: Drizzle ORM for PostgreSQL.
- **Database Schema**: Defined for users, accommodations, destinations, itineraries, bookings, volunteer applications, and inquiries.
- **Content Management**: Dual-source architecture merging admin-created Supabase content with hardcoded JSON data, unified via `/api/public/*` endpoints.
- **Image Management**: Cloudinary integration for single and multiple image uploads within the admin CMS.
- **Data Mapping**: `server/db-mappings.ts` handles `snake_case` (DB) to `camelCase` (TypeScript) conversion for admin CRUD operations.

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Supabase.
- **Schema Management**: Direct SQL migrations (`SUPABASE_MIGRATION.sql`, `SUPABASE_SEED.sql`).

### Authentication and Authorization
- **User Authentication**: Supabase Auth with email/password.
- **Admin Authentication**: Separate hardcoded credentials (`admin@accommodations.guide`).
- **Session Management**: SupabaseAuthProvider context for user sessions and protected routes.

### Content Management System (CMS)
- **Admin Dashboard**: Features 5 tabs for managing Accommodations, Destinations, Blogs, Volunteer Programs, and Itineraries.
- **CRUD Operations**: Comprehensive forms for all content types, including rich text editing and image uploads via Cloudinary.
- **Form Validation**: Zod schemas used for robust input validation.

### System Design Choices
- **SEO & Production Readiness**: Implemented SEO meta tags, `sitemap.xml`, `robots.txt`, and `LLMs.txt`.
- **Booking System**: Airbnb-style booking forms with calendar pickers, guest counts, and special requests, integrated with a `bookings` table.

## External Dependencies
- **Core Framework**: `@vitejs/plugin-react`, `wouter`, `@tanstack/react-query`.
- **UI & Styling**: `tailwindcss`, `@radix-ui/*`, `class-variance-authority`, `clsx`.
- **Database**: `drizzle-orm`, `@neondatabase/serverless`, `connect-pg-simple`, `drizzle-zod`.
- **Form & Validation**: `react-hook-form`, `@hookform/resolvers`, `zod`.
- **Development**: `tsx`, `esbuild`, `@replit/vite-plugin-*`.
- **Utilities**: `date-fns`, `embla-carousel-react`, `cmdk`.
- **Cloud Services**: Cloudinary (image storage), Supabase (database, authentication).