import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, ArrowLeft, Check } from 'lucide-react';
import { useContent } from '@/hooks/use-content';
import SEOHead from '@/components/seo/seo-head';

export default function AccommodationDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { accommodations } = useContent();
  
  const accommodation = accommodations.find(a => a.id === params.id);

  if (!accommodation) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Accommodation Not Found</h1>
          <Button onClick={() => setLocation('/accommodations')} data-testid="back-to-accommodations">
            Back to Accommodations
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
    <>
      <SEOHead 
        title={`${accommodation.name} - Luxury Tanzania Accommodation`}
        description={accommodation.description}
        canonical={`/accommodations/${accommodation.id}`}
        ogImage={accommodation.imageUrl || undefined}
      />

      <div className="pt-32 pb-20">
        <div className="container-custom">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setLocation('/accommodations')}
            className="mb-6 hover:bg-primary/10"
            data-testid="back-button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Accommodations
          </Button>

          {/* Hero Image */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
            {accommodation.imageUrl ? (
              <img 
                src={accommodation.imageUrl} 
                alt={accommodation.name}
                className="w-full h-full object-cover"
                data-testid="accommodation-image"
              />
            ) : (
              <div className="image-placeholder w-full h-full flex items-center justify-center">
                <span className="text-lg">{accommodation.name}</span>
              </div>
            )}
            <div className="absolute top-6 left-6">
              <Badge className={`${getCategoryColor(accommodation.category)} text-sm px-4 py-2`}>
                {formatCategory(accommodation.category)}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid="accommodation-name">
                  {accommodation.name}
                </h1>
                
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{formatDestination(accommodation.destination)}, Africa</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-accent">
                    {[...Array(accommodation.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-muted-foreground leading-relaxed" data-testid="accommodation-description">
                  {accommodation.description}
                </p>
              </div>

              {/* Features */}
              {accommodation.features && accommodation.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Amenities & Features</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {accommodation.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
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
                  <p className="text-4xl font-bold text-primary" data-testid="accommodation-price">
                    {accommodation.price ? formatPrice(accommodation.price) + '+' : 'Price on request'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">per night</p>
                </div>

                <Button
                  className="w-full btn-primary py-6 text-lg font-semibold"
                  onClick={() => setLocation(`/book/accommodation/${accommodation.id}`)}
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
