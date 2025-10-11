import { useQuery } from '@tanstack/react-query';
import { type Accommodation, type Destination, type Itinerary } from '@shared/schema';
import contentData from '@/data/content.json';

export function useContent() {
  // Fetch admin-created accommodations from Supabase
  const { data: adminAccommodations = [] } = useQuery<Accommodation[]>({
    queryKey: ['/api/admin/accommodations'],
    enabled: true,
  });

  // Fetch admin-created itineraries from Supabase
  const { data: adminItineraries = [] } = useQuery<Itinerary[]>({
    queryKey: ['/api/admin/itineraries'],
    enabled: true,
  });
  // Static data with images - no API calls needed!
  const accommodationImages: Record<string, string> = {
    '1': '/attached_assets/four-seasons-serengeti-night_1757883337619.jpg',
    '2': '/attached_assets/singit sasakwa lodge_1757883337620.jpg',
    '3': '/attached_assets/serena-serengeti-dining-hut_1757883337620.jpg',
    '4': '/attached_assets/Bawe island resort_1757883337621.jpg',
    '5': '/attached_assets/Zawadi _1757883337621.jpg',
    '6': '/attached_assets/park-hyatt-zanzibar_1757886363985.jpg',
    '7': '/attached_assets/ngorongoro crater lodge_1757886363986.jpg',
    '8': '/attached_assets/Tarangire _1757886363987.webp',
    '9': '/attached_assets/Spacious-Tents-at-Kigelia-Ruaha_1757886363988.jpg',
    '10': '/attached_assets/Manyara lodge_1757886363987.jpg'
  };

  const destinationImages: Record<string, string> = {
    '1': '/attached_assets/Serengeti _1757885374577.png',
    '2': '/attached_assets/Ngorongro_1757885374578.png',
    '3': '/attached_assets/Tarangire_1757885374578.png',
    '4': '/attached_assets/Manyara_1757885374578.jpg',
    '5': '/attached_assets/Ruaha_1757885374579.jpg',
    '6': '/attached_assets/Zanzibar_1757885374579.jpg'
  };

  const itineraryImages: Record<string, string> = {
    '1': '/attached_assets/Ngorongoro_1758798006918.jpg',
    '2': '/attached_assets/Tanzania Widlife Safari_1758798006919.jpg',
    '3': '/attached_assets/Tarangire_1758798006919.jpg',
    '4': '/attached_assets/Wilderness_1758798006919.jpg',
    '5': '/attached_assets/Classic TanzaniaTarangire, Serengeti & Ngorongoro_1758798006918.jpg',
    '6': '/attached_assets/Southern Tanzania Safari Escape_1758798006918.jpg',
    '7': '/attached_assets/Tanzania\'s Southern Circuit Experience_1758798006920.jpg',
    '8': '/attached_assets/lengai_1758798006917.jpg',
    '9': '/attached_assets/Marangu_1758798006916.jpg',
    '10': '/attached_assets/Mt Meru Hiking _1758798006917.jpg',
    '11': '/attached_assets/Mschame_1758798006917.jpg',
    '12': '/attached_assets/Lemosho_1758798006918.jpg'
  };

  // Add additional destinations
  const additionalDestinations = [
    {
      id: '7',
      name: 'Mount Kilimanjaro',
      continental: 'africa',
      country: 'tanzania',
      region: 'northern-circuit',
      description: 'Africa\'s highest peak and the world\'s tallest free-standing mountain. Experience diverse climate zones from tropical base to arctic summit.',
      highlights: ['Highest Peak in Africa', 'Diverse Climate Zones', 'Trekking Adventure', 'Uhuru Peak'],
      bestTime: 'January-March and June-October for optimal climbing conditions',
      imageUrl: '/attached_assets/Mount kILIMANAJRO _1757885640431.jpg'
    },
    {
      id: '8',
      name: 'Dar es Salaam',
      continental: 'africa',
      country: 'tanzania',
      region: 'coast',
      description: 'Tanzania\'s largest city and economic hub with vibrant culture, beautiful beaches, and rich Swahili heritage along the Indian Ocean coast.',
      highlights: ['Economic Hub', 'Swahili Culture', 'Indian Ocean Beaches', 'Modern City Life'],
      bestTime: 'June-October (dry season) for comfortable weather',
      imageUrl: '/attached_assets/Dar es SALAAM_1757885640431.jpg'
    },
    {
      id: '9',
      name: 'Stone Town',
      continental: 'africa',
      country: 'tanzania',
      region: 'coast',
      description: 'UNESCO World Heritage Site and historic heart of Zanzibar with winding alleys, ornate buildings, and centuries of cultural fusion.',
      highlights: ['UNESCO Heritage Site', 'Historic Architecture', 'Spice Markets', 'Cultural Fusion'],
      bestTime: 'June-October and December-March for pleasant temperatures',
      imageUrl: '/attached_assets/Stone Town, Znazibar_1757885640432.jpg'
    },
    {
      id: '10',
      name: 'Arusha',
      continental: 'africa',
      country: 'tanzania',
      region: 'northern-circuit',
      description: 'Gateway to northern Tanzania\'s safari circuits and home to Mount Meru, offering stunning views of Kilimanjaro on clear days.',
      highlights: ['Safari Gateway', 'Mount Meru', 'Coffee Plantations', 'Kilimanjaro Views'],
      bestTime: 'June-October (dry season) and December-March',
      imageUrl: '/attached_assets/Arusha_1757885640432.jpg'
    },
    {
      id: '11',
      name: 'Moshi Town',
      continental: 'africa',
      country: 'tanzania',
      region: 'northern-circuit',
      description: 'Gateway town to Mount Kilimanjaro with stunning mountain views, vibrant local markets, and rich coffee culture at the foot of Africa\'s highest peak.',
      highlights: ['Kilimanjaro Gateway', 'Coffee Culture', 'Mountain Views', 'Local Markets'],
      bestTime: 'January-March and June-October for clear mountain views',
      imageUrl: '/attached_assets/moshi town_1757886056292.jpg'
    },
    {
      id: '12',
      name: 'Pemba Island',
      continental: 'africa',
      country: 'tanzania',
      region: 'coast',
      description: 'Pristine spice island with untouched beaches, world-class diving, and authentic Swahili culture away from the crowds of Zanzibar.',
      highlights: ['Pristine Beaches', 'World-Class Diving', 'Spice Tours', 'Authentic Culture'],
      bestTime: 'June-October and December-March for perfect diving conditions',
      imageUrl: '/attached_assets/Pemba_1757886056293.jpg'
    },
    {
      id: '13',
      name: 'Mount Meru',
      continental: 'africa',
      country: 'tanzania',
      region: 'northern-circuit',
      description: 'Tanzania\'s second-highest mountain and perfect Kilimanjaro warm-up, offering spectacular views and diverse wildlife in Arusha National Park.',
      highlights: ['Second Highest Peak', 'Kilimanjaro Training', 'Wildlife Viewing', 'Spectacular Views'],
      bestTime: 'June-February for optimal climbing conditions',
      imageUrl: '/attached_assets/Mount mERU_1757886056294.jpg'
    },
    {
      id: '14',
      name: 'Rwanda',
      continental: 'africa',
      country: 'rwanda',
      region: 'east-africa',
      description: 'Land of a Thousand Hills famous for mountain gorilla trekking, stunning landscapes, and remarkable conservation success stories.',
      highlights: ['Mountain Gorillas', 'Conservation Success', 'Thousand Hills', 'Volcanoes National Park'],
      bestTime: 'June-September and December-February for gorilla trekking',
      imageUrl: '/attached_assets/Rwanda_1757886056294.jpg'
    },
    {
      id: '15',
      name: 'Kenya',
      continental: 'africa',
      country: 'kenya',
      region: 'east-africa',
      description: 'Home to the Great Migration\'s dramatic river crossings, Big Five wildlife, and the world-renowned Maasai Mara National Reserve.',
      highlights: ['Great Migration', 'Maasai Mara', 'Big Five', 'River Crossings'],
      bestTime: 'July-October for Great Migration river crossings',
      imageUrl: '/attached_assets/Kenya_1757886056295.jpg'
    },
    {
      id: '16',
      name: 'Uganda',
      continental: 'africa',
      country: 'uganda',
      region: 'east-africa',
      description: 'The Pearl of Africa with spectacular waterfalls, mountain gorillas, and diverse landscapes from tropical rainforests to savanna plains.',
      highlights: ['Pearl of Africa', 'Mountain Gorillas', 'Murchison Falls', 'Diverse Landscapes'],
      bestTime: 'December-February and June-August for optimal wildlife viewing',
      imageUrl: '/attached_assets/uganda_1757886056295.jpg'
    }
  ];

  // Add images to hardcoded accommodations
  const hardcodedAccommodations: Accommodation[] = contentData.accommodations.map(acc => ({
    ...acc,
    imageUrl: accommodationImages[acc.id] || null
  }));

  // Merge hardcoded and admin-created accommodations
  const accommodations: Accommodation[] = [...hardcodedAccommodations, ...adminAccommodations];

  // Add images to destinations  
  const destinations: Destination[] = [
    ...contentData.destinations.map(dest => ({
      ...dest,
      imageUrl: destinationImages[dest.id] || null
    })),
    ...additionalDestinations
  ];

  // Add images to hardcoded itineraries
  const hardcodedItineraries: Itinerary[] = contentData.itineraries.map(itin => ({
    ...itin,
    difficulty: itin.difficulty || null,
    imageUrl: itineraryImages[itin.id] || null
  }));

  // Merge hardcoded and admin-created itineraries
  const itineraries: Itinerary[] = [...hardcodedItineraries, ...adminItineraries];

  const isLoading = false; // No loading since it's static data

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
