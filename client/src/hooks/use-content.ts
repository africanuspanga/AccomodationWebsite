import { useState, useEffect } from 'react';
import contentData from '../data/content.json';

export interface Accommodation {
  id: string;
  name: string;
  continental: string;
  country: string;
  destination: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  features: string[];
}

export interface Destination {
  id: string;
  name: string;
  continental: string;
  country: string;
  region: string;
  description: string;
  highlights: string[];
  bestTime: string;
}

export interface Itinerary {
  id: string;
  name: string;
  duration: string;
  price: number;
  category: string;
  description: string;
  highlights: string[];
  includes: string[];
  difficulty?: string;
  groupSize: string;
  rating: number;
}

export function useContent() {
  const [accommodations] = useState<Accommodation[]>(contentData.accommodations);
  const [destinations] = useState<Destination[]>(contentData.destinations);
  const [itineraries] = useState<Itinerary[]>(contentData.itineraries);

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
    getAccommodationsByDestination,
    getAccommodationsByCategory,
    getDestinationsByRegion,
    getItinerariesByCategory,
  };
}
