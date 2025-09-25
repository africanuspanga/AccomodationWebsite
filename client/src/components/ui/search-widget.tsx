import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface SearchWidgetProps {
  className?: string;
}

export default function SearchWidget({ className = '' }: SearchWidgetProps) {
  const [continent, setContinent] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const continents = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Australia & Oceania'
  ];

  const countries = [
    // Africa
    'Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'South Africa', 'Botswana', 'Namibia', 'Zambia', 'Zimbabwe', 'Morocco', 'Egypt', 'Ghana', 'Nigeria', 'Ethiopia',
    // Asia
    'India', 'China', 'Japan', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Singapore', 'Philippines', 'South Korea', 'Nepal', 'Bhutan', 'Sri Lanka', 'Myanmar', 'Cambodia', 'Laos', 'Maldives',
    // Europe
    'United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Greece', 'Switzerland', 'Austria', 'Netherlands', 'Portugal', 'Iceland', 'Norway', 'Sweden', 'Denmark', 'Croatia', 'Turkey',
    // Middle East
    'UAE', 'Jordan', 'Israel', 'Oman', 'Qatar', 'Lebanon', 'Saudi Arabia',
    // Americas
    'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Peru', 'Colombia', 'Costa Rica', 'Ecuador',
    // Oceania
    'Australia', 'New Zealand', 'Fiji'
  ];

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

  const popularDestinations = [
    // Tanzania Top Destinations
    'Serengeti National Park',
    'Ngorongoro Conservation Area',
    'Mount Kilimanjaro',
    'Zanzibar Island',
    'Tarangire National Park',
    'Lake Manyara National Park',
    'Ruaha National Park',
    'Stone Town',
    'Dar es Salaam',
    'Arusha',
    // East Africa
    'Maasai Mara (Kenya)',
    'Amboseli National Park (Kenya)',
    'Bwindi Impenetrable Forest (Uganda)',
    'Volcanoes National Park (Rwanda)',
    'Lake Victoria',
    // Popular International
    'Kruger National Park (South Africa)',
    'Okavango Delta (Botswana)',
    'Victoria Falls (Zambia/Zimbabwe)',
    'Sossusvlei (Namibia)',
    'Marrakech (Morocco)',
    // Special Additions
    'Ibiza (Spain)',
    'Maldives',
    'Dubai (UAE)',
    'Santorini (Greece)',
    'Bali (Indonesia)'
  ];

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
              {continents.map((cont) => (
                <SelectItem key={cont} value={cont.toLowerCase().replace(/\s+/g, '-')}>
                  {cont}
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
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((ctry) => (
                <SelectItem key={ctry} value={ctry.toLowerCase().replace(/\s+/g, '-')}>
                  {ctry}
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
              <SelectValue placeholder="Select Destination" />
            </SelectTrigger>
            <SelectContent>
              {popularDestinations.map((dest) => (
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