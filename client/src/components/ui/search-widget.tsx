import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface SearchWidgetProps {
  className?: string;
}

// Hierarchical data structure for continents, countries, and destinations
const continentData = {
  africa: {
    name: 'Africa',
    countries: {
      tanzania: {
        name: 'Tanzania',
        destinations: ['Serengeti National Park', 'Ngorongoro Conservation Area', 'Mount Kilimanjaro', 'Zanzibar Island', 'Tarangire National Park', 'Lake Manyara National Park', 'Ruaha National Park', 'Nyerere National Park', 'Stone Town', 'Dar es Salaam', 'Arusha', 'Mount Meru', 'Pemba Island', 'Moshi']
      },
      kenya: {
        name: 'Kenya',
        destinations: ['Maasai Mara National Reserve', 'Amboseli National Park', 'Tsavo National Park', 'Lake Nakuru', 'Nairobi', 'Mombasa', 'Diani Beach', 'Lake Turkana', 'Mount Kenya', 'Samburu National Reserve']
      },
      uganda: {
        name: 'Uganda',
        destinations: ['Bwindi Impenetrable Forest', 'Queen Elizabeth National Park', 'Murchison Falls', 'Kampala', 'Lake Victoria', 'Rwenzori Mountains', 'Kibale Forest']
      },
      rwanda: {
        name: 'Rwanda',
        destinations: ['Volcanoes National Park', 'Kigali', 'Lake Kivu', 'Nyungwe Forest', 'Akagera National Park']
      },
      'south-africa': {
        name: 'South Africa',
        destinations: ['Kruger National Park', 'Cape Town', 'Table Mountain', 'Garden Route', 'Johannesburg', 'Victoria & Alfred Waterfront', 'Robben Island', 'Drakensberg Mountains']
      },
      botswana: {
        name: 'Botswana',
        destinations: ['Okavango Delta', 'Chobe National Park', 'Moremi Game Reserve', 'Kalahari Desert', 'Makgadikgadi Pans']
      },
      namibia: {
        name: 'Namibia',
        destinations: ['Sossusvlei', 'Etosha National Park', 'Skeleton Coast', 'Windhoek', 'Fish River Canyon', 'Namib Desert']
      },
      zambia: {
        name: 'Zambia',
        destinations: ['Victoria Falls', 'South Luangwa National Park', 'Lower Zambezi', 'Lusaka', 'Lake Kariba']
      },
      zimbabwe: {
        name: 'Zimbabwe',
        destinations: ['Victoria Falls', 'Hwange National Park', 'Harare', 'Mana Pools', 'Great Zimbabwe Ruins']
      },
      morocco: {
        name: 'Morocco',
        destinations: ['Marrakech', 'Casablanca', 'Fes', 'Sahara Desert', 'Chefchaouen', 'Atlas Mountains']
      },
      egypt: {
        name: 'Egypt',
        destinations: ['Cairo', 'Pyramids of Giza', 'Luxor', 'Aswan', 'Red Sea', 'Alexandria', 'Nile River']
      },
      ethiopia: {
        name: 'Ethiopia',
        destinations: ['Addis Ababa', 'Lalibela', 'Simien Mountains', 'Danakil Depression', 'Axum']
      }
    }
  },
  asia: {
    name: 'Asia',
    countries: {
      maldives: {
        name: 'Maldives',
        destinations: ['Male', 'Baa Atoll', 'Ari Atoll', 'North Male Atoll', 'South Male Atoll']
      },
      thailand: {
        name: 'Thailand',
        destinations: ['Bangkok', 'Phuket', 'Chiang Mai', 'Krabi', 'Koh Samui', 'Pattaya', 'Ayutthaya']
      },
      indonesia: {
        name: 'Indonesia',
        destinations: ['Bali', 'Jakarta', 'Komodo Island', 'Yogyakarta', 'Lombok', 'Raja Ampat']
      },
      japan: {
        name: 'Japan',
        destinations: ['Tokyo', 'Kyoto', 'Osaka', 'Mount Fuji', 'Hiroshima', 'Nara', 'Hokkaido']
      },
      india: {
        name: 'India',
        destinations: ['Taj Mahal', 'Delhi', 'Mumbai', 'Rajasthan', 'Goa', 'Kerala', 'Varanasi']
      },
      'sri-lanka': {
        name: 'Sri Lanka',
        destinations: ['Colombo', 'Kandy', 'Galle', 'Sigiriya', 'Ella', 'Yala National Park']
      },
      nepal: {
        name: 'Nepal',
        destinations: ['Kathmandu', 'Mount Everest Base Camp', 'Pokhara', 'Chitwan National Park', 'Lumbini']
      }
    }
  },
  europe: {
    name: 'Europe',
    countries: {
      greece: {
        name: 'Greece',
        destinations: ['Santorini', 'Athens', 'Mykonos', 'Crete', 'Rhodes', 'Acropolis']
      },
      spain: {
        name: 'Spain',
        destinations: ['Barcelona', 'Madrid', 'Ibiza', 'Seville', 'Granada', 'Valencia', 'Mallorca']
      },
      italy: {
        name: 'Italy',
        destinations: ['Rome', 'Venice', 'Florence', 'Milan', 'Amalfi Coast', 'Tuscany', 'Sicily']
      },
      france: {
        name: 'France',
        destinations: ['Paris', 'French Riviera', 'Lyon', 'Bordeaux', 'Mont Saint-Michel', 'Provence']
      },
      iceland: {
        name: 'Iceland',
        destinations: ['Reykjavik', 'Blue Lagoon', 'Golden Circle', 'Northern Lights', 'Vatnajökull']
      }
    }
  },
  'middle-east': {
    name: 'Middle East',
    countries: {
      uae: {
        name: 'UAE',
        destinations: ['Dubai', 'Abu Dhabi', 'Burj Khalifa', 'Palm Jumeirah', 'Sheikh Zayed Mosque']
      },
      jordan: {
        name: 'Jordan',
        destinations: ['Petra', 'Amman', 'Wadi Rum', 'Dead Sea', 'Jerash']
      }
    }
  }
};

