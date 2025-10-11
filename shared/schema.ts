import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Accommodations table
export const accommodations = pgTable("accommodations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  continental: text("continental").notNull(),
  country: text("country").notNull(),
  destination: text("destination").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  price: integer("price"),
  rating: integer("rating").default(5),
  imageUrl: text("image_url"),
  features: text("features").array(),
});

// Destinations table
export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  continental: text("continental").notNull(),
  country: text("country").notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  highlights: text("highlights").array(),
  bestTime: text("best_time"),
  imageUrl: text("image_url"),
});

// Itineraries table
export const itineraries = pgTable("itineraries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  duration: text("duration").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  highlights: text("highlights").array(),
  includes: text("includes").array(),
  difficulty: text("difficulty"),
  groupSize: text("group_size"),
  rating: integer("rating").default(5),
  imageUrl: text("image_url"),
});

// Contact inquiries table
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  arrivalDate: text("arrival_date"),
  departureDate: text("departure_date"),
  adults: integer("adults"),
  children: integer("children"),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`now()`),
});

// Volunteer applications table
export const volunteerApplications = pgTable("volunteer_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  programId: text("program_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  fullAddress: text("full_address").notNull(),
  country: text("country").notNull(),
  telephone: text("telephone").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email").notNull(),
  nationality: text("nationality").notNull(),
  passportNumber: text("passport_number").notNull(),
  educationProfession: text("education_profession").notNull(),
  language: text("language").notNull(),
  workingExperience: text("working_experience").notNull(),
  howFoundUs: text("how_found_us").notNull(),
  expectedArrivalDate: text("expected_arrival_date").notNull(),
  volunteerDuration: text("volunteer_duration").notNull(),
  dietaryRestrictions: boolean("dietary_restrictions").default(false),
  dietaryDetails: text("dietary_details"),
  excursions: text("excursions").array(),
  emergencyContactName: text("emergency_contact_name").notNull(),
  emergencyRelation: text("emergency_relation").notNull(),
  emergencyPhone: text("emergency_phone").notNull(),
  emergencyEmail: text("emergency_email").notNull(),
  createdAt: text("created_at").default(sql`now()`),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookingType: text("booking_type").notNull(), // 'accommodation' or 'itinerary'
  itemId: text("item_id").notNull(), // ID of the accommodation or itinerary
  itemName: text("item_name").notNull(), // Name for reference
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(), // includes country code
  checkInDate: text("check_in_date").notNull(),
  checkOutDate: text("check_out_date").notNull(),
  numberOfDays: integer("number_of_days").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull().default(0),
  specialRequests: text("special_requests"),
  createdAt: text("created_at").default(sql`now()`),
});

// Admin Blog Posts table (for new admin-created content)
export const adminBlogs = pgTable("admin_blogs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  createdAt: text("created_at").default(sql`now()`),
});

// Admin Volunteer Programs table (for new admin-created content)
export const adminVolunteerPrograms = pgTable("admin_volunteer_programs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  location: text("location").notNull(),
  country: text("country").notNull(),
  flag: text("flag").notNull(),
  minAge: text("min_age").notNull(),
  duration: text("duration").notNull(),
  cost: text("cost").notNull(),
  focusAreas: text("focus_areas").array().notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  fullExplanation: text("full_explanation").notNull(),
  activities: text("activities").notNull(), // JSON stringified object
  highlights: text("highlights").array().notNull(),
  createdAt: text("created_at").default(sql`now()`),
});

// Admin Accommodations table (for new admin-created content) 
export const adminAccommodations = pgTable("admin_accommodations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  continental: text("continental").notNull(),
  country: text("country").notNull(),
  destination: text("destination").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating").default(5),
  features: text("features").array().notNull(),
  imageUrl: text("image_url"),
  createdAt: text("created_at").default(sql`now()`),
});

// Admin Itineraries table (for new admin-created content)
export const adminItineraries = pgTable("admin_itineraries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  duration: text("duration").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  highlights: text("highlights").array().notNull(),
  includes: text("includes").array().notNull(),
  difficulty: text("difficulty"),
  groupSize: text("group_size"),
  rating: integer("rating").default(5),
  imageUrl: text("image_url"),
  createdAt: text("created_at").default(sql`now()`),
});

// Destination Details table (for admin-editable detailed destination information)
export const destinationDetails = pgTable("destination_details", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  destinationId: text("destination_id").notNull().unique(), // References destination.id
  detailedDescription: text("detailed_description").notNull(), // 600+ characters
  overview: text("overview"),
  wildlife: text("wildlife"),
  activities: text("activities"),
  bestTimeToVisit: text("best_time_to_visit"),
  gettingThere: text("getting_there"),
  accommodation: text("accommodation"),
  practicalInfo: text("practical_info"),
  imageUrl: text("image_url"),
  createdAt: text("created_at").default(sql`now()`),
  updatedAt: text("updated_at").default(sql`now()`),
});

// Schema definitions
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAccommodationSchema = createInsertSchema(accommodations).omit({
  id: true,
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertVolunteerApplicationSchema = createInsertSchema(volunteerApplications).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export const insertAdminBlogSchema = createInsertSchema(adminBlogs).omit({
  id: true,
  createdAt: true,
});

export const insertAdminVolunteerProgramSchema = createInsertSchema(adminVolunteerPrograms).omit({
  id: true,
  createdAt: true,
});

export const insertAdminAccommodationSchema = createInsertSchema(adminAccommodations).omit({
  id: true,
  createdAt: true,
});

export const insertAdminItinerarySchema = createInsertSchema(adminItineraries).omit({
  id: true,
  createdAt: true,
});

export const insertDestinationDetailSchema = createInsertSchema(destinationDetails).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PublicUser = Omit<User, 'password'>;

export type InsertAccommodation = z.infer<typeof insertAccommodationSchema>;
export type Accommodation = typeof accommodations.$inferSelect;

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

export type InsertVolunteerApplication = z.infer<typeof insertVolunteerApplicationSchema>;
export type VolunteerApplication = typeof volunteerApplications.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertAdminBlog = z.infer<typeof insertAdminBlogSchema>;
export type AdminBlog = typeof adminBlogs.$inferSelect;

export type InsertAdminVolunteerProgram = z.infer<typeof insertAdminVolunteerProgramSchema>;
export type AdminVolunteerProgram = typeof adminVolunteerPrograms.$inferSelect;

export type InsertAdminAccommodation = z.infer<typeof insertAdminAccommodationSchema>;
export type AdminAccommodation = typeof adminAccommodations.$inferSelect;

export type InsertAdminItinerary = z.infer<typeof insertAdminItinerarySchema>;
export type AdminItinerary = typeof adminItineraries.$inferSelect;

export type InsertDestinationDetail = z.infer<typeof insertDestinationDetailSchema>;
export type DestinationDetail = typeof destinationDetails.$inferSelect;

// Flight data types for OpenSky Network API
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
