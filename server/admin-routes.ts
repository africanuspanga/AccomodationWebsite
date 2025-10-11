import type { Express, Request, Response } from "express";
import { supabase } from "./supabase";
import { 
  insertAdminBlogSchema,
  insertAdminVolunteerProgramSchema,
  insertAdminAccommodationSchema,
  insertAdminItinerarySchema,
  insertAdminDestinationSchema
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
      const { data, error } = await supabase
        .from('admin_blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // If table doesn't exist, return empty array
        if (error.message.includes('does not exist') || error.message.includes('relation')) {
          return res.json([]);
        }
        throw error;
      }
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin blog
  app.get("/api/admin/blogs/:id", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_blogs')
        .select('*')
        .eq('id', req.params.id)
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: 'Blog not found' });
    }
  });

  // Create blog
  app.post("/api/admin/blogs", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminBlogSchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_blogs')
        .insert([validated])
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update blog
  app.put("/api/admin/blogs/:id", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminBlogSchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_blogs')
        .update(validated)
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete blog
  app.delete("/api/admin/blogs/:id", isAdmin, async (req, res) => {
    try {
      const { error } = await supabase
        .from('admin_blogs')
        .delete()
        .eq('id', req.params.id);

      if (error) throw error;
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== VOLUNTEER PROGRAM ROUTES =====
  
  // Get all admin volunteer programs
  app.get("/api/admin/volunteer-programs", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_volunteer_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.message.includes('does not exist') || error.message.includes('relation')) {
          return res.json([]);
        }
        throw error;
      }
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin volunteer program
  app.get("/api/admin/volunteer-programs/:id", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_volunteer_programs')
        .select('*')
        .eq('id', req.params.id)
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: 'Volunteer program not found' });
    }
  });

  // Create volunteer program
  app.post("/api/admin/volunteer-programs", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminVolunteerProgramSchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_volunteer_programs')
        .insert([validated])
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update volunteer program
  app.put("/api/admin/volunteer-programs/:id", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminVolunteerProgramSchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_volunteer_programs')
        .update(validated)
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete volunteer program
  app.delete("/api/admin/volunteer-programs/:id", isAdmin, async (req, res) => {
    try {
      const { error } = await supabase
        .from('admin_volunteer_programs')
        .delete()
        .eq('id', req.params.id);

      if (error) throw error;
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== ACCOMMODATION ROUTES =====
  
  // Get all admin accommodations
  app.get("/api/admin/accommodations", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_accommodations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.message.includes('does not exist') || error.message.includes('relation')) {
          return res.json([]);
        }
        throw error;
      }
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin accommodation
  app.get("/api/admin/accommodations/:id", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_accommodations')
        .select('*')
        .eq('id', req.params.id)
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: 'Accommodation not found' });
    }
  });

  // Create accommodation
  app.post("/api/admin/accommodations", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminAccommodationSchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_accommodations')
        .insert([validated])
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update accommodation
  app.put("/api/admin/accommodations/:id", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminAccommodationSchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_accommodations')
        .update(validated)
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete accommodation
  app.delete("/api/admin/accommodations/:id", isAdmin, async (req, res) => {
    try {
      const { error } = await supabase
        .from('admin_accommodations')
        .delete()
        .eq('id', req.params.id);

      if (error) throw error;
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== ITINERARY ROUTES =====
  
  // Get all admin itineraries
  app.get("/api/admin/itineraries", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_itineraries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.message.includes('does not exist') || error.message.includes('relation')) {
          return res.json([]);
        }
        throw error;
      }
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin itinerary
  app.get("/api/admin/itineraries/:id", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_itineraries')
        .select('*')
        .eq('id', req.params.id)
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: 'Itinerary not found' });
    }
  });

  // Create itinerary
  app.post("/api/admin/itineraries", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminItinerarySchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_itineraries')
        .insert([validated])
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update itinerary
  app.put("/api/admin/itineraries/:id", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminItinerarySchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_itineraries')
        .update(validated)
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete itinerary
  app.delete("/api/admin/itineraries/:id", isAdmin, async (req, res) => {
    try {
      const { error } = await supabase
        .from('admin_itineraries')
        .delete()
        .eq('id', req.params.id);

      if (error) throw error;
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== DESTINATION ROUTES =====
  
  // Get all admin destinations
  app.get("/api/admin/destinations", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_destinations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.message.includes('does not exist') || error.message.includes('relation')) {
          return res.json([]);
        }
        throw error;
      }
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single admin destination
  app.get("/api/admin/destinations/:id", isAdmin, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_destinations')
        .select('*')
        .eq('id', req.params.id)
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: 'Destination not found' });
    }
  });

  // Create destination
  app.post("/api/admin/destinations", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminDestinationSchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_destinations')
        .insert([validated])
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update destination
  app.put("/api/admin/destinations/:id", isAdmin, async (req, res) => {
    try {
      const validated = insertAdminDestinationSchema.parse(req.body);
      
      const { data, error } = await supabase
        .from('admin_destinations')
        .update(validated)
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete destination
  app.delete("/api/admin/destinations/:id", isAdmin, async (req, res) => {
    try {
      const { error } = await supabase
        .from('admin_destinations')
        .delete()
        .eq('id', req.params.id);

      if (error) throw error;
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== PUBLIC ROUTES FOR MERGED CONTENT =====
  
  // Get all blogs (hardcoded + admin)
  app.get("/api/public/blogs", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Return admin blogs - hardcoded ones are handled in the frontend
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all volunteer programs (hardcoded + admin)
  app.get("/api/public/volunteer-programs", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_volunteer_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all accommodations (hardcoded + admin)
  app.get("/api/public/accommodations", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_accommodations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all itineraries (hardcoded + admin)
  app.get("/api/public/itineraries", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_itineraries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all destinations (hardcoded + admin)
  app.get("/api/public/destinations", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_destinations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
