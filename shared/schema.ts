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
