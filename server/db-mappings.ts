/**
 * Database Field Mapping Utilities
 * 
 * Converts between camelCase (TypeScript) and snake_case (PostgreSQL/Supabase)
 * This ensures compatibility between our TypeScript interfaces and Supabase database columns
 */

import type {
  Accommodation, Destination, Itinerary, Inquiry,
  VolunteerApplication, Booking, AdminBlog, AdminVolunteerProgram,
  AdminAccommodation, AdminItinerary, AdminDestination,
  DestinationDetail, ItineraryDetail, AccommodationDetail
} from '@shared/schema-supabase';

// Generic snake_case to camelCase converter
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Generic camelCase to snake_case converter
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// Convert database row (snake_case) to TypeScript object (camelCase)
export function fromSnakeCase<T = any>(obj: any): T {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(fromSnakeCase) as any;
  
  const result: any = {};
  for (const key in obj) {
    const camelKey = toCamelCase(key);
    result[camelKey] = obj[key];
  }
  return result;
}

// Convert TypeScript object (camelCase) to database row (snake_case)
export function toSnakeCaseObject<T = any>(obj: any): Record<string, any> {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCaseObject) as any;
  
  const result: Record<string, any> = {};
  for (const key in obj) {
    const snakeKey = toSnakeCase(key);
    result[snakeKey] = obj[key];
  }
  return result;
}

// Specific mappings for each table (for type safety and clarity)

export function mapAccommodationFromDB(row: any): Accommodation {
  return {
    id: row.id,
    name: row.name,
    continental: row.continental,
    country: row.country,
    destination: row.destination,
    category: row.category,
    description: row.description,
    price: row.price,
    rating: row.rating,
    imageUrl: row.image_url,
    features: row.features,
  };
}

export function mapAccommodationToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    name: obj.name,
    continental: obj.continental,
    country: obj.country,
    destination: obj.destination,
    category: obj.category,
    description: obj.description,
    price: obj.price,
    rating: obj.rating,
    image_url: obj.imageUrl,
    features: obj.features,
  };
}

export function mapDestinationFromDB(row: any): Destination {
  return {
    id: row.id,
    name: row.name,
    continental: row.continental,
    country: row.country,
    region: row.region,
    description: row.description,
    highlights: row.highlights,
    bestTime: row.best_time,
    imageUrl: row.image_url,
  };
}

export function mapDestinationToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    name: obj.name,
    continental: obj.continental,
    country: obj.country,
    region: obj.region,
    description: obj.description,
    highlights: obj.highlights,
    best_time: obj.bestTime,
    image_url: obj.imageUrl,
  };
}

export function mapItineraryFromDB(row: any): Itinerary {
  return {
    id: row.id,
    name: row.name,
    duration: row.duration,
    price: row.price,
    category: row.category,
    description: row.description,
    highlights: row.highlights,
    includes: row.includes,
    difficulty: row.difficulty,
    groupSize: row.group_size,
    rating: row.rating,
    imageUrl: row.image_url,
  };
}

export function mapItineraryToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    name: obj.name,
    duration: obj.duration,
    price: obj.price,
    category: obj.category,
    description: obj.description,
    highlights: obj.highlights,
    includes: obj.includes,
    difficulty: obj.difficulty,
    group_size: obj.groupSize,
    rating: obj.rating,
    image_url: obj.imageUrl,
  };
}

export function mapInquiryFromDB(row: any): Inquiry {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    arrivalDate: row.arrival_date,
    departureDate: row.departure_date,
    adults: row.adults,
    children: row.children,
    message: row.message,
    createdAt: row.created_at,
  };
}

export function mapInquiryToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    first_name: obj.firstName,
    last_name: obj.lastName,
    email: obj.email,
    phone: obj.phone,
    arrival_date: obj.arrivalDate,
    departure_date: obj.departureDate,
    adults: obj.adults,
    children: obj.children,
    message: obj.message,
    created_at: obj.createdAt,
  };
}

export function mapBookingFromDB(row: any): Booking {
  return {
    id: row.id,
    bookingType: row.booking_type,
    itemId: row.item_id,
    itemName: row.item_name,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    checkInDate: row.check_in_date,
    checkOutDate: row.check_out_date,
    numberOfDays: row.number_of_days,
    adults: row.adults,
    children: row.children,
    specialRequests: row.special_requests,
    createdAt: row.created_at,
  };
}

export function mapBookingToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    booking_type: obj.bookingType,
    item_id: obj.itemId,
    item_name: obj.itemName,
    full_name: obj.fullName,
    email: obj.email,
    phone: obj.phone,
    check_in_date: obj.checkInDate,
    check_out_date: obj.checkOutDate,
    number_of_days: obj.numberOfDays,
    adults: obj.adults,
    children: obj.children,
    special_requests: obj.specialRequests,
    created_at: obj.createdAt,
  };
}

// Helper to automatically map arrays
export function mapArrayFromDB<T>(rows: any[], mapper: (row: any) => T): T[] {
  return rows ? rows.map(mapper) : [];
}
