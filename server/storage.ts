import { 
  type User, type InsertUser,
  type Accommodation, type InsertAccommodation,
  type Destination, type InsertDestination, 
  type Itinerary, type InsertItinerary,
  type Inquiry, type InsertInquiry,
  users, accommodations, destinations, itineraries, inquiries
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
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
  
  // Itinerary operations
  getAllItineraries(): Promise<Itinerary[]>;
  getItinerary(id: string): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  updateItinerary(id: string, itinerary: Partial<InsertItinerary>): Promise<Itinerary | undefined>;
  deleteItinerary(id: string): Promise<boolean>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiry(id: string): Promise<Inquiry | undefined>;
}

export class DatabaseStorage implements IStorage {
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
}

export const storage = new DatabaseStorage();