export default function SearchWidget({ className = '' }: SearchWidgetProps) {
  const [continent, setContinent] = useState('africa');
  const [country, setCountry] = useState('tanzania');
  const [category, setCategory] = useState('');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const categories = [
    'National Parks',
    'Mountains & Hills',
    'Conservation Areas',
    'Major Cities & Towns',
    'Wildlife Management Areas',
    'Coastal (Beaches & Islands)',
    'Lakes, Rivers & Waterfalls',
    'Adventure Destinations',
    'Entertainment Destinations',
    'Cultural/Historical Destinations',
    'Religious/Pilgrimage Destinations',
    'Health/Wellness Destinations',
    'Natural/Recreational Destinations',
    'Business / MICE Destinations'
  ];

  // Get available countries based on selected continent
  const availableCountries = useMemo(() => {
    if (!continent) {
      // Return all countries from Africa by default
      return Object.entries(continentData.africa.countries).map(([key, value]) => ({
        key,
        name: value.name
      }));
    }
    const continentKey = continent as keyof typeof continentData;
    const continentInfo = continentData[continentKey];
    if (!continentInfo) return [];
    return Object.entries(continentInfo.countries).map(([key, value]) => ({
      key,
      name: value.name
    }));
  }, [continent]);

  // Get available destinations based on selected country
  const availableDestinations = useMemo(() => {
    if (!country) return [];
    
    // Find the continent that contains this country
    for (const continentKey in continentData) {
      const continentInfo = continentData[continentKey as keyof typeof continentData];
      const countryData = continentInfo.countries[country as keyof typeof continentInfo.countries];
      if (countryData) {
        return countryData.destinations;
      }
    }
    return [];
  }, [country]);

  // Handle continent changes - set first available country
  useEffect(() => {
    if (continent && availableCountries.length > 0) {
      const currentCountryValid = availableCountries.some(c => c.key === country);
      if (!currentCountryValid) {
        // Set to first available country if current selection is invalid
        const firstCountry = availableCountries[0]?.key;
        if (firstCountry) {
          setCountry(firstCountry);
          setDestination('');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continent]);

  // Handle country changes - clear destination
  useEffect(() => {
    // Clear destination when country changes (but not on mount)
    const isInitialMount = continent === 'africa' && country === 'tanzania';
    if (!isInitialMount && country) {
      setDestination('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search:', { continent, country, category, destination, checkIn, checkOut });
  };

  return (
    <div className={`glass-card p-6 md:p-8 rounded-2xl shadow-2xl ${className}`}>
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Row 1: Continent, Country, Category */}
        <div className="space-y-2">
          <Label htmlFor="continent" className="text-sm font-semibold text-foreground">
            Continent
          </Label>
          <Select value={continent} onValueChange={setContinent}>
            <SelectTrigger id="continent" data-testid="continent-select">
              <SelectValue placeholder="Select Continent" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(continentData).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-semibold text-foreground">
            Country
          </Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country" data-testid="country-select">
              <SelectValue placeholder={availableCountries.length > 0 ? "Select Country" : "Select continent first"} />
            </SelectTrigger>
            <SelectContent>
              {availableCountries.map((ctry) => (
                <SelectItem key={ctry.key} value={ctry.key}>
                  {ctry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-semibold text-foreground">
            Category
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" data-testid="category-select">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Row 2: Destination, Check-in, Check-out */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-semibold text-foreground">
            Destination
          </Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger id="destination" data-testid="destination-select">
              <SelectValue placeholder={availableDestinations.length > 0 ? "Select Destination" : "Select country first"} />
            </SelectTrigger>
            <SelectContent>
              {availableDestinations.map((dest: string) => (
                <SelectItem key={dest} value={dest.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}>
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="check-in" className="text-sm font-semibold text-foreground">
            Check-in
          </Label>
          <Input
            id="check-in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-background"
            data-testid="check-in-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="check-out" className="text-sm font-semibold text-foreground">
            Check-out
          </Label>
          <Input
            id="check-out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-background"
            data-testid="check-out-input"
          />
        </div>
      </div>

      <Button
        onClick={handleSearch}
        className="w-full btn-primary py-4 text-lg font-semibold"
        data-testid="search-experiences-button"
      >
        <Search className="mr-2 h-5 w-5" />
        Search Experiences
      </Button>
    </div>
  );
}