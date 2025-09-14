// Authentication setup based on javascript_auth_all_persistance blueprint
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, PublicUser, insertUserSchema } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

// Sanitize user data to remove sensitive information
function toPublicUser(user: SelectUser): PublicUser {
  const { password, ...publicUser } = user;
  return publicUser;
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    name: 'sessionId',
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      // Validate input with Zod
      const validatedData = insertUserSchema.extend({
        password: insertUserSchema.shape.password.min(6, "Password must be at least 6 characters"),
      }).parse(req.body);

      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const user = await storage.createUser({
        ...validatedData,
        password: await hashPassword(validatedData.password),
      });

      // Regenerate session for security
      req.session.regenerate((err) => {
        if (err) return next(err);
        
        req.login(user, (err) => {
          if (err) return next(err);
          res.status(201).json(toPublicUser(user));
        });
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
        const zodError = error as any;
        return res.status(400).json({ error: zodError.errors[0]?.message || "Invalid input" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/login", (req, res, next) => {
    // Validate input with Zod
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      passport.authenticate("local", (err: any, user: SelectUser | false) => {
        if (err) return next(err);
        if (!user) {
          return res.status(401).json({ error: "Invalid username or password" });
        }

        // Regenerate session for security
        req.session.regenerate((err) => {
          if (err) return next(err);
          
          req.login(user, (err) => {
            if (err) return next(err);
            res.status(200).json(toPublicUser(user));
          });
        });
      })(req, res, next);
    } catch (error) {
      if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
        const zodError = error as any;
        return res.status(400).json({ error: zodError.errors[0]?.message || "Invalid input" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/logout", (req, res, next) => {
    req.session.destroy((err) => {
      if (err) return next(err);
      req.logout((err) => {
        if (err) return next(err);
        res.sendStatus(200);
      });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(toPublicUser(req.user!));
  });
}