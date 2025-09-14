#!/usr/bin/env tsx

import { db } from "./db";
import { accommodations, destinations, itineraries } from "@shared/schema";
import contentData from "../client/src/data/content.json";

async function seedDatabase() {
  console.log("Starting database migration...");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(accommodations);
    await db.delete(destinations);
    await db.delete(itineraries);

    // Insert accommodations
    console.log("Inserting accommodations...");
    for (const accommodation of contentData.accommodations) {
      await db.insert(accommodations).values({
        id: accommodation.id,
        name: accommodation.name,
        continental: accommodation.continental,
        country: accommodation.country,
        destination: accommodation.destination,
        category: accommodation.category,
        description: accommodation.description,
        price: accommodation.price,
        rating: accommodation.rating,
        features: accommodation.features,
        imageUrl: null // Will be added when image upload is implemented
      });
    }

    // Insert destinations
    console.log("Inserting destinations...");
    for (const destination of contentData.destinations) {
      await db.insert(destinations).values({
        id: destination.id,
        name: destination.name,
        continental: destination.continental,
        country: destination.country,
        region: destination.region,
        description: destination.description,
        highlights: destination.highlights,
        bestTime: destination.bestTime,
        imageUrl: null // Will be added when image upload is implemented
      });
    }

    // Insert itineraries
    console.log("Inserting itineraries...");
    for (const itinerary of contentData.itineraries) {
      await db.insert(itineraries).values({
        id: itinerary.id,
        name: itinerary.name,
        duration: itinerary.duration,
        price: itinerary.price,
        category: itinerary.category,
        description: itinerary.description,
        highlights: itinerary.highlights,
        includes: itinerary.includes,
        difficulty: itinerary.difficulty || null,
        groupSize: itinerary.groupSize,
        rating: itinerary.rating,
        imageUrl: null // Will be added when image upload is implemented
      });
    }

    console.log("Database migration completed successfully!");
    console.log(`Inserted:`);
    console.log(`- ${contentData.accommodations.length} accommodations`);
    console.log(`- ${contentData.destinations.length} destinations`);
    console.log(`- ${contentData.itineraries.length} itineraries`);

  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }

  process.exit(0);
}

seedDatabase();