import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowLeft, Clock, Users, Check } from 'lucide-react';
import { useContent } from '@/hooks/use-content';
import SEOHead from '@/components/seo/seo-head';

export default function ItineraryDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { itineraries } = useContent();
  
  const itinerary = itineraries.find(i => i.id === params.id);

  if (!itinerary) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Itinerary Not Found</h1>
          <Button onClick={() => setLocation('/itineraries')} data-testid="back-to-itineraries">
            Back to Itineraries
          </Button>
        </div>
      </div>
    );
  }

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
    <>
      <SEOHead 
        title={`${itinerary.name} - Tanzania Safari Package`}
        description={itinerary.description}
        canonical={`/itineraries/${itinerary.id}`}
        ogImage={itinerary.imageUrl || undefined}
      />

      <div className="pt-32 pb-20">
        <div className="container-custom">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setLocation('/itineraries')}
            className="mb-6 hover:bg-primary/10"
            data-testid="back-button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Itineraries
          </Button>

          {/* Hero Image */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
            {itinerary.imageUrl ? (
              <img 
                src={itinerary.imageUrl} 
                alt={itinerary.name}
                className="w-full h-full object-cover"
                data-testid="itinerary-image"
              />
            ) : (
              <div className="image-placeholder w-full h-full flex items-center justify-center">
                <span className="text-lg">{itinerary.name}</span>
              </div>
            )}
            <div className="absolute top-6 left-6">
              <Badge className={`${getCategoryColor(itinerary.category)} text-sm px-4 py-2`}>
                {formatCategory(itinerary.category)}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid="itinerary-name">
                  {itinerary.name}
                </h1>
                
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span className="text-lg">{itinerary.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span className="text-lg">{itinerary.groupSize}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-accent">
                    {[...Array(itinerary.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>

                {itinerary.difficulty && (
                  <Badge variant="secondary" className="text-sm mb-4">
                    {itinerary.difficulty}
                  </Badge>
                )}
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-muted-foreground leading-relaxed" data-testid="itinerary-description">
                  {itinerary.description}
                </p>
              </div>

              {/* Highlights */}
              {itinerary.highlights && itinerary.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Tour Highlights</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {itinerary.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Includes */}
              {itinerary.includes && itinerary.includes.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">What's Included</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {itinerary.includes.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-card border-2 border-primary/10 rounded-2xl p-6 sticky top-24">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                  <p className="text-4xl font-bold text-primary" data-testid="itinerary-price">
                    {formatPrice(itinerary.price)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">per person</p>
                </div>

                <Button
                  className="w-full btn-primary py-6 text-lg font-semibold"
                  onClick={() => setLocation(`/book/itinerary/${itinerary.id}`)}
                  data-testid="book-now-button"
                >
                  Book Now
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Questions? Contact us for personalized assistance
                  </p>
                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={() => setLocation('/contact')}
                    data-testid="contact-us-button"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
