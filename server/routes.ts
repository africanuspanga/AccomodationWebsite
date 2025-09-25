import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertAccommodationSchema, insertDestinationSchema, insertItinerarySchema } from "@shared/schema";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for deployment monitoring
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Setup authentication routes: /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);
  // Contact/Inquiry routes
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.json({ success: true, inquiry });
    } catch (error) {
      console.error("Error creating inquiry:", error);
      res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  // Accommodation routes
  app.get("/api/accommodations", async (req, res) => {
    try {
      const accommodations = await storage.getAllAccommodations();
      res.json(accommodations);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      res.status(500).json({ error: "Failed to fetch accommodations" });
    }
  });

  app.get("/api/accommodations/:id", async (req, res) => {
    try {
      const accommodation = await storage.getAccommodation(req.params.id);
      if (!accommodation) {
        return res.status(404).json({ error: "Accommodation not found" });
      }
      res.json(accommodation);
    } catch (error) {
      console.error("Error fetching accommodation:", error);
      res.status(500).json({ error: "Failed to fetch accommodation" });
    }
  });

  app.post("/api/accommodations", async (req, res) => {
    try {
      const validatedData = insertAccommodationSchema.parse(req.body);
      const accommodation = await storage.createAccommodation(validatedData);
      res.json(accommodation);
    } catch (error) {
      console.error("Error creating accommodation:", error);
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.put("/api/accommodations/:id", async (req, res) => {
    try {
      const validatedData = insertAccommodationSchema.partial().parse(req.body);
      const accommodation = await storage.updateAccommodation(req.params.id, validatedData);
      if (!accommodation) {
        return res.status(404).json({ error: "Accommodation not found" });
      }
      res.json(accommodation);
    } catch (error) {
      console.error("Error updating accommodation:", error);
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.delete("/api/accommodations/:id", async (req, res) => {
    try {
      const success = await storage.deleteAccommodation(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Accommodation not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting accommodation:", error);
      res.status(500).json({ error: "Failed to delete accommodation" });
    }
  });

  // Destination routes
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getAllDestinations();
      res.json(destinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      console.error("Error fetching destination:", error);
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });

  app.post("/api/destinations", async (req, res) => {
    try {
      const validatedData = insertDestinationSchema.parse(req.body);
      const destination = await storage.createDestination(validatedData);
      res.json(destination);
    } catch (error) {
      console.error("Error creating destination:", error);
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.put("/api/destinations/:id", async (req, res) => {
    try {
      const validatedData = insertDestinationSchema.partial().parse(req.body);
      const destination = await storage.updateDestination(req.params.id, validatedData);
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      console.error("Error updating destination:", error);
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.delete("/api/destinations/:id", async (req, res) => {
    try {
      const success = await storage.deleteDestination(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting destination:", error);
      res.status(500).json({ error: "Failed to delete destination" });
    }
  });

  // Itinerary routes
  app.get("/api/itineraries", async (req, res) => {
    try {
      const itineraries = await storage.getAllItineraries();
      res.json(itineraries);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      res.status(500).json({ error: "Failed to fetch itineraries" });
    }
  });

  app.get("/api/itineraries/:id", async (req, res) => {
    try {
      const itinerary = await storage.getItinerary(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      res.json(itinerary);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      res.status(500).json({ error: "Failed to fetch itinerary" });
    }
  });

  app.post("/api/itineraries", async (req, res) => {
    try {
      const validatedData = insertItinerarySchema.parse(req.body);
      const itinerary = await storage.createItinerary(validatedData);
      res.json(itinerary);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.put("/api/itineraries/:id", async (req, res) => {
    try {
      const validatedData = insertItinerarySchema.partial().parse(req.body);
      const itinerary = await storage.updateItinerary(req.params.id, validatedData);
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      res.json(itinerary);
    } catch (error) {
      console.error("Error updating itinerary:", error);
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.delete("/api/itineraries/:id", async (req, res) => {
    try {
      const success = await storage.deleteItinerary(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      res.status(500).json({ error: "Failed to delete itinerary" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
