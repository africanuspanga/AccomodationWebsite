import { useQuery } from '@tanstack/react-query';
import { type Accommodation, type Destination, type Itinerary } from '@shared/schema';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function useContent() {
  const { data: adminAccommodations = [], isLoading: isLoadingAccommodations } = useQuery<Accommodation[]>({
    queryKey: ['/api/public/accommodations'],
    enabled: true,
  });

  const { data: adminItineraries = [], isLoading: isLoadingItineraries } = useQuery<Itinerary[]>({
    queryKey: ['/api/public/itineraries'],
    enabled: true,
  });

  const { data: adminDestinations = [], isLoading: isLoadingDestinations } = useQuery<Destination[]>({
    queryKey: ['/api/public/destinations'],
    enabled: true,
  });
 
  const accommodations: Accommodation[] = adminAccommodations.map((acc) => ({
    ...acc,
    slug: acc.slug || generateSlug(acc.name),
  }));

  const destinations: Destination[] = adminDestinations.map((dest) => ({
    ...dest,
    region: dest.region || 'other',
    slug: dest.slug || generateSlug(dest.name),
  }));

  const itineraries: Itinerary[] = adminItineraries.map((itin) => ({
    ...itin,
    slug: itin.slug || generateSlug(itin.name),
  }));

  const isLoading = isLoadingAccommodations || isLoadingItineraries || isLoadingDestinations;

  const getAccommodationsByDestination = (destination: string) => {
    if (destination === 'all') return accommodations;
    return accommodations.filter(acc => acc.destination === destination);
  };

  const getAccommodationsByCategory = (category: string) => {
    return accommodations.filter(acc => acc.category === category);
  };

  const getDestinationsByRegion = (region: string) => {
    return destinations.filter(dest => dest.region === region);
  };

  const getItinerariesByCategory = (category: string) => {
    return itineraries.filter(itin => itin.category === category);
  };

  return {
    accommodations,
    destinations,
    itineraries,
    isLoading,
    getAccommodationsByDestination,
    getAccommodationsByCategory,
    getDestinationsByRegion,
    getItinerariesByCategory,
  };
}

// Export interfaces for backward compatibility
export type { Accommodation, Destination, Itinerary };
