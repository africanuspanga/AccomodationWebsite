import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import type { Accommodation } from '@/hooks/use-content';

interface AccommodationCardProps {
  accommodation: Accommodation;
  className?: string;
}

export default function AccommodationCard({ accommodation, className = '' }: AccommodationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDestination = (destination: string) => {
    return destination
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ultra-luxury':
        return 'bg-accent text-accent-foreground';
      case 'luxury':
        return 'bg-primary/20 text-primary';
      case 'mid-range':
        return 'bg-secondary/20 text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group ${className}`}>
      {/* Image Container */}
      <div className="aspect-[4/3] w-full relative overflow-hidden">
        {accommodation.imageUrl ? (
          <img 
            src={accommodation.imageUrl.replace('@assets/', '/attached_assets/')} 
            alt={accommodation.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="image-placeholder w-full h-full">
            <span className="text-sm">{accommodation.name}</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge className={getCategoryColor(accommodation.category)}>
            {formatCategory(accommodation.category)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-accent">
            {[...Array(accommodation.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(accommodation.price)}+
          </span>
        </div>

        <h3 className="font-serif text-xl font-semibold mb-2 text-primary">
          {accommodation.name}
        </h3>

        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{formatDestination(accommodation.destination)}, Tanzania</span>
        </div>

        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {accommodation.description}
        </p>

        {/* Features */}
        {accommodation.features && accommodation.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {accommodation.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}

        <Button 
          className="w-full btn-primary py-3 font-semibold"
          data-testid={`view-details-${accommodation.id}`}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
