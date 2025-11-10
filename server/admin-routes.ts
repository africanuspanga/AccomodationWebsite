import type { Express, Request, Response } from "express";
import { storage } from "./storage";
import { 
  insertAdminBlogSchema,
  insertAdminVolunteerProgramSchema,
  insertAdminAccommodationSchema,
  insertAdminItinerarySchema,
  insertAdminDestinationSchema,
} from "@shared/schema";

// Simple admin check middleware
function isAdmin(req: Request, res: Response, next: Function) {
  const adminToken = req.headers.authorization?.replace('Bearer ', '');
  
  // Simple token check - in production you'd want something more secure
  if (adminToken === 'admin-session-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

export function registerAdminRoutes(app: Express) {
  // Admin login route - simple check
  app.post("/api/admin/login", async (req, res) => {
    const { email, password } = req.body;
    
    if (email === 'admin@accommodations.guide' && password === 'Guide@1961') {
      res.json({ 
        success: true, 
        token: 'admin-session-token',
        user: { email: 'admin@accommodations.guide' }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  // ===== BLOG ROUTES =====
  
  // Get all admin blogs
  app.get("/api/admin/blogs", isAdmin, async (req, res) => {
    try {
      const blogs = await storage.getAllAdminBlogs();
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin blog
  app.get("/api/admin/blogs/:id", isAdmin, async (req, res) => {
    try {
      const blog = await storage.getAdminBlog(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(blog);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create admin blog
  app.post("/api/admin/blogs", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminBlogSchema.parse(req.body);
      const blog = await storage.createAdminBlog(validatedData);
      res.json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update admin blog
  app.put("/api/admin/blogs/:id", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminBlogSchema.partial().parse(req.body);
      const blog = await storage.updateAdminBlog(req.params.id, validatedData);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete admin blog
  app.delete("/api/admin/blogs/:id", isAdmin, async (req, res) => {
    try {
      const success = await storage.deleteAdminBlog(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== VOLUNTEER PROGRAMS ROUTES =====
  
  // Get all admin volunteer programs
  app.get("/api/admin/volunteer-programs", isAdmin, async (req, res) => {
    try {
      const programs = await storage.getAllAdminVolunteerPrograms();
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin volunteer program
  app.get("/api/admin/volunteer-programs/:id", isAdmin, async (req, res) => {
    try {
      const program = await storage.getAdminVolunteerProgram(req.params.id);
      if (!program) {
        return res.status(404).json({ error: 'Volunteer program not found' });
      }
      res.json(program);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create admin volunteer program
  app.post("/api/admin/volunteer-programs", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminVolunteerProgramSchema.parse(req.body);
      const program = await storage.createAdminVolunteerProgram(validatedData);
      res.json(program);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update admin volunteer program
  app.put("/api/admin/volunteer-programs/:id", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminVolunteerProgramSchema.partial().parse(req.body);
      const program = await storage.updateAdminVolunteerProgram(req.params.id, validatedData);
      if (!program) {
        return res.status(404).json({ error: 'Volunteer program not found' });
      }
      res.json(program);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete admin volunteer program
  app.delete("/api/admin/volunteer-programs/:id", isAdmin, async (req, res) => {
    try {
      const success = await storage.deleteAdminVolunteerProgram(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Volunteer program not found' });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== ACCOMMODATIONS ROUTES =====
  
  // Get all admin accommodations
  app.get("/api/admin/accommodations", isAdmin, async (req, res) => {
    try {
      const accommodations = await storage.getAllAdminAccommodations();
      res.json(accommodations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin accommodation
  app.get("/api/admin/accommodations/:id", isAdmin, async (req, res) => {
    try {
      const accommodation = await storage.getAdminAccommodation(req.params.id);
      if (!accommodation) {
        return res.status(404).json({ error: 'Accommodation not found' });
      }
      res.json(accommodation);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create admin accommodation
  app.post("/api/admin/accommodations", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminAccommodationSchema.parse(req.body);
      const accommodation = await storage.createAdminAccommodation(validatedData);
      res.json(accommodation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update admin accommodation
  app.put("/api/admin/accommodations/:id", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminAccommodationSchema.partial().parse(req.body);
      const accommodation = await storage.updateAdminAccommodation(req.params.id, validatedData);
      if (!accommodation) {
        return res.status(404).json({ error: 'Accommodation not found' });
      }
      res.json(accommodation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete admin accommodation
  app.delete("/api/admin/accommodations/:id", isAdmin, async (req, res) => {
    try {
      const success = await storage.deleteAdminAccommodation(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Accommodation not found' });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== ITINERARIES ROUTES =====
  
  // Get all admin itineraries
  app.get("/api/admin/itineraries", isAdmin, async (req, res) => {
    try {
      const itineraries = await storage.getAllAdminItineraries();
      res.json(itineraries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin itinerary
  app.get("/api/admin/itineraries/:id", isAdmin, async (req, res) => {
    try {
      const itinerary = await storage.getAdminItinerary(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ error: 'Itinerary not found' });
      }
      res.json(itinerary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create admin itinerary
  app.post("/api/admin/itineraries", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminItinerarySchema.parse(req.body);
      const itinerary = await storage.createAdminItinerary(validatedData);
      res.json(itinerary);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update admin itinerary
  app.put("/api/admin/itineraries/:id", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminItinerarySchema.partial().parse(req.body);
      const itinerary = await storage.updateAdminItinerary(req.params.id, validatedData);
      if (!itinerary) {
        return res.status(404).json({ error: 'Itinerary not found' });
      }
      res.json(itinerary);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete admin itinerary
  app.delete("/api/admin/itineraries/:id", isAdmin, async (req, res) => {
    try {
      const success = await storage.deleteAdminItinerary(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Itinerary not found' });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== DESTINATIONS ROUTES =====
  
  // Get all admin destinations
  app.get("/api/admin/destinations", isAdmin, async (req, res) => {
    try {
      const destinations = await storage.getAllAdminDestinations();
      res.json(destinations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin destination
  app.get("/api/admin/destinations/:id", isAdmin, async (req, res) => {
    try {
      const destination = await storage.getAdminDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ error: 'Destination not found' });
      }
      res.json(destination);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create admin destination
  app.post("/api/admin/destinations", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminDestinationSchema.parse(req.body);
      const destination = await storage.createAdminDestination(validatedData);
      res.json(destination);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update admin destination
  app.put("/api/admin/destinations/:id", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminDestinationSchema.partial().parse(req.body);
      const destination = await storage.updateAdminDestination(req.params.id, validatedData);
      if (!destination) {
        return res.status(404).json({ error: 'Destination not found' });
      }
      res.json(destination);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete admin destination
  app.delete("/api/admin/destinations/:id", isAdmin, async (req, res) => {
    try {
      const success = await storage.deleteAdminDestination(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Destination not found' });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== PUBLIC ROUTES (no auth required) =====
  
  // Get all public blogs
  app.get("/api/public/blogs", async (req, res) => {
    try {
      const blogs = await storage.getAllAdminBlogs();
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all public volunteer programs
  app.get("/api/public/volunteer-programs", async (req, res) => {
    try {
      const programs = await storage.getAllAdminVolunteerPrograms();
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all public accommodations
  app.get("/api/public/accommodations", async (req, res) => {
    try {
      const accommodations = await storage.getAllAdminAccommodations();
      res.json(accommodations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all public itineraries
  app.get("/api/public/itineraries", async (req, res) => {
    try {
      const itineraries = await storage.getAllAdminItineraries();
      res.json(itineraries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all public destinations
  app.get("/api/public/destinations", async (req, res) => {
    try {
      const destinations = await storage.getAllAdminDestinations();
      res.json(destinations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
