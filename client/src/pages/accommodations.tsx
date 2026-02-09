import { useState, useMemo } from 'react';
import AccommodationCard from '@/components/ui/accommodation-card';
import SEOHead from '@/components/seo/seo-head';
import AccommodationFilters, { type FilterState } from '@/components/ui/accommodation-filters';
import { useContent } from '@/hooks/use-content';

function normalizeFilterValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getInitialFiltersFromUrl(): FilterState {
  if (typeof window === 'undefined') {
    return { continental: 'all', country: 'all', destination: 'all', category: 'all' };
  }

  const params = new URLSearchParams(window.location.search);
  const getValue = (key: string) => {
    const value = params.get(key);
    return value ? normalizeFilterValue(value) : 'all';
  };

  return {
    continental: getValue('continental') !== 'all' ? getValue('continental') : getValue('continent'),
    country: getValue('country'),
    destination: getValue('destination'),
    category: getValue('category'),
  };
}

export default function Accommodations() {
  const { accommodations } = useContent();
  const [filters, setFilters] = useState<FilterState>(getInitialFiltersFromUrl);

  const filteredAccommodations = useMemo(() => {
    return accommodations
      .filter((accommodation) => {
        const accommodationContinental = normalizeFilterValue(accommodation.continental || '');
        const accommodationCountry = normalizeFilterValue(accommodation.country || '');
        const accommodationDestination = normalizeFilterValue(accommodation.destination || '');
        const accommodationCategory = normalizeFilterValue(accommodation.category || '');

        if (filters.continental !== 'all' && accommodationContinental !== filters.continental) return false;
        if (filters.country !== 'all' && accommodationCountry !== filters.country) return false;
        if (filters.destination !== 'all' && !accommodationDestination.includes(filters.destination)) return false;
        if (filters.category !== 'all' && accommodationCategory !== filters.category) return false;
        return true;
      })
      .sort((a, b) => {
        // Sort accommodations with images first
        if (a.imageUrl && !b.imageUrl) return -1;
        if (!a.imageUrl && b.imageUrl) return 1;
        return 0;
      });
  }, [accommodations, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      <SEOHead 
        title="Luxury Tanzania Accommodations - Safari Lodges & Beach Resorts"
        description="Book premium Tanzania accommodations including luxury safari lodges in Serengeti, Ngorongoro Crater, and pristine beach resorts in Zanzibar. Ultra-luxury to mid-range options available."
        canonical="/accommodations"
        ogImage="/attached_assets/four-seasons-serengeti-night_1757883337619.jpg"
      />
      
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
          filters={filters}
          accommodations={accommodations}
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
                onClick={() => setFilters({ continental: 'all', country: 'all', destination: 'all', category: 'all' })}
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
    </>
  );
}
