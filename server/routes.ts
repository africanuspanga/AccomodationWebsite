import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertAccommodationSchema, insertDestinationSchema, insertItinerarySchema, insertVolunteerApplicationSchema, insertBookingSchema } from "@shared/schema";
// Old auth system removed - now using Supabase Auth for users
// import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for deployment monitoring
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Old auth routes removed - now using Supabase Auth for users
  // setupAuth(app);
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

  // Accommodation Details routes
  app.get("/api/accommodations/:id/details", async (req, res) => {
    try {
      const details = await storage.getAccommodationDetail(req.params.id);
      if (!details) {
        return res.status(404).json({ error: "Accommodation details not found" });
      }
      res.json(details);
    } catch (error) {
      console.error("Error fetching accommodation details:", error);
      res.status(500).json({ error: "Failed to fetch accommodation details" });
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

  // Destination Details routes
  app.get("/api/destinations/:id/details", async (req, res) => {
    try {
      const detail = await storage.getDestinationDetail(req.params.id);
      if (!detail) {
        return res.status(404).json({ error: "Destination details not found" });
      }
      res.json(detail);
    } catch (error) {
      console.error("Error fetching destination details:", error);
      res.status(500).json({ error: "Failed to fetch destination details" });
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

  // Itinerary Details routes
  app.get("/api/itineraries/:id/details", async (req, res) => {
    try {
      const details = await storage.getItineraryDetail(req.params.id);
      if (!details) {
        return res.status(404).json({ error: "Itinerary details not found" });
      }
      res.json(details);
    } catch (error) {
      console.error("Error fetching itinerary details:", error);
      res.status(500).json({ error: "Failed to fetch itinerary details" });
    }
  });

  // Volunteer Application routes
  app.post("/api/volunteer-applications", async (req, res) => {
    try {
      const validatedData = insertVolunteerApplicationSchema.parse(req.body);
      const application = await storage.createVolunteerApplication(validatedData);
      res.json({ success: true, application });
    } catch (error) {
      console.error("Error creating volunteer application:", error);
      res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.get("/api/volunteer-applications", async (req, res) => {
    try {
      const applications = await storage.getAllVolunteerApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching volunteer applications:", error);
      res.status(500).json({ error: "Failed to fetch volunteer applications" });
    }
  });

  app.get("/api/volunteer-applications/:id", async (req, res) => {
    try {
      const application = await storage.getVolunteerApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Volunteer application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error fetching volunteer application:", error);
      res.status(500).json({ error: "Failed to fetch volunteer application" });
    }
  });

  app.get("/api/volunteer-applications/program/:programId", async (req, res) => {
    try {
      const applications = await storage.getVolunteerApplicationsByProgram(req.params.programId);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching volunteer applications for program:", error);
      res.status(500).json({ error: "Failed to fetch volunteer applications for program" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.json({ success: true, booking });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  // Flight tracking route - proxy to OpenSky Network API
  app.get("/api/flights/east-africa", async (req, res) => {
    try {
      const params = new URLSearchParams({
        lamin: '-12',    // Southern boundary (Southern Tanzania)
        lamax: '6',      // Northern boundary (Northern Kenya/Ethiopia border)
        lomin: '28',     // Western boundary (Western Tanzania/Kenya)
        lomax: '45'      // Eastern boundary (Indian Ocean coast)
      });

      const response = await fetch(`https://opensky-network.org/api/states/all?${params}`);
      
      if (!response.ok) {
        throw new Error(`OpenSky API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform OpenSky array format to object format
      const transformedResponse = {
        time: data.time,
        states: data.states?.map((state: any[]) => ({
          icao24: state[0] || '',
          callsign: state[1],
          origin_country: state[2] || '',
          time_position: state[3],
          last_contact: state[4] || 0,
          longitude: state[5],
          latitude: state[6],
          baro_altitude: state[7],
          on_ground: state[8] || false,
          velocity: state[9],
          true_track: state[10],
          vertical_rate: state[11],
          sensors: state[12],
          geo_altitude: state[13],
          squawk: state[14],
          spi: state[15] || false,
          position_source: state[16] || 0,
        })) || []
      };

      res.json(transformedResponse);
    } catch (error) {
      console.error("Error fetching flight data:", error);
      res.status(500).json({ 
        error: "Failed to fetch flight data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
