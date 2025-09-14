import { useState, useMemo } from 'react';
import AccommodationCard from '@/components/ui/accommodation-card';
import AccommodationFilters, { type FilterState } from '@/components/ui/accommodation-filters';
import { useContent } from '@/hooks/use-content';

export default function Accommodations() {
  const { accommodations } = useContent();
  const [filters, setFilters] = useState<FilterState>({
    continental: '',
    country: '',
    destination: '',
    category: '',
  });

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter((accommodation) => {
      if (filters.continental && accommodation.continental !== filters.continental) return false;
      if (filters.country && accommodation.country !== filters.country) return false;
      if (filters.destination && accommodation.destination !== filters.destination) return false;
      if (filters.category && accommodation.category !== filters.category) return false;
      return true;
    });
  }, [accommodations, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Luxury Accommodations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our curated collection of Tanzania's finest hotels, lodges, and resorts.
          </p>
        </div>

        {/* Filters */}
        <AccommodationFilters 
          onFilterChange={handleFilterChange}
          className="mb-12"
        />

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredAccommodations.length} of {accommodations.length} accommodations
          </p>
        </div>

        {/* Accommodations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="accommodations-grid">
          {filteredAccommodations.length > 0 ? (
            filteredAccommodations.map((accommodation) => (
              <AccommodationCard 
                key={accommodation.id} 
                accommodation={accommodation}
                data-testid={`accommodation-card-${accommodation.id}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="image-placeholder w-24 h-24 rounded-full mx-auto mb-6">
                <span className="text-xs">No results</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No accommodations found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more results.
              </p>
              <button 
                onClick={() => setFilters({ continental: '', country: '', destination: '', category: '' })}
                className="text-accent hover:text-accent/80 font-semibold"
                data-testid="clear-all-filters-button"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
