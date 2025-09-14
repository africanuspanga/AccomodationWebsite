import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { db } from "./db";
import { accommodations, destinations, itineraries } from "@shared/schema";
import contentData from "../client/src/data/content.json";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Auto-seed database on startup if empty
async function ensureDatabaseSeeded() {
  try {
    // Check if data already exists
    const existingAccommodations = await db.select().from(accommodations).limit(1);
    const existingDestinations = await db.select().from(destinations).limit(1);
    
    if (existingAccommodations.length > 0 && existingDestinations.length > 0) {
      log("Database already seeded, skipping auto-seed");
      return;
    }

    log("Database empty, starting auto-seed...");
    
    // Clear any existing data
    await db.delete(accommodations);
    await db.delete(destinations); 
    await db.delete(itineraries);

    // Insert accommodations with images
    const accommodationImages: Record<string, string> = {
      '1': '/attached_assets/four-seasons-serengeti-night_1757883337619.jpg',
      '2': '/attached_assets/singit sasakwa lodge_1757883337620.jpg',
      '3': '/attached_assets/serena-serengeti-dining-hut_1757883337620.jpg',
      '4': '/attached_assets/Bawe island resort_1757883337621.jpg',
      '5': '/attached_assets/Zawadi _1757883337621.jpg',
      '6': '/attached_assets/park-hyatt-zanzibar_1757886363985.jpg',
      '7': '/attached_assets/ngorongoro crater lodge_1757886363986.jpg',
      '8': '/attached_assets/Tarangire _1757886363987.webp',
      '9': '/attached_assets/Spacious-Tents-at-Kigelia-Ruaha_1757886363988.jpg',
      '10': '/attached_assets/Manyara lodge_1757886363987.jpg'
    };
    
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
        imageUrl: accommodationImages[accommodation.id] || null
      });
    }

    // Insert destinations with images
    const destinationImages: Record<string, string> = {
      '1': '/attached_assets/Serengeti _1757885374577.png',
      '2': '/attached_assets/Ngorongro_1757885374578.png',
      '3': '/attached_assets/Tarangire_1757885374578.png',
      '4': '/attached_assets/Manyara_1757885374578.jpg',
      '5': '/attached_assets/Ruaha_1757885374579.jpg',
      '6': '/attached_assets/Zanzibar_1757885374579.jpg'
    };
    
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
        imageUrl: destinationImages[destination.id] || null
      });
    }

    // Insert additional destinations
    const additionalDestinations = [
      {
        id: '7', name: 'Mount Kilimanjaro', continental: 'africa', country: 'tanzania', region: 'northern-circuit',
        description: 'Africa\'s highest peak and the world\'s tallest free-standing mountain. Experience diverse climate zones from tropical base to arctic summit.',
        highlights: ['Highest Peak in Africa', 'Diverse Climate Zones', 'Trekking Adventure', 'Uhuru Peak'],
        bestTime: 'January-March and June-October for optimal climbing conditions',
        imageUrl: '/attached_assets/Mount kILIMANAJRO _1757885640431.jpg'
      },
      {
        id: '8', name: 'Dar es Salaam', continental: 'africa', country: 'tanzania', region: 'coast',
        description: 'Tanzania\'s largest city and economic hub with vibrant culture, beautiful beaches, and rich Swahili heritage along the Indian Ocean coast.',
        highlights: ['Economic Hub', 'Swahili Culture', 'Indian Ocean Beaches', 'Modern City Life'],
        bestTime: 'June-October (dry season) for comfortable weather',
        imageUrl: '/attached_assets/Dar es SALAAM_1757885640431.jpg'
      },
      {
        id: '9', name: 'Stone Town', continental: 'africa', country: 'tanzania', region: 'coast',
        description: 'UNESCO World Heritage Site and historic heart of Zanzibar with winding alleys, ornate buildings, and centuries of cultural fusion.',
        highlights: ['UNESCO Heritage Site', 'Historic Architecture', 'Spice Markets', 'Cultural Fusion'],
        bestTime: 'June-October and December-March for pleasant temperatures',
        imageUrl: '/attached_assets/Stone Town, Znazibar_1757885640432.jpg'
      },
      {
        id: '10', name: 'Arusha', continental: 'africa', country: 'tanzania', region: 'northern-circuit',
        description: 'Gateway to northern Tanzania\'s safari circuits and home to Mount Meru, offering stunning views of Kilimanjaro on clear days.',
        highlights: ['Safari Gateway', 'Mount Meru', 'Coffee Plantations', 'Kilimanjaro Views'],
        bestTime: 'June-October (dry season) and December-March',
        imageUrl: '/attached_assets/Arusha_1757885640432.jpg'
      },
      {
        id: '11', name: 'Moshi Town', continental: 'africa', country: 'tanzania', region: 'northern-circuit',
        description: 'Gateway town to Mount Kilimanjaro with stunning mountain views, vibrant local markets, and rich coffee culture at the foot of Africa\'s highest peak.',
        highlights: ['Kilimanjaro Gateway', 'Coffee Culture', 'Mountain Views', 'Local Markets'],
        bestTime: 'January-March and June-October for clear mountain views',
        imageUrl: '/attached_assets/moshi town_1757886056292.jpg'
      },
      {
        id: '12', name: 'Pemba Island', continental: 'africa', country: 'tanzania', region: 'coast',
        description: 'Pristine spice island with untouched beaches, world-class diving, and authentic Swahili culture away from the crowds of Zanzibar.',
        highlights: ['Pristine Beaches', 'World-Class Diving', 'Spice Tours', 'Authentic Culture'],
        bestTime: 'June-October and December-March for perfect diving conditions',
        imageUrl: '/attached_assets/Pemba_1757886056293.jpg'
      },
      {
        id: '13', name: 'Mount Meru', continental: 'africa', country: 'tanzania', region: 'northern-circuit',
        description: 'Tanzania\'s second-highest mountain and perfect Kilimanjaro warm-up, offering spectacular views and diverse wildlife in Arusha National Park.',
        highlights: ['Second Highest Peak', 'Kilimanjaro Training', 'Wildlife Viewing', 'Spectacular Views'],
        bestTime: 'June-February for optimal climbing conditions',
        imageUrl: '/attached_assets/Mount mERU_1757886056294.jpg'
      },
      {
        id: '14', name: 'Rwanda', continental: 'africa', country: 'rwanda', region: 'east-africa',
        description: 'Land of a Thousand Hills famous for mountain gorilla trekking, stunning landscapes, and remarkable conservation success stories.',
        highlights: ['Mountain Gorillas', 'Conservation Success', 'Thousand Hills', 'Volcanoes National Park'],
        bestTime: 'June-September and December-February for gorilla trekking',
        imageUrl: '/attached_assets/Rwanda_1757886056294.jpg'
      },
      {
        id: '15', name: 'Kenya', continental: 'africa', country: 'kenya', region: 'east-africa',
        description: 'Home to the Great Migration\'s dramatic river crossings, Big Five wildlife, and the world-renowned Maasai Mara National Reserve.',
        highlights: ['Great Migration', 'Maasai Mara', 'Big Five', 'River Crossings'],
        bestTime: 'July-October for Great Migration river crossings',
        imageUrl: '/attached_assets/Kenya_1757886056295.jpg'
      },
      {
        id: '16', name: 'Uganda', continental: 'africa', country: 'uganda', region: 'east-africa',
        description: 'The Pearl of Africa with spectacular waterfalls, mountain gorillas, and diverse landscapes from tropical rainforests to savanna plains.',
        highlights: ['Pearl of Africa', 'Mountain Gorillas', 'Murchison Falls', 'Diverse Landscapes'],
        bestTime: 'December-February and June-August for optimal wildlife viewing',
        imageUrl: '/attached_assets/uganda_1757886056295.jpg'
      }
    ];

    for (const destination of additionalDestinations) {
      await db.insert(destinations).values(destination);
    }

    // Insert itineraries
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
        imageUrl: null
      });
    }

    log(`Auto-seed completed: ${contentData.accommodations.length} accommodations, ${contentData.destinations.length + 10} destinations, ${contentData.itineraries.length} itineraries`);
  } catch (error) {
    console.error("Auto-seed failed:", error);
  }
}

(async () => {
  // Ensure database is seeded before starting server
  await ensureDatabaseSeeded();
  
  const server = await registerRoutes(app);

  // Serve static files from attached_assets directory
  app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets'), { fallthrough: false }));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
