import { useState } from 'react';
import ItineraryCard from '@/components/ui/itinerary-card';
import SEOHead from '@/components/seo/seo-head';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContent } from '@/hooks/use-content';

export default function Itineraries() {
  const { itineraries } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Packages', count: itineraries.length },
    { value: 'day-trip', label: 'Day Trips', count: itineraries.filter(i => i.category === 'day-trip').length },
    { value: 'classic-safari', label: 'Classic Safaris', count: itineraries.filter(i => i.category === 'classic-safari').length },
    { value: 'premium', label: 'Premium', count: itineraries.filter(i => i.category === 'premium').length },
    { value: 'kilimanjaro', label: 'Kilimanjaro', count: itineraries.filter(i => i.category === 'kilimanjaro').length },
    { value: 'trekking', label: 'Trekking & Hiking', count: itineraries.filter(i => ['trekking', 'hiking'].includes(i.category)).length },
  ];

  const filteredItineraries = selectedCategory === 'all' 
    ? itineraries 
    : selectedCategory === 'trekking'
    ? itineraries.filter(itinerary => ['trekking', 'hiking'].includes(itinerary.category))
    : itineraries.filter(itinerary => itinerary.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <SEOHead 
        title="Tanzania Safari Packages & Kilimanjaro Trekking - Expert Guided Tours"
        description="Book Tanzania safari packages, Mount Kilimanjaro trekking routes, and adventure tours. Day trips, classic safaris, luxury expeditions with expert guides and accommodation included."
        canonical="/itineraries"
        ogImage="/attached_assets/Classic TanzaniaTarangire, Serengeti & Ngorongoro_1758796915224.jpg"
      />
      
      <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Safari Packages & Adventures
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Carefully crafted itineraries combining the best of Tanzania's wildlife, landscapes, and cultural experiences.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-6 py-2 font-semibold transition-all duration-200 ${
                  selectedCategory === category.value 
                    ? 'btn-primary' 
                    : 'hover:bg-primary/10'
                }`}
                data-testid={`category-filter-${category.value}`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-muted-foreground text-center">
            Showing {filteredItineraries.length} {selectedCategory === 'all' ? 'packages' : categories.find(c => c.value === selectedCategory)?.label.toLowerCase()}
          </p>
        </div>

        {/* Itineraries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="itineraries-grid">
          {filteredItineraries.length > 0 ? (
            filteredItineraries.map((itinerary) => (
              <ItineraryCard 
                key={itinerary.id} 
                itinerary={itinerary}
                data-testid={`itinerary-card-${itinerary.id}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="image-placeholder w-24 h-24 rounded-full mx-auto mb-6">
                <span className="text-xs">No results</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No packages found</h3>
              <p className="text-muted-foreground mb-6">
                Try selecting a different category to see more options.
              </p>
              <Button 
                onClick={() => setSelectedCategory('all')}
                variant="outline"
                data-testid="show-all-packages-button"
              >
                Show All Packages
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Can't Find the Perfect Package?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our expert team can create a completely customized itinerary tailored to your preferences, 
              budget, and travel dates. Let us craft your perfect Tanzania adventure.
            </p>
            <Button 
              className="btn-accent px-8 py-3 font-semibold text-lg"
              onClick={() => window.location.href = '/contact'}
              data-testid="customize-package-button"
            >
              Customize Your Package
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
