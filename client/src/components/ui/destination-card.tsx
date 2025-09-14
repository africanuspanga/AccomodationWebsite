import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';
import type { Destination } from '@/hooks/use-content';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export default function DestinationCard({ destination, className = '' }: DestinationCardProps) {
  const formatRegion = (region: string) => {
    return region
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="relative overflow-hidden rounded-2xl mb-6">
        {destination.imageUrl ? (
          <img 
            src={destination.imageUrl} 
            alt={destination.name}
            className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="image-placeholder aspect-[4/3] w-full group-hover:scale-105 transition-transform duration-300">
            <span className="text-sm">{destination.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-serif text-2xl font-semibold mb-2">{destination.name}</h3>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{formatRegion(destination.region)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-lg font-semibold text-primary">
            {destination.name}
          </h4>
          <Badge variant="secondary" className="text-xs">
            {formatRegion(destination.region)}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {destination.description}
        </p>

        {destination.highlights && destination.highlights.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-sm font-semibold text-foreground">Highlights:</h5>
            <div className="flex flex-wrap gap-1">
              {destination.highlights.slice(0, 4).map((highlight) => (
                <Badge key={highlight} variant="outline" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {destination.bestTime && (
          <div className="flex items-start space-x-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>Best time: {destination.bestTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
