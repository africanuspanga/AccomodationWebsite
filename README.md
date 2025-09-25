# Accommodation Collection - Tanzania Travel Website

A premium travel web application specializing in Tanzania tours, accommodations, and safari experiences.

## Features

- **Dynamic Accommodation Listings** - Browse luxury lodges, safari camps, and beach resorts
- **Destination Explorer** - Discover Tanzania's national parks, wildlife areas, and cultural sites  
- **Safari Itineraries** - Curated multi-day safari packages and day trips
- **Advanced Search & Filtering** - Filter by continent, country, category, and destination
- **Contact & Inquiry System** - Integrated contact forms and inquiry management
- **Responsive Design** - Mobile-optimized with beautiful UI components

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing

## Deployment on Render

This project is configured for easy deployment on Render with the included `render.yaml` configuration.

### Prerequisites

1. **GitHub Repository**: Push your code to a GitHub repository
2. **Neon Database**: Set up a PostgreSQL database on [Neon](https://neon.tech)
3. **Render Account**: Create an account on [Render](https://render.com)

### Deployment Steps

1. **Connect GitHub Repository**
   - In Render dashboard, click "New" → "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration

2. **Environment Variables**
   Set these environment variables in your Render service:
   ```
   DATABASE_URL=your_neon_database_connection_string
   NODE_ENV=production
   SESSION_SECRET=your_secure_random_string
   ```

3. **Deploy**
   - Render will automatically build and deploy your application
   - The app will be available at your Render URL (e.g., `https://your-app-name.onrender.com`)

### Build Configuration

The project includes optimized build scripts:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Health Check**: Available at `/api/health`

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Required for production:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secret key for session management
- `NODE_ENV` - Set to "production"

### Health Check

The application includes a health check endpoint at `/api/health` that returns:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

## Project Structure

```
├── client/src/           # Frontend React application
├── server/              # Backend Express application
├── shared/              # Shared types and schemas
├── attached_assets/     # Static images and assets
├── render.yaml         # Render deployment configuration
└── package.json        # Dependencies and scripts
```

## Social Media & Contact

- **Instagram**: [@accommodationcollection](https://www.instagram.com/accommodationcollection)
- **Website**: [Accommodation Collection](https://your-app-name.onrender.com)
- **Email**: accommodationcollection@gmail.com
- **Phone**: +255717523882 / +255696154521

## License

MIT License - see LICENSE file for details.