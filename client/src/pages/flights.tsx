import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '@/components/seo/seo-head';
import type { FlightData, OpenSkyResponse } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plane, MapPin, Clock, ArrowUp, Activity, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type FlightFeedSource = 'live' | 'cached' | 'stale-cache' | 'fallback';
type FlightFeedResponse = OpenSkyResponse & {
  source?: FlightFeedSource;
  message?: string;
  updatedAt?: string;
};

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

const CLIENT_FALLBACK_FLIGHTS: Array<Omit<FlightData, 'last_contact' | 'time_position'>> = [
  {
    icao24: '43f1a1',
    callsign: 'KQ482',
    origin_country: 'Kenya',
    longitude: 36.92,
    latitude: -1.18,
    baro_altitude: 9753,
    on_ground: false,
    velocity: 232,
    true_track: 146,
    vertical_rate: -1.2,
    sensors: null,
    geo_altitude: 10012,
    squawk: null,
    spi: false,
    position_source: 0,
  },
  {
    icao24: '0804d2',
    callsign: 'TC202',
    origin_country: 'Tanzania',
    longitude: 39.19,
    latitude: -6.42,
    baro_altitude: 7315,
    on_ground: false,
    velocity: 198,
    true_track: 23,
    vertical_rate: 0.4,
    sensors: null,
    geo_altitude: 7560,
    squawk: null,
    spi: false,
    position_source: 0,
  },
  {
    icao24: '04c11b',
    callsign: 'ETH815',
    origin_country: 'Ethiopia',
    longitude: 38.86,
    latitude: 3.52,
    baro_altitude: 10668,
    on_ground: false,
    velocity: 247,
    true_track: 202,
    vertical_rate: -0.8,
    sensors: null,
    geo_altitude: 10912,
    squawk: null,
    spi: false,
    position_source: 0,
  },
  {
    icao24: '04a91c',
    callsign: 'RWD452',
    origin_country: 'Rwanda',
    longitude: 30.21,
    latitude: -1.67,
    baro_altitude: 8840,
    on_ground: false,
    velocity: 219,
    true_track: 311,
    vertical_rate: 0.6,
    sensors: null,
    geo_altitude: 9068,
    squawk: null,
    spi: false,
    position_source: 0,
  },
];

function createClientFallbackFlights(reason?: string): FlightFeedResponse {
  const now = Math.floor(Date.now() / 1000);

  return {
    time: now,
    source: 'fallback',
    updatedAt: new Date().toISOString(),
    message: reason
      ? `Live flight data could not be reached (${reason}). Showing a resilient regional sample feed.`
      : 'Live flight data could not be reached. Showing a resilient regional sample feed.',
    states: CLIENT_FALLBACK_FLIGHTS.map((flight, index) => ({
      ...flight,
      time_position: now - index * 74,
      last_contact: now - index * 51,
    })),
  };
}

const feedSourceLabel: Record<FlightFeedSource, string> = {
  live: 'Live OpenSky',
  cached: 'Cached OpenSky',
  'stale-cache': 'Cached OpenSky',
  fallback: 'Regional sample',
};

const fetchFlights = async (): Promise<FlightFeedResponse> => {
  try {
    const response = await fetch('/api/flights/east-africa', {
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'same-origin',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Flight API error:', response.status, errorText);
      throw new Error(`Failed to fetch flight data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Flight fetch error:', error);
    const reason = error instanceof Error ? error.message : undefined;
    return createClientFallbackFlights(reason);
  }
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

  const { data, isLoading, error, refetch } = useQuery<FlightFeedResponse>({
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
  const feedSource = data?.source || 'live';
  const isLiveFeed = feedSource === 'live';

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

              {data && (
                <Badge
                  variant={isLiveFeed ? 'secondary' : 'outline'}
                  className="h-10 rounded-md px-4 text-sm"
                  data-testid="flight-feed-source"
                >
                  {feedSourceLabel[feedSource]}
                </Badge>
              )}
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

          {data && !isLiveFeed && (
            <Card className="mb-8 border-amber-200 bg-amber-50 text-amber-950">
              <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-start">
                <Info className="h-5 w-5 flex-shrink-0 text-amber-700" />
                <div>
                  <p className="font-semibold">
                    {feedSource === 'fallback' ? 'Showing regional sample data' : 'Showing cached flight data'}
                  </p>
                  <p className="mt-1 text-sm text-amber-900/80">
                    {data.message || 'The free live flight feed is temporarily limited, so the page is using fallback data.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card className="mb-8 border-destructive">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-destructive font-semibold mb-2">
                    Unable to fetch flight data
                  </p>
                  <p className="text-muted-foreground mb-4 text-sm">
                    This could be due to:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 max-w-md mx-auto mb-6 text-left">
                    <li>• OpenSky Network API rate limits (429 error)</li>
                    <li>• Temporary network connectivity issues</li>
                    <li>• High traffic volume to the external API</li>
                    <li>• API service temporarily unavailable</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mb-6">
                    Error details: {error instanceof Error ? error.message : 'Unknown error'}
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
                the OpenSky Network when available. If the free data feed is rate-limited or temporarily unavailable, 
                the page uses cached data or a regional sample feed so the route remains available.
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
