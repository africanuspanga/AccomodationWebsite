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
} from '@shared/schema';

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
    whatsNotIncluded: row.whats_not_included,
    whatToBring: row.what_to_bring,
    difficulty: row.difficulty,
    groupSize: row.group_size,
    rating: row.rating,
    imageUrl: row.image_url,
    termsAndConditions: row.terms_and_conditions,
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
    whats_not_included: obj.whatsNotIncluded,
    what_to_bring: obj.whatToBring,
    difficulty: obj.difficulty,
    group_size: obj.groupSize,
    rating: obj.rating,
    image_url: obj.imageUrl,
    terms_and_conditions: obj.termsAndConditions,
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

export function mapVolunteerApplicationFromDB(row: any): VolunteerApplication {
  return {
    id: row.id,
    programId: row.program_id,
    firstName: row.first_name,
    lastName: row.last_name,
    dateOfBirth: row.date_of_birth,
    gender: row.gender,
    fullAddress: row.full_address,
    country: row.country,
    telephone: row.telephone,
    mobile: row.mobile,
    email: row.email,
    nationality: row.nationality,
    passportNumber: row.passport_number,
    educationProfession: row.education_profession,
    language: row.language,
    workingExperience: row.working_experience,
    howFoundUs: row.how_found_us,
    expectedArrivalDate: row.expected_arrival_date,
    volunteerDuration: row.volunteer_duration,
    dietaryRestrictions: row.dietary_restrictions,
    dietaryDetails: row.dietary_details,
    excursions: row.excursions,
    emergencyContactName: row.emergency_contact_name,
    emergencyRelation: row.emergency_relation,
    emergencyPhone: row.emergency_phone,
    emergencyEmail: row.emergency_email,
    createdAt: row.created_at,
  };
}

export function mapVolunteerApplicationToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    program_id: obj.programId,
    first_name: obj.firstName,
    last_name: obj.lastName,
    date_of_birth: obj.dateOfBirth,
    gender: obj.gender,
    full_address: obj.fullAddress,
    country: obj.country,
    telephone: obj.telephone,
    mobile: obj.mobile,
    email: obj.email,
    nationality: obj.nationality,
    passport_number: obj.passportNumber,
    education_profession: obj.educationProfession,
    language: obj.language,
    working_experience: obj.workingExperience,
    how_found_us: obj.howFoundUs,
    expected_arrival_date: obj.expectedArrivalDate,
    volunteer_duration: obj.volunteerDuration,
    dietary_restrictions: obj.dietaryRestrictions,
    dietary_details: obj.dietaryDetails,
    excursions: obj.excursions,
    emergency_contact_name: obj.emergencyContactName,
    emergency_relation: obj.emergencyRelation,
    emergency_phone: obj.emergencyPhone,
    emergency_email: obj.emergencyEmail,
    created_at: obj.createdAt,
  };
}

export function mapDestinationDetailFromDB(row: any): DestinationDetail {
  return {
    id: row.id,
    destinationId: row.destination_id,
    detailedDescription: row.detailed_description,
    overview: row.overview,
    wildlife: row.wildlife,
    activities: row.activities,
    bestTimeToVisit: row.best_time_to_visit,
    gettingThere: row.getting_there,
    accommodation: row.accommodation,
    practicalInfo: row.practical_info,
    imageUrl: row.image_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapDestinationDetailToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    destination_id: obj.destinationId,
    detailed_description: obj.detailedDescription,
    overview: obj.overview,
    wildlife: obj.wildlife,
    activities: obj.activities,
    best_time_to_visit: obj.bestTimeToVisit,
    getting_there: obj.gettingThere,
    accommodation: obj.accommodation,
    practical_info: obj.practicalInfo,
    image_url: obj.imageUrl,
    created_at: obj.createdAt,
    updated_at: obj.updatedAt,
  };
}

