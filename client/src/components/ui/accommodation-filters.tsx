import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RotateCcw, Filter } from 'lucide-react';

interface AccommodationFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  continental: string;
  country: string;
  destination: string;
  category: string;
}

export default function AccommodationFilters({ onFilterChange, className = '' }: AccommodationFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    continental: 'all',
    country: 'all',
    destination: 'all',
    category: 'all',
  });

  const continentals = [
    { value: 'africa', label: 'Africa' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'america', label: 'America' },
  ];

  const countries = [
    { value: 'africa', label: 'Africa' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'uganda', label: 'Uganda' },
    { value: 'rwanda', label: 'Rwanda' },
  ];

  const destinations = [
    { value: 'serengeti', label: 'Serengeti National Park' },
    { value: 'ngorongoro', label: 'Ngorongoro Conservation Area' },
    { value: 'tarangire', label: 'Tarangire National Park' },
    { value: 'manyara', label: 'Lake Manyara National Park' },
    { value: 'ruaha', label: 'Ruaha National Park' },
    { value: 'zanzibar', label: 'Zanzibar Island' },
  ];

  const categories = [
    { value: 'camping', label: 'Camping' },
    { value: 'basic', label: 'Basic' },
    { value: 'standard', label: 'Standard' },
    { value: 'mid-range', label: 'Mid Range' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'ultra-luxury', label: 'Ultra Luxury' },
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      continental: 'all',
      country: 'all',
      destination: 'all',
      category: 'all',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className={`bg-card p-6 rounded-2xl border border-border shadow-lg ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold text-primary">Filter Accommodations</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="continental-filter" className="text-sm font-medium text-foreground">
            Continental
          </Label>
          <Select value={filters.continental} onValueChange={(value) => handleFilterChange('continental', value)}>
            <SelectTrigger id="continental-filter" data-testid="continental-filter">
              <SelectValue placeholder="All Continents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Continents</SelectItem>
              {continentals.map((continental) => (
                <SelectItem key={continental.value} value={continental.value}>
                  {continental.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country-filter" className="text-sm font-medium text-foreground">
            Country
          </Label>
          <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
            <SelectTrigger id="country-filter" data-testid="country-filter">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination-filter" className="text-sm font-medium text-foreground">
            Destination
          </Label>
          <Select value={filters.destination} onValueChange={(value) => handleFilterChange('destination', value)}>
            <SelectTrigger id="destination-filter" data-testid="destination-filter">
              <SelectValue placeholder="All Destinations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Destinations</SelectItem>
              {destinations.map((destination) => (
                <SelectItem key={destination.value} value={destination.value}>
                  {destination.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category-filter" className="text-sm font-medium text-foreground">
            Category
          </Label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger id="category-filter" data-testid="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={applyFilters}
          className="btn-primary px-6 py-2 font-semibold"
          data-testid="apply-filters-button"
        >
          <Filter className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
        <Button 
          onClick={handleClearFilters}
          variant="outline"
          className="px-6 py-2 font-semibold"
          data-testid="clear-filters-button"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
    </div>
  );
}
