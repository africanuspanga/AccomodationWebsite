import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star } from 'lucide-react';
import { useLocation } from 'wouter';
import type { Itinerary } from '@/hooks/use-content';

interface ItineraryCardProps {
  itinerary: Itinerary;
  className?: string;
}

export default function ItineraryCard({ itinerary, className = '' }: ItineraryCardProps) {
  const [, setLocation] = useLocation();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium':
        return 'bg-accent text-accent-foreground';
      case 'popular':
        return 'bg-primary text-primary-foreground';
      case 'day-trip':
        return 'bg-secondary text-secondary-foreground';
      case 'kilimanjaro':
        return 'bg-muted text-muted-foreground';
      case 'trekking':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group ${className}`}>
      {/* Image Container */}
      <div className="aspect-[4/3] w-full relative overflow-hidden">
        {itinerary.imageUrl ? (
          <img 
            src={itinerary.imageUrl} 
            alt={itinerary.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            data-testid={`img-itinerary-${itinerary.id}`}
          />
        ) : (
          <div className="image-placeholder w-full h-full flex items-center justify-center">
            <span className="text-sm text-center px-4">{itinerary.name}</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge className={getCategoryColor(itinerary.category)}>
            {formatCategory(itinerary.category)}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4 text-white">
          <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
            <p className="text-xs font-semibold">Starting from</p>
            <p className="text-xl font-bold">{formatPrice(itinerary.price)}</p>
            <p className="text-xs opacity-90">per person</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
          {itinerary.name}
        </h3>

        <div className="flex items-center justify-between text-muted-foreground text-sm mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{itinerary.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{itinerary.groupSize}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-accent">
            {[...Array(itinerary.rating)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {itinerary.description}
        </p>

        {/* Highlights */}
        {itinerary.highlights && itinerary.highlights.length > 0 && (
          <div className="space-y-2 mb-6">
            <h5 className="text-sm font-semibold text-foreground">Highlights:</h5>
            <div className="flex flex-wrap gap-1">
              {itinerary.highlights.slice(0, 4).map((highlight) => (
                <Badge key={highlight} variant="outline" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {itinerary.difficulty && (
          <div className="mb-4">
            <Badge variant="secondary" className="text-xs">
              {itinerary.difficulty}
            </Badge>
          </div>
        )}

        <Button 
          className="w-full btn-primary py-3 font-semibold"
          onClick={() => setLocation(`/itineraries/${itinerary.id}`)}
          data-testid={`view-details-${itinerary.id}`}
        >
          View Details & Book
        </Button>
      </div>
    </div>
  );
}
