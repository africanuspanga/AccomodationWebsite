import { 
  type User, type InsertUser,
  type Accommodation, type InsertAccommodation,
  type Destination, type InsertDestination, 
  type Itinerary, type InsertItinerary,
  type Inquiry, type InsertInquiry,
  type VolunteerApplication, type InsertVolunteerApplication,
  type Booking, type InsertBooking,
  type DestinationDetail, type InsertDestinationDetail,
  type ItineraryDetail, type InsertItineraryDetail,
  users, accommodations, destinations, itineraries, inquiries, volunteerApplications, bookings, destinationDetails, itineraryDetails
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;
  
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Accommodation operations
  getAllAccommodations(): Promise<Accommodation[]>;
  getAccommodation(id: string): Promise<Accommodation | undefined>;
  createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation>;
  updateAccommodation(id: string, accommodation: Partial<InsertAccommodation>): Promise<Accommodation | undefined>;
  deleteAccommodation(id: string): Promise<boolean>;
  
  // Destination operations
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  updateDestination(id: string, destination: Partial<InsertDestination>): Promise<Destination | undefined>;
  deleteDestination(id: string): Promise<boolean>;
  
  // Destination Details operations
  getDestinationDetail(destinationId: string): Promise<DestinationDetail | undefined>;
  
  // Itinerary operations
  getAllItineraries(): Promise<Itinerary[]>;
  getItinerary(id: string): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  updateItinerary(id: string, itinerary: Partial<InsertItinerary>): Promise<Itinerary | undefined>;
  deleteItinerary(id: string): Promise<boolean>;
  
  // Itinerary Details operations
  getItineraryDetail(itineraryId: string): Promise<ItineraryDetail | undefined>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiry(id: string): Promise<Inquiry | undefined>;
  
  // Volunteer Application operations
  createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication>;
  getAllVolunteerApplications(): Promise<VolunteerApplication[]>;
  getVolunteerApplication(id: string): Promise<VolunteerApplication | undefined>;
  getVolunteerApplicationsByProgram(programId: string): Promise<VolunteerApplication[]>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Use memory store for now to avoid PostgreSQL connection complexity
    // TODO: Implement PostgreSQL session store later
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Accommodation operations
  async getAllAccommodations(): Promise<Accommodation[]> {
    return await db.select().from(accommodations);
  }

  async getAccommodation(id: string): Promise<Accommodation | undefined> {
    const [accommodation] = await db.select().from(accommodations).where(eq(accommodations.id, id));
    return accommodation || undefined;
  }

  async createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation> {
    const [created] = await db.insert(accommodations).values(accommodation).returning();
    return created;
  }

  async updateAccommodation(id: string, accommodation: Partial<InsertAccommodation>): Promise<Accommodation | undefined> {
    const [updated] = await db.update(accommodations).set(accommodation).where(eq(accommodations.id, id)).returning();
    return updated || undefined;
  }

  async deleteAccommodation(id: string): Promise<boolean> {
    const result = await db.delete(accommodations).where(eq(accommodations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Destination operations
  async getAllDestinations(): Promise<Destination[]> {
    return await db.select().from(destinations);
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    const [destination] = await db.select().from(destinations).where(eq(destinations.id, id));
    return destination || undefined;
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    const [created] = await db.insert(destinations).values(destination).returning();
    return created;
  }

  async updateDestination(id: string, destination: Partial<InsertDestination>): Promise<Destination | undefined> {
    const [updated] = await db.update(destinations).set(destination).where(eq(destinations.id, id)).returning();
    return updated || undefined;
  }

  async deleteDestination(id: string): Promise<boolean> {
    const result = await db.delete(destinations).where(eq(destinations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Destination Details operations
  async getDestinationDetail(destinationId: string): Promise<DestinationDetail | undefined> {
    const [detail] = await db.select().from(destinationDetails).where(eq(destinationDetails.destinationId, destinationId));
    return detail || undefined;
  }

  // Itinerary operations
  async getAllItineraries(): Promise<Itinerary[]> {
    return await db.select().from(itineraries);
  }

  async getItinerary(id: string): Promise<Itinerary | undefined> {
    const [itinerary] = await db.select().from(itineraries).where(eq(itineraries.id, id));
    return itinerary || undefined;
  }

  async createItinerary(itinerary: InsertItinerary): Promise<Itinerary> {
    const [created] = await db.insert(itineraries).values(itinerary).returning();
    return created;
  }

  async updateItinerary(id: string, itinerary: Partial<InsertItinerary>): Promise<Itinerary | undefined> {
    const [updated] = await db.update(itineraries).set(itinerary).where(eq(itineraries.id, id)).returning();
    return updated || undefined;
  }

  async deleteItinerary(id: string): Promise<boolean> {
    const result = await db.delete(itineraries).where(eq(itineraries.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Itinerary Details operations
  async getItineraryDetail(itineraryId: string): Promise<ItineraryDetail | undefined> {
    const [detail] = await db.select().from(itineraryDetails).where(eq(itineraryDetails.itineraryId, itineraryId));
    return detail || undefined;
  }

  // Inquiry operations
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [created] = await db.insert(inquiries).values(inquiry).returning();
    return created;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries);
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, id));
    return inquiry || undefined;
  }

  // Volunteer Application operations
  async createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication> {
    const [created] = await db.insert(volunteerApplications).values(application).returning();
    return created;
  }

  async getAllVolunteerApplications(): Promise<VolunteerApplication[]> {
    return await db.select().from(volunteerApplications);
  }

  async getVolunteerApplication(id: string): Promise<VolunteerApplication | undefined> {
    const [application] = await db.select().from(volunteerApplications).where(eq(volunteerApplications.id, id));
    return application || undefined;
  }

  async getVolunteerApplicationsByProgram(programId: string): Promise<VolunteerApplication[]> {
    return await db.select().from(volunteerApplications).where(eq(volunteerApplications.programId, programId));
  }

  // Booking operations
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [created] = await db.insert(bookings).values(booking).returning();
    return created;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }
}

export const storage = new DatabaseStorage();
