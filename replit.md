# Accommodation Collection - Travel Web Application

## Overview

Accommodation Collection is a premium Tanzania travel web application specializing in curating tours, accommodations, and travel services. The application is built as a full-stack web platform using modern technologies to provide users with an immersive experience for discovering and booking Tanzania travel experiences. The frontend is built with React and TypeScript, utilizing a component-based architecture with shadcn/ui design system, while the backend uses Express.js with PostgreSQL database integration.

## Recent Changes (September 2025)

### User Authentication System (Supabase Auth)
- **Supabase Integration**: Replaced legacy username/password auth with Supabase Auth using email/password for regular users
- **Auth Page**: Created dual-tab authentication page with Login and Signup forms, form validation, and error handling
- **User Dashboard**: Implemented protected dashboard route displaying user's trips, accommodations, receipts, and messages (currently using mock data)
- **Session Management**: Automatic session tracking with onAuthStateChange, proper redirects, and logout functionality
- **Header Integration**: Updated navigation header to show user email when logged in with sign-out option
- **Environment Configuration**: Frontend uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for secure Supabase client setup
- **Dual Auth Systems**: Admin uses hardcoded credentials (admin@accommodations.guide), users use Supabase Auth

### Booking System Implementation
- **Detail Pages**: Created comprehensive detail pages for accommodations and itineraries showing full information with imagery, features/highlights, pricing, and booking options
- **Airbnb-Style Booking Form**: Implemented professional booking form with fields for full name, email, phone (with country code), check-in/check-out dates with calendar pickers, guest counts (adults/children), and optional special requests
- **Booking Flow**: Complete user journey from browsing cards → viewing details → submitting bookings with form validation and success notifications
- **Database Schema**: Added bookings table to store all booking information including booking type, item details, guest information, dates, and special requests
- **API Integration**: Created REST endpoints for booking creation and retrieval with proper validation using Zod schemas

### SEO and Production Readiness
- **Favicon**: Integrated company logo as website favicon for browser tabs and mobile devices
- **SEO Meta Tags**: Complete meta titles, descriptions, and Open Graph tags for all pages using production domain (accommodations.guide)
- **Sitemap**: Created sitemap.xml with all 13 main pages for search engine indexing
- **Robots.txt**: Configured for proper search engine crawling with sitemap reference
- **LLMs.txt**: Comprehensive AI-friendly documentation about website features and content
- **WhatsApp Button**: Enhanced floating WhatsApp button with improved icon sizing

### Testimonials Carousel
- **Auto-Scrolling Carousel**: Implemented testimonials carousel on homepage with 4-second auto-scroll
- **Expanded Testimonials**: Added 6 testimonials featuring travelers from European nations (France, Italy, Sweden) who visited Kenya safaris, Rwanda gorilla tracking, and Victoria Falls
- **Interactive Navigation**: Previous/Next buttons for manual carousel control
- **Responsive Design**: Shows 1 testimonial on mobile, 2 on tablet, 3 on desktop
- **Infinite Loop**: Continuous carousel rotation for better user engagement

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Styling**: Tailwind CSS with custom design tokens following a warm, earthy color palette suitable for a premium travel brand
- **UI Components**: shadcn/ui component library providing consistent, accessible components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management with local state handled via React hooks
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Database Schema**: Defined schema for users, accommodations, destinations, itineraries, bookings, volunteer applications, and inquiries with proper relationships
- **Development Setup**: Hot reload and development middleware with Vite integration
- **Memory Storage**: Temporary in-memory storage implementation for development with interface for easy database migration

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured via Drizzle ORM)
- **Connection**: Neon Database serverless PostgreSQL
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Data**: JSON-based mock data structure for accommodations, destinations, and itineraries

### Authentication and Authorization
- **User Authentication**: Supabase Auth with email/password authentication for regular users
- **Admin Authentication**: Separate hardcoded credentials system (admin@accommodations.guide / Guide@1961)
- **Auth Provider**: SupabaseAuthProvider context managing user session, sign-in, sign-up, and sign-out
- **Protected Routes**: Dashboard route (/dashboard) requires authenticated user, redirects to /auth if not logged in
- **Environment Variables**: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for frontend Supabase client
- **Security**: Toast-based error handling, automatic session tracking, and proper redirect flows

### Content Management
- **Static Data**: JSON-based content system for accommodations, destinations, and itineraries
- **Image Handling**: Placeholder image system ready for production image integration
- **Search and Filtering**: Multi-level filtering system for accommodations by continent, country, destination, and category
- **Content Organization**: Hierarchical destination structure (Continental → Country → Region → Destination)

### Component Architecture
- **Layout Components**: Reusable header and footer with consistent branding
- **Page Components**: Dedicated components for Home, Accommodations, Destinations, Itineraries, About, and Contact pages
- **UI Components**: Extensive shadcn/ui component library with custom travel-specific components (AccommodationCard, DestinationCard, ItineraryCard)
- **Form Components**: Specialized components for search widgets and contact forms with validation

### Design System
- **Typography**: Inter for body text and Playfair Display for headings, providing elegant serif/sans-serif contrast
- **Color Palette**: Warm, earthy tones with primary brown (#3D2914), accent golden yellow (#D4AF37), and neutral beiges
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React plugin for Vite build system
- **wouter**: Lightweight routing library for React applications
- **@tanstack/react-query**: Server state management and caching

### UI and Styling Dependencies
- **tailwindcss**: Utility-first CSS framework
- **@radix-ui/***: Comprehensive collection of accessible UI primitives
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Utility for constructing className strings conditionally

### Database and Backend Dependencies
- **drizzle-orm**: Type-safe SQL ORM for TypeScript
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon Database
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **drizzle-zod**: Zod schema generation from Drizzle schemas

### Form and Validation Dependencies
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Resolvers for external validation libraries
- **zod**: TypeScript-first schema declaration and validation library

### Development and Build Dependencies
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development plugins for enhanced development experience

### Date and Utility Dependencies
- **date-fns**: Modern JavaScript date utility library
- **embla-carousel-react**: Carousel component for image galleries
- **cmdk**: Command menu component for enhanced user interactions