import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import SEOHead from '@/components/seo/seo-head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ArrowLeft, Calendar, Navigation, Home, Info } from 'lucide-react';
import { useContent } from '@/hooks/use-content';
import type { DestinationDetail } from '@shared/schema';

export default function DestinationDetail() {
  const params = useParams();
  const destinationId = params.id;
  const { destinations } = useContent();

  const destination = destinations.find(d => d.id === destinationId);

  const { data: destinationDetail, isLoading } = useQuery<DestinationDetail>({
    queryKey: [`/api/destinations/${destinationId}/details`],
    enabled: !!destinationId,
  });

  if (!destination) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground mb-8">The destination you're looking for doesn't exist.</p>
          <Link href="/destinations">
            <Button data-testid="button-back-to-destinations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Destinations
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatRegion = (region: string) => {
    return region
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <SEOHead 
        title={`${destination.name} - Tanzania Travel Guide | Accommodation Collection`}
        description={destinationDetail?.detailedDescription || destination.description}
        canonical={`/destinations/${destinationId}`}
        ogImage={destinationDetail?.imageUrl || destination.imageUrl || ''}
      />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        {destination.imageUrl || destinationDetail?.imageUrl ? (
          <img 
            src={destinationDetail?.imageUrl || destination.imageUrl || ''} 
            alt={destination.name}
            className="w-full h-full object-cover"
            data-testid="img-destination-hero"
          />
        ) : (
          <div className="image-placeholder w-full h-full">
            <span>{destination.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container-custom">
            <Link href="/destinations">
              <Button variant="ghost" className="text-white hover:text-white/80 mb-4" data-testid="button-back">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Destinations
              </Button>
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{formatRegion(destination.region)}</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                {destination.country}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview Section */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {isLoading ? 'Loading...' : destinationDetail?.overview || destinationDetail?.detailedDescription || destination.description}
                </p>
              </section>

              {/* Wildlife Section */}
              {destinationDetail?.wildlife && (
                <section>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Navigation className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-foreground">Wildlife</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{destinationDetail.wildlife}</p>
                </section>
              )}

              {/* Activities Section */}
              {destinationDetail?.activities && (
                <section>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Info className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-foreground">Activities</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{destinationDetail.activities}</p>
                </section>
              )}

              {/* Getting There Section */}
              {destinationDetail?.gettingThere && (
                <section>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Home className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-foreground">Getting There</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{destinationDetail.gettingThere}</p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-8 shadow-lg sticky top-24 space-y-8">
                {/* Highlights */}
                {destination.highlights && destination.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight) => (
                        <Badge key={highlight} variant="outline" className="text-sm">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Time to Visit */}
                {(destinationDetail?.bestTimeToVisit || destination.bestTime) && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-semibold text-foreground">Best Time to Visit</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {destinationDetail?.bestTimeToVisit || destination.bestTime}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-6 border-t border-border">
                  <Link href="/contact">
                    <Button className="w-full btn-primary" data-testid="button-plan-trip">
                      Plan Your Trip
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
