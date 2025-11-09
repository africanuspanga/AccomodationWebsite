import { z } from "zod";

// =============================================
// PURE TYPESCRIPT INTERFACES
// (No Drizzle dependencies)
// =============================================

// Users
export interface User {
  id: string;
  username: string;
  password: string;
}

export interface PublicUser {
  id: string;
  username: string;
}

// Accommodations
export interface Accommodation {
  id: string;
  name: string;
  continental: string;
  country: string;
  destination: string;
  category: string;
  description: string;
  price: number | null;
  rating: number | null;
  imageUrl: string | null;
  features: string[] | null;
}

// Destinations
export interface Destination {
  id: string;
  name: string;
  continental: string;
  country: string;
  region: string;
  description: string;
  highlights: string[] | null;
  bestTime: string | null;
  imageUrl: string | null;
}

// Itineraries
export interface Itinerary {
  id: string;
  name: string;
  duration: string;
  price: number;
  category: string;
  description: string;
  highlights: string[] | null;
  includes: string[] | null;
  difficulty: string | null;
  groupSize: string | null;
  rating: number | null;
  imageUrl: string | null;
}

// Inquiries
export interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  arrivalDate: string | null;
  departureDate: string | null;
  adults: number | null;
  children: number | null;
  message: string;
  createdAt: string | null;
}

// Volunteer Applications
export interface VolunteerApplication {
  id: string;
  programId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  fullAddress: string;
  country: string;
  telephone: string;
  mobile: string;
  email: string;
  nationality: string;
  passportNumber: string;
  educationProfession: string;
  language: string;
  workingExperience: string;
  howFoundUs: string;
  expectedArrivalDate: string;
  volunteerDuration: string;
  dietaryRestrictions: boolean | null;
  dietaryDetails: string | null;
  excursions: string[] | null;
  emergencyContactName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  emergencyEmail: string;
  createdAt: string | null;
}

// Bookings
export interface Booking {
  id: string;
  bookingType: string;
  itemId: string;
  itemName: string;
  fullName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  specialRequests: string | null;
  createdAt: string | null;
}

// Admin Blogs
export interface AdminBlog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string | null;
  createdAt: string | null;
}

// Admin Volunteer Programs
export interface AdminVolunteerProgram {
  id: string;
  title: string;
  location: string;
  country: string;
  flag: string;
  minAge: string;
  duration: string;
  cost: string;
  focusAreas: string[];
  image: string;
  description: string;
  fullExplanation: string;
  activities: string; // JSON stringified
  highlights: string[];
  createdAt: string | null;
}

// Admin Accommodations
export interface AdminAccommodation {
  id: string;
  name: string;
  continental: string;
  country: string;
  destination: string;
  category: string;
  description: string;
  price: number;
  rating: number | null;
  features: string[];
  imageUrl: string | null;
  galleryImages: string[] | null;
  createdAt: string | null;
}

// Admin Itineraries
export interface AdminItinerary {
  id: string;
  name: string;
  duration: string;
  price: number;
  category: string;
  description: string;
  highlights: string[];
  includes: string[];
  difficulty: string | null;
  groupSize: string | null;
  rating: number | null;
  imageUrl: string | null;
  galleryImages: string[] | null;
  createdAt: string | null;
}

// Admin Destinations
export interface AdminDestination {
  id: string;
  name: string;
  continental: string;
  country: string;
  region: string | null;
  destinationType: string;
  description: string;
  highlights: string[] | null;
  bestTime: string | null;
  imageUrl: string | null;
  galleryImages: string[] | null;
  subDestinations: string[] | null;
  createdAt: string | null;
}

