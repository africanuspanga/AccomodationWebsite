import { supabase, TABLES, handleSupabaseError } from './db-supabase';
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
  type AccommodationDetail, type InsertAccommodationDetail,
} from "@shared/schema-supabase";
import session from "express-session";
import createMemoryStore from "memorystore";

// Storage interface - same as original storage.ts
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
  
  // Accommodation Details operations
  getAccommodationDetail(accommodationId: string): Promise<AccommodationDetail | undefined>;
  
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

export class SupabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Use memory store for session management
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined; // No rows returned
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined; // No rows returned
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .insert(insertUser)
      .select()
      .single();
    
    if (error) handleSupabaseError(error);
    return data!;
  }

  // Accommodation operations
  async getAllAccommodations(): Promise<Accommodation[]> {
    const { data, error } = await supabase
      .from(TABLES.ACCOMMODATIONS)
      .select('*');
    
    if (error) handleSupabaseError(error);
    return data || [];
  }

  async getAccommodation(id: string): Promise<Accommodation | undefined> {
    const { data, error } = await supabase
      .from(TABLES.ACCOMMODATIONS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation> {
    const { data, error } = await supabase
      .from(TABLES.ACCOMMODATIONS)
      .insert(accommodation)
      .select()
      .single();
    
    if (error) handleSupabaseError(error);
    return data!;
  }

  async updateAccommodation(id: string, accommodation: Partial<InsertAccommodation>): Promise<Accommodation | undefined> {
    const { data, error } = await supabase
      .from(TABLES.ACCOMMODATIONS)
      .update(accommodation)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async deleteAccommodation(id: string): Promise<boolean> {
    const { error } = await supabase
      .from(TABLES.ACCOMMODATIONS)
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return false;
      handleSupabaseError(error);
    }
    return true;
  }

  // Accommodation Details operations
  async getAccommodationDetail(accommodationId: string): Promise<AccommodationDetail | undefined> {
    const { data, error } = await supabase
      .from(TABLES.ACCOMMODATION_DETAILS)
      .select('*')
      .eq('accommodationId', accommodationId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  // Destination operations
  async getAllDestinations(): Promise<Destination[]> {
    const { data, error } = await supabase
      .from(TABLES.DESTINATIONS)
      .select('*');
    
    if (error) handleSupabaseError(error);
    return data || [];
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    const { data, error } = await supabase
      .from(TABLES.DESTINATIONS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    const { data, error } = await supabase
      .from(TABLES.DESTINATIONS)
      .insert(destination)
      .select()
      .single();
    
    if (error) handleSupabaseError(error);
    return data!;
  }

  async updateDestination(id: string, destination: Partial<InsertDestination>): Promise<Destination | undefined> {
    const { data, error } = await supabase
      .from(TABLES.DESTINATIONS)
      .update(destination)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async deleteDestination(id: string): Promise<boolean> {
    const { error } = await supabase
      .from(TABLES.DESTINATIONS)
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return false;
      handleSupabaseError(error);
    }
    return true;
  }

  // Destination Details operations
  async getDestinationDetail(destinationId: string): Promise<DestinationDetail | undefined> {
    const { data, error } = await supabase
      .from(TABLES.DESTINATION_DETAILS)
      .select('*')
      .eq('destinationId', destinationId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  // Itinerary operations
  async getAllItineraries(): Promise<Itinerary[]> {
    const { data, error } = await supabase
      .from(TABLES.ITINERARIES)
      .select('*');
    
    if (error) handleSupabaseError(error);
    return data || [];
  }

  async getItinerary(id: string): Promise<Itinerary | undefined> {
    const { data, error } = await supabase
      .from(TABLES.ITINERARIES)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async createItinerary(itinerary: InsertItinerary): Promise<Itinerary> {
    const { data, error } = await supabase
      .from(TABLES.ITINERARIES)
      .insert(itinerary)
      .select()
      .single();
    
    if (error) handleSupabaseError(error);
    return data!;
  }

  async updateItinerary(id: string, itinerary: Partial<InsertItinerary>): Promise<Itinerary | undefined> {
    const { data, error } = await supabase
      .from(TABLES.ITINERARIES)
      .update(itinerary)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async deleteItinerary(id: string): Promise<boolean> {
    const { error } = await supabase
      .from(TABLES.ITINERARIES)
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return false;
      handleSupabaseError(error);
    }
    return true;
  }

  // Itinerary Details operations
  async getItineraryDetail(itineraryId: string): Promise<ItineraryDetail | undefined> {
    const { data, error } = await supabase
      .from(TABLES.ITINERARY_DETAILS)
      .select('*')
      .eq('itineraryId', itineraryId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  // Inquiry operations
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const { data, error } = await supabase
      .from(TABLES.INQUIRIES)
      .insert(inquiry)
      .select()
      .single();
    
    if (error) handleSupabaseError(error);
    return data!;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    const { data, error } = await supabase
      .from(TABLES.INQUIRIES)
      .select('*');
    
    if (error) handleSupabaseError(error);
    return data || [];
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    const { data, error } = await supabase
      .from(TABLES.INQUIRIES)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  // Volunteer Application operations
  async createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication> {
    const { data, error } = await supabase
      .from(TABLES.VOLUNTEER_APPLICATIONS)
      .insert(application)
      .select()
      .single();
    
    if (error) handleSupabaseError(error);
    return data!;
  }

  async getAllVolunteerApplications(): Promise<VolunteerApplication[]> {
    const { data, error } = await supabase
      .from(TABLES.VOLUNTEER_APPLICATIONS)
      .select('*');
    
    if (error) handleSupabaseError(error);
    return data || [];
  }

  async getVolunteerApplication(id: string): Promise<VolunteerApplication | undefined> {
    const { data, error } = await supabase
      .from(TABLES.VOLUNTEER_APPLICATIONS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }

  async getVolunteerApplicationsByProgram(programId: string): Promise<VolunteerApplication[]> {
    const { data, error } = await supabase
      .from(TABLES.VOLUNTEER_APPLICATIONS)
      .select('*')
      .eq('programId', programId);
    
    if (error) handleSupabaseError(error);
    return data || [];
  }

  // Booking operations
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const { data, error } = await supabase
      .from(TABLES.BOOKINGS)
      .insert(booking)
      .select()
      .single();
    
    if (error) handleSupabaseError(error);
    return data!;
  }

  async getAllBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from(TABLES.BOOKINGS)
      .select('*');
    
    if (error) handleSupabaseError(error);
    return data || [];
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const { data, error } = await supabase
      .from(TABLES.BOOKINGS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      handleSupabaseError(error);
    }
    return data || undefined;
  }
}

export const storage = new SupabaseStorage();
