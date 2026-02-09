import DestinationCard from '@/components/ui/destination-card';
import SEOHead from '@/components/seo/seo-head';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { useContent } from '@/hooks/use-content';

const requestedDestinations = [
  'Nyerere National Park',
  'Mikumi National Park',
  'Katavi National Park',
  'Arusha',
  'Karatu',
  'Mbeya',
  'Mwanza',
  'Dodoma',
  'Kilimanjaro',
  'Dar es Salaam',
];

const regionLabels: Record<string, string> = {
  'northern-circuit': 'Northern Safari Circuit',
  'southern-circuit': 'Southern Safari Circuit',
  coast: 'Beaches & Islands',
};

export default function Destinations() {
  const { destinations } = useContent();

  const destinationsByRegion = destinations.reduce<Record<string, typeof destinations>>((acc, destination) => {
    const region = destination.region || 'other';
    acc[region] = acc[region] || [];
    acc[region].push(destination);
    return acc;
  }, {});

  const sortedRegions = Object.keys(destinationsByRegion).sort((a, b) => {
    const preferredOrder = ['northern-circuit', 'southern-circuit', 'coast'];
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <>
      <SEOHead 
        title="Tanzania Destinations - National Parks, Safaris & Travel Guide"
        description="Explore Tanzania's top destinations including Serengeti National Park, Ngorongoro Crater, Mount Kilimanjaro, and Zanzibar. Complete travel guide with best times to visit and highlights."
        canonical="/destinations"
        ogImage="/attached_assets/Serengeti _1757885374577.png"
      />
      
      <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Explore Tanzania
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the diverse landscapes and extraordinary wildlife that make Tanzania Africa's premier safari destination.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
            Featured Destinations
          </h2>
          <div className="flex flex-wrap gap-3">
            {requestedDestinations.map((name) => (
              <Badge key={name} variant="secondary" className="px-3 py-1.5">
                {name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-10">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="font-serif text-3xl font-bold text-foreground">Eastern Africa - Tanzania</h2>
          </div>

          {sortedRegions.length > 0 ? (
            sortedRegions.map((region) => (
              <div key={region} className="mb-12">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  {regionLabels[region] || formatRegionLabel(region)}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {destinationsByRegion[region].map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      data-testid={`destination-card-${destination.id}`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <h3 className="text-2xl font-semibold text-foreground mb-3">No destinations yet</h3>
              <p className="text-muted-foreground">
                Add destination packages from the admin dashboard and they will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

function formatRegionLabel(region: string): string {
  return region
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