// Destination Details
export interface DestinationDetail {
  id: string;
  destinationId: string;
  detailedDescription: string;
  overview: string | null;
  wildlife: string | null;
  activities: string | null;
  bestTimeToVisit: string | null;
  gettingThere: string | null;
  accommodation: string | null;
  practicalInfo: string | null;
  imageUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

// Itinerary Details
export interface ItineraryDetail {
  id: string;
  itineraryId: string;
  whatsIncluded: string[] | null;
  whatsNotIncluded: string[] | null;
  whatToBring: string[] | null;
  itineraryOverview: string | null;
  dayByDay: string | null; // JSON stringified
  pricingData: string | null; // JSON stringified
  mapImageUrl: string | null;
  tourHighlights: string[] | null;
  createdAt: string | null;
  updatedAt: string | null;
}

// Accommodation Details
export interface AccommodationDetail {
  id: string;
  accommodationId: string;
  facilities: string[] | null;
  rooms: string | null; // JSON stringified
  galleryImages: string[] | null;
  createdAt: string | null;
  updatedAt: string | null;
}

// =============================================
// ZOD SCHEMAS FOR VALIDATION
// =============================================

// User schemas
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

// Accommodation schemas
export const insertAccommodationSchema = z.object({
  name: z.string().min(1),
  continental: z.string().min(1),
  country: z.string().min(1),
  destination: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nullable().optional(),
  rating: z.number().min(1).max(5).nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
});

export const accommodationSchema = z.object({
  id: z.string(),
  name: z.string(),
  continental: z.string(),
  country: z.string(),
  destination: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number().nullable(),
  rating: z.number().nullable(),
  imageUrl: z.string().nullable(),
  features: z.array(z.string()).nullable(),
});

// Destination schemas
export const insertDestinationSchema = z.object({
  name: z.string().min(1),
  continental: z.string().min(1),
  country: z.string().min(1),
  region: z.string().min(1),
  description: z.string().min(1),
  highlights: z.array(z.string()).nullable().optional(),
  bestTime: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
});

export const destinationSchema = z.object({
  id: z.string(),
  name: z.string(),
  continental: z.string(),
  country: z.string(),
  region: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).nullable(),
  bestTime: z.string().nullable(),
  imageUrl: z.string().nullable(),
});

// Itinerary schemas
export const insertItinerarySchema = z.object({
  name: z.string().min(1),
  duration: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
  description: z.string().min(1),
  highlights: z.array(z.string()).nullable().optional(),
  includes: z.array(z.string()).nullable().optional(),
  difficulty: z.string().nullable().optional(),
  groupSize: z.string().nullable().optional(),
  rating: z.number().min(1).max(5).nullable().optional(),
  imageUrl: z.string().nullable().optional(),
});

export const itinerarySchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).nullable(),
  includes: z.array(z.string()).nullable(),
  difficulty: z.string().nullable(),
  groupSize: z.string().nullable(),
  rating: z.number().nullable(),
  imageUrl: z.string().nullable(),
});

// Inquiry schemas
export const insertInquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  arrivalDate: z.string().nullable().optional(),
  departureDate: z.string().nullable().optional(),
  adults: z.number().min(0).nullable().optional(),
  children: z.number().min(0).nullable().optional(),
  message: z.string().min(1),
});

// Volunteer Application schemas
export const insertVolunteerApplicationSchema = z.object({
  programId: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string().min(1),
  gender: z.string().min(1),
  fullAddress: z.string().min(1),
  country: z.string().min(1),
  telephone: z.string().min(1),
  mobile: z.string().min(1),
  email: z.string().email(),
  nationality: z.string().min(1),
  passportNumber: z.string().min(1),
  educationProfession: z.string().min(1),
  language: z.string().min(1),
  workingExperience: z.string().min(1),
  howFoundUs: z.string().min(1),
  expectedArrivalDate: z.string().min(1),
  volunteerDuration: z.string().min(1),
  dietaryRestrictions: z.boolean().nullable().optional(),
  dietaryDetails: z.string().nullable().optional(),
  excursions: z.array(z.string()).nullable().optional(),
  emergencyContactName: z.string().min(1),
  emergencyRelation: z.string().min(1),
  emergencyPhone: z.string().min(1),
  emergencyEmail: z.string().email(),
});

// Booking schemas
export const insertBookingSchema = z.object({
  bookingType: z.string().min(1),
  itemId: z.string().min(1),
  itemName: z.string().min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  checkInDate: z.string().min(1),
  checkOutDate: z.string().min(1),
  numberOfDays: z.number().min(1),
  adults: z.number().min(1),
  children: z.number().min(0),
  specialRequests: z.string().nullable().optional(),
});

// Admin Blog schemas
export const insertAdminBlogSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  category: z.string().min(1),
  imageUrl: z.string().nullable().optional(),
});

// Admin Volunteer Program schemas
export const insertAdminVolunteerProgramSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  country: z.string().min(1),
  flag: z.string().min(1),
  minAge: z.string().min(1),
  duration: z.string().min(1),
  cost: z.string().min(1),
  focusAreas: z.array(z.string()).min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  fullExplanation: z.string().min(1),
  activities: z.string().min(1),
  highlights: z.array(z.string()).min(1),
});

// Admin Accommodation schemas
export const insertAdminAccommodationSchema = z.object({
  name: z.string().min(1),
  continental: z.string().min(1),
  country: z.string().min(1),
  destination: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0),
  rating: z.coerce.number().min(1).max(5).nullable().optional(),
  features: z.array(z.string()).min(1),
  imageUrl: z.string().nullable().optional(),
  galleryImages: z.array(z.string()).nullable().optional(),
});

