import { useQuery } from '@tanstack/react-query';
import { type Accommodation, type Destination, type Itinerary } from '@shared/schema';

export function useContent() {
  const { data: accommodations = [], isLoading: isLoadingAccommodations } = useQuery<Accommodation[]>({
    queryKey: ['/api/accommodations'],
  });

  const { data: destinations = [], isLoading: isLoadingDestinations } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const { data: itineraries = [], isLoading: isLoadingItineraries } = useQuery<Itinerary[]>({
    queryKey: ['/api/itineraries'],
  });

  const isLoading = isLoadingAccommodations || isLoadingDestinations || isLoadingItineraries;

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
