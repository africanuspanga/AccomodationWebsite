import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '@/components/seo/seo-head';
import type { FlightData, OpenSkyResponse } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plane, MapPin, Clock, ArrowUp, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';



// Major East African airports
const MAJOR_AIRPORTS = {
  'HKJK': { name: 'Jomo Kenyatta International', city: 'Nairobi, Kenya', code: 'NBO' },
  'HTDA': { name: 'Julius Nyerere International', city: 'Dar es Salaam, Tanzania', code: 'DAR' },
  'HTKJ': { name: 'Kilimanjaro International', city: 'Kilimanjaro, Tanzania', code: 'JRO' },
  'HAAB': { name: 'Addis Ababa Bole International', city: 'Addis Ababa, Ethiopia', code: 'ADD' },
  'HUEN': { name: 'Entebbe International', city: 'Entebbe, Uganda', code: 'EBB' },
  'HTZA': { name: 'Zanzibar International', city: 'Zanzibar, Tanzania', code: 'ZNZ' },
  'HTAR': { name: 'Arusha Airport', city: 'Arusha, Tanzania', code: 'ARK' }
};

const fetchFlights = async (): Promise<OpenSkyResponse> => {
  const response = await fetch('/api/flights/east-africa');
  
  if (!response.ok) {
    throw new Error('Failed to fetch flight data');
  }

  const data = await response.json();
  return data;
};

const formatAltitude = (altitude: number | null): string => {
  if (altitude === null) return 'Unknown';
  return `${Math.round(altitude * 3.28084).toLocaleString()} ft`;
};

const formatSpeed = (velocity: number | null): string => {
  if (velocity === null) return 'Unknown';
  return `${Math.round(velocity * 1.94384)} knots`;
};

const formatHeading = (track: number | null): string => {
  if (track === null) return 'Unknown';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(track / 22.5) % 16;
  return `${Math.round(track)}° ${directions[index]}`;
};

const formatLastContact = (timestamp: number): string => {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
};

export default function Flights() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds

  const { data, isLoading, error, refetch } = useQuery<OpenSkyResponse>({
    queryKey: ['flights', 'east-africa'],
    queryFn: fetchFlights,
    refetchInterval: autoRefresh ? refreshInterval : false,
    refetchIntervalInBackground: false
  });

  const flights: FlightData[] = data?.states || [];
  const activeFlights = flights.filter(flight => 
    !flight.on_ground && 
    flight.latitude !== null && 
    flight.longitude !== null
  );

  const handleRefresh = () => {
    refetch();
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  return (
    <>
      <SEOHead 
        title="Live Flight Tracker - East Africa Real-Time Flight Information"
        description="Track live flights in East Africa including Tanzania, Kenya, Uganda and Ethiopia. Real-time flight positions, altitudes, and aircraft information for East African airspace."
        canonical="/flights"
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Live Flight Tracker
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Real-time flight tracking for East Africa including Tanzania, Kenya, Uganda, and Ethiopia. 
              Monitor live aircraft movements in the region you're planning to visit.
            </p>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2"
                data-testid="refresh-flights-button"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              
              <Button 
                onClick={toggleAutoRefresh}
                variant={autoRefresh ? "default" : "outline"}
                className="flex items-center gap-2"
                data-testid="toggle-auto-refresh-button"
              >
                <Activity className="h-4 w-4" />
                Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plane className="h-5 w-5 text-primary" />
                  Active Flights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary" data-testid="active-flights-count">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : activeFlights.length}
                </div>
                <p className="text-muted-foreground text-sm">Currently airborne</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  Coverage Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">East Africa</div>
                <p className="text-muted-foreground text-sm">Kenya • Tanzania • Uganda • Ethiopia</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Last Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary" data-testid="last-updated">
                  {isLoading ? <Skeleton className="h-8 w-20" /> : 
                   data ? formatLastContact(data.time) : 'Never'}
                </div>
                <p className="text-muted-foreground text-sm">Live data feed</p>
              </CardContent>
            </Card>
          </div>

          {/* Error State */}
          {error && (
            <Card className="mb-8 border-destructive">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-destructive mb-4">
                    Unable to fetch flight data. This might be due to API rate limits or network issues.
                  </p>
                  <Button onClick={handleRefresh} variant="outline">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && !data && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Flights Grid */}
          {!isLoading && activeFlights.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="flights-grid">
              {activeFlights.map((flight) => (
                <Card key={flight.icao24} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-primary" />
                        <span className="font-mono text-lg" data-testid={`flight-callsign-${flight.icao24}`}>
                          {flight.callsign?.trim() || flight.icao24.toUpperCase()}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {flight.origin_country}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Altitude</div>
                        <div className="font-medium flex items-center gap-1" data-testid={`flight-altitude-${flight.icao24}`}>
                          <ArrowUp className="h-3 w-3" />
                          {formatAltitude(flight.baro_altitude)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Speed</div>
                        <div className="font-medium" data-testid={`flight-speed-${flight.icao24}`}>
                          {formatSpeed(flight.velocity)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Heading</div>
                        <div className="font-medium" data-testid={`flight-heading-${flight.icao24}`}>
                          {formatHeading(flight.true_track)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Last Contact</div>
                        <div className="font-medium" data-testid={`flight-contact-${flight.icao24}`}>
                          {formatLastContact(flight.last_contact)}
                        </div>
                      </div>
                    </div>
                    
                    {flight.latitude && flight.longitude && (
                      <div className="pt-2 border-t">
                        <div className="text-muted-foreground text-xs">Position</div>
                        <div className="font-mono text-sm" data-testid={`flight-position-${flight.icao24}`}>
                          {flight.latitude.toFixed(4)}°, {flight.longitude.toFixed(4)}°
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Flights State */}
          {!isLoading && !error && activeFlights.length === 0 && (
            <Card>
              <CardContent className="pt-12 pb-12">
                <div className="text-center">
                  <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Flights</h3>
                  <p className="text-muted-foreground mb-6">
                    No aircraft are currently detected in East African airspace. This could be due to:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 max-w-md mx-auto mb-6">
                    <li>• Low air traffic at this time</li>
                    <li>• Aircraft not equipped with ADS-B transponders</li>
                    <li>• Temporary data feed issues</li>
                  </ul>
                  <Button onClick={handleRefresh} variant="outline">
                    Refresh Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Information Section */}
          <Card className="mt-16">
            <CardHeader>
              <CardTitle>About Flight Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This flight tracker shows real-time aircraft positions in East African airspace using data from 
                the OpenSky Network. The system tracks aircraft equipped with ADS-B transponders flying over 
                Tanzania, Kenya, Uganda, and Ethiopia.
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">Major Airports Covered:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {Object.entries(MAJOR_AIRPORTS).map(([icao, airport]) => (
                    <div key={icao} className="flex justify-between">
                      <span>{airport.name}</span>
                      <span className="font-mono">{airport.code}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This tracker shows aircraft positions and is for informational purposes only. 
                For flight booking and schedules, please contact your preferred airline or travel agent.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}