// Admin Itinerary schemas
export const insertAdminItinerarySchema = z.object({
  name: z.string().min(1),
  duration: z.string().min(1),
  price: z.coerce.number().min(0),
  category: z.string().min(1),
  description: z.string().min(1),
  highlights: z.array(z.string()).min(1),
  includes: z.array(z.string()).min(1),
  difficulty: z.string().nullable().optional(),
  groupSize: z.string().nullable().optional(),
  rating: z.coerce.number().min(1).max(5).nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  galleryImages: z.array(z.string()).nullable().optional(),
});

// Admin Destination schemas
export const insertAdminDestinationSchema = z.object({
  name: z.string().min(1),
  continental: z.string().min(1),
  country: z.string().min(1),
  region: z.string().nullable().optional(),
  destinationType: z.string().min(1),
  description: z.string().min(1),
  highlights: z.array(z.string()).nullable().optional(),
  bestTime: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  galleryImages: z.array(z.string()).nullable().optional(),
  subDestinations: z.array(z.string()).nullable().optional(),
});

// Destination Detail schemas
export const insertDestinationDetailSchema = z.object({
  destinationId: z.string().min(1),
  detailedDescription: z.string().min(1),
  overview: z.string().nullable().optional(),
  wildlife: z.string().nullable().optional(),
  activities: z.string().nullable().optional(),
  bestTimeToVisit: z.string().nullable().optional(),
  gettingThere: z.string().nullable().optional(),
  accommodation: z.string().nullable().optional(),
  practicalInfo: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
});

// Itinerary Detail schemas
export const insertItineraryDetailSchema = z.object({
  itineraryId: z.string().min(1),
  whatsIncluded: z.array(z.string()).nullable().optional(),
  whatsNotIncluded: z.array(z.string()).nullable().optional(),
  whatToBring: z.array(z.string()).nullable().optional(),
  itineraryOverview: z.string().nullable().optional(),
  dayByDay: z.string().nullable().optional(),
  pricingData: z.string().nullable().optional(),
  mapImageUrl: z.string().nullable().optional(),
  tourHighlights: z.array(z.string()).nullable().optional(),
});

// Accommodation Detail schemas
export const insertAccommodationDetailSchema = z.object({
  accommodationId: z.string().min(1),
  facilities: z.array(z.string()).nullable().optional(),
  rooms: z.string().nullable().optional(),
  galleryImages: z.array(z.string()).nullable().optional(),
});

// =============================================
// TYPE EXPORTS (using Zod inference)
// =============================================

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertAccommodation = z.infer<typeof insertAccommodationSchema>;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type InsertVolunteerApplication = z.infer<typeof insertVolunteerApplicationSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertAdminBlog = z.infer<typeof insertAdminBlogSchema>;
export type InsertAdminVolunteerProgram = z.infer<typeof insertAdminVolunteerProgramSchema>;
export type InsertAdminAccommodation = z.infer<typeof insertAdminAccommodationSchema>;
export type InsertAdminItinerary = z.infer<typeof insertAdminItinerarySchema>;
export type InsertAdminDestination = z.infer<typeof insertAdminDestinationSchema>;
export type InsertDestinationDetail = z.infer<typeof insertDestinationDetailSchema>;
export type InsertItineraryDetail = z.infer<typeof insertItineraryDetailSchema>;
export type InsertAccommodationDetail = z.infer<typeof insertAccommodationDetailSchema>;

// =============================================
// FLIGHT DATA TYPES (from OpenSky Network API)
// =============================================

export const flightDataSchema = z.object({
  icao24: z.string(),
  callsign: z.string().nullable(),
  origin_country: z.string(),
  time_position: z.number().nullable(),
  last_contact: z.number(),
  longitude: z.number().nullable(),
  latitude: z.number().nullable(),
  baro_altitude: z.number().nullable(),
  on_ground: z.boolean(),
  velocity: z.number().nullable(),
  true_track: z.number().nullable(),
  vertical_rate: z.number().nullable(),
  sensors: z.array(z.number()).nullable(),
  geo_altitude: z.number().nullable(),
  squawk: z.string().nullable(),
  spi: z.boolean(),
  position_source: z.number(),
});

export const openSkyRawResponseSchema = z.object({
  time: z.number(),
  states: z.array(z.array(z.union([z.string(), z.number(), z.boolean(), z.null()]))).nullable(),
});

export const openSkyResponseSchema = z.object({
  time: z.number(),
  states: z.array(flightDataSchema).nullable(),
});

export type FlightData = z.infer<typeof flightDataSchema>;
export type OpenSkyRawResponse = z.infer<typeof openSkyRawResponseSchema>;
export type OpenSkyResponse = z.infer<typeof openSkyResponseSchema>;