export function mapItineraryDetailFromDB(row: any): ItineraryDetail {
  return {
    id: row.id,
    itineraryId: row.itinerary_id,
    whatsIncluded: row.whats_included,
    whatsNotIncluded: row.whats_not_included,
    whatToBring: row.what_to_bring,
    itineraryOverview: row.itinerary_overview,
    dayByDay: row.day_by_day,
    pricingData: row.pricing_data,
    mapImageUrl: row.map_image_url,
    tourHighlights: row.tour_highlights,
    termsAndConditions: row.terms_and_conditions,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapItineraryDetailToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    itinerary_id: obj.itineraryId,
    whats_included: obj.whatsIncluded,
    whats_not_included: obj.whatsNotIncluded,
    what_to_bring: obj.whatToBring,
    itinerary_overview: obj.itineraryOverview,
    day_by_day: obj.dayByDay,
    pricing_data: obj.pricingData,
    map_image_url: obj.mapImageUrl,
    tour_highlights: obj.tourHighlights,
    terms_and_conditions: obj.termsAndConditions,
    created_at: obj.createdAt,
    updated_at: obj.updatedAt,
  };
}

export function mapAccommodationDetailFromDB(row: any): AccommodationDetail {
  return {
    id: row.id,
    accommodationId: row.accommodation_id,
    facilities: row.facilities,
    rooms: row.rooms,
    galleryImages: row.gallery_images,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapAccommodationDetailToDB(obj: any): Record<string, any> {
  return {
    id: obj.id,
    accommodation_id: obj.accommodationId,
    facilities: obj.facilities,
    rooms: obj.rooms,
    gallery_images: obj.galleryImages,
    created_at: obj.createdAt,
    updated_at: obj.updatedAt,
  };
}

// Helper to automatically map arrays
export function mapArrayFromDB<T>(rows: any[], mapper: (row: any) => T): T[] {
  return rows ? rows.map(mapper) : [];
}

// ============================================================================
// ADMIN TABLE MAPPINGS
// ============================================================================

export function mapAdminBlogFromDB(row: any): AdminBlog {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt || null,
    content: row.content,
    author: row.author,
    category: row.category,
    imageUrl: row.image_url || null,
    createdAt: row.created_at,
  };
}

export function mapAdminBlogToDB(obj: any): Record<string, any> {
  const mapped: Record<string, any> = {
    title: obj.title,
    content: obj.content,
    author: obj.author,
    category: obj.category,
  };
  
  if (obj.id !== undefined) mapped.id = obj.id;
  if (obj.excerpt !== undefined) mapped.excerpt = obj.excerpt;
  if (obj.imageUrl !== undefined) mapped.image_url = obj.imageUrl;
  if (obj.createdAt !== undefined) mapped.created_at = obj.createdAt;
  
  return mapped;
}

export function mapAdminDestinationFromDB(row: any): AdminDestination {
  return {
    id: row.id,
    name: row.name,
    continental: row.continental,
    country: row.country,
    region: row.region || null,
    destinationType: row.destination_type,
    description: row.description,
    highlights: row.highlights || [],
    bestTime: row.best_time || null,
    imageUrl: row.image_url || null,
    galleryImages: row.gallery_images || [],
    subDestinations: row.sub_destinations || [],
    createdAt: row.created_at,
  };
}

export function mapAdminDestinationToDB(obj: any): Record<string, any> {
  const mapped: Record<string, any> = {
    name: obj.name,
    continental: obj.continental,
    country: obj.country,
    destination_type: obj.destinationType,
    description: obj.description,
  };
  
  if (obj.id !== undefined) mapped.id = obj.id;
  if (obj.region !== undefined) mapped.region = obj.region;
  if (obj.highlights !== undefined) mapped.highlights = obj.highlights;
  if (obj.bestTime !== undefined) mapped.best_time = obj.bestTime;
  if (obj.imageUrl !== undefined) mapped.image_url = obj.imageUrl;
  if (obj.galleryImages !== undefined) mapped.gallery_images = obj.galleryImages;
  if (obj.subDestinations !== undefined) mapped.sub_destinations = obj.subDestinations;
  if (obj.createdAt !== undefined) mapped.created_at = obj.createdAt;
  
  return mapped;
}

export function mapAdminAccommodationFromDB(row: any): AdminAccommodation {
  return {
    id: row.id,
    name: row.name,
    continental: row.continental,
    country: row.country,
    destination: row.destination,
    category: row.category,
    description: row.description || null,
    price: row.price,
    rating: row.rating,
    features: row.features || [],
    imageUrl: row.image_url || null,
    galleryImages: row.gallery_images || [],
    createdAt: row.created_at,
  };
}

export function mapAdminAccommodationToDB(obj: any): Record<string, any> {
  const mapped: Record<string, any> = {
    name: obj.name,
    continental: obj.continental,
    country: obj.country,
    destination: obj.destination,
    category: obj.category,
    price: obj.price,
    rating: obj.rating,
  };
  
  if (obj.id !== undefined) mapped.id = obj.id;
  if (obj.description !== undefined) mapped.description = obj.description;
  if (obj.features !== undefined) mapped.features = obj.features;
  if (obj.imageUrl !== undefined) mapped.image_url = obj.imageUrl;
  if (obj.galleryImages !== undefined) mapped.gallery_images = obj.galleryImages;
  if (obj.createdAt !== undefined) mapped.created_at = obj.createdAt;
  
  return mapped;
}

export function mapAdminItineraryFromDB(row: any): AdminItinerary {
  return {
    id: row.id,
    name: row.name,
    duration: row.duration,
    price: row.price,
    category: row.category,
    description: row.description || null,
    highlights: row.highlights || [],
    includes: row.includes || [],
    whatsNotIncluded: row.whats_not_included || null,
    whatToBring: row.what_to_bring || null,
    difficulty: row.difficulty || null,
    groupSize: row.group_size || null,
    imageUrl: row.image_url || null,
    galleryImages: row.gallery_images || [],
    termsAndConditions: row.terms_and_conditions || null,
    createdAt: row.created_at,
  };
}

export function mapAdminItineraryToDB(obj: any): Record<string, any> {
  const mapped: Record<string, any> = {
    name: obj.name,
    duration: obj.duration,
    price: obj.price,
    category: obj.category,
  };
  
  if (obj.id !== undefined) mapped.id = obj.id;
  if (obj.description !== undefined) mapped.description = obj.description;
  if (obj.highlights !== undefined) mapped.highlights = obj.highlights;
  if (obj.includes !== undefined) mapped.includes = obj.includes;
  if (obj.whatsNotIncluded !== undefined) mapped.whats_not_included = obj.whatsNotIncluded;
  if (obj.whatToBring !== undefined) mapped.what_to_bring = obj.whatToBring;
  if (obj.difficulty !== undefined) mapped.difficulty = obj.difficulty;
  if (obj.groupSize !== undefined) mapped.group_size = obj.groupSize;
  if (obj.imageUrl !== undefined) mapped.image_url = obj.imageUrl;
  if (obj.galleryImages !== undefined) mapped.gallery_images = obj.galleryImages;
  if (obj.termsAndConditions !== undefined) mapped.terms_and_conditions = obj.termsAndConditions;
  if (obj.createdAt !== undefined) mapped.created_at = obj.createdAt;
  
  return mapped;
}

export function mapAdminVolunteerProgramFromDB(row: any): AdminVolunteerProgram {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    duration: row.duration,
    price: row.price,
    category: row.category,
    description: row.description || null,
    focusAreas: row.focus_areas || [],
    highlights: row.highlights || [],
    activities: row.activities ? JSON.parse(row.activities) : { safari: false, hiking: false, mountainClimbing: false, culturalTours: false },
    imageUrl: row.image_url || null,
    createdAt: row.created_at,
  };
}

export function mapAdminVolunteerProgramToDB(obj: any): Record<string, any> {
  const mapped: Record<string, any> = {
    name: obj.name,
    location: obj.location,
    duration: obj.duration,
    price: obj.price,
    category: obj.category,
  };
  
  if (obj.id !== undefined) mapped.id = obj.id;
  if (obj.description !== undefined) mapped.description = obj.description;
  if (obj.focusAreas !== undefined) mapped.focus_areas = obj.focusAreas;
  if (obj.highlights !== undefined) mapped.highlights = obj.highlights;
  if (obj.activities !== undefined) mapped.activities = JSON.stringify(obj.activities);
  if (obj.imageUrl !== undefined) mapped.image_url = obj.imageUrl;
  if (obj.createdAt !== undefined) mapped.created_at = obj.createdAt;
  
  return mapped;
}
