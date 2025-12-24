import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useLocation } from 'wouter';
import SEOHead from '@/components/seo/seo-head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowLeft, Calendar, Navigation, Info, Camera, Star, Compass, Sunrise, TreePine } from 'lucide-react';
import { useContent } from '@/hooks/use-content';
import type { DestinationDetail } from '@shared/schema';

export default function DestinationDetail() {
  const params = useParams();
  const slugOrId = params.id; // Can be slug or ID
  const [, setLocation] = useLocation();
  const { destinations } = useContent();
  const [activeTab, setActiveTab] = useState<'overview' | 'wildlife' | 'activities' | 'gallery'>('overview');

  // Find by slug first, then fall back to ID for backward compatibility
  const destination = destinations.find(d => d.slug === slugOrId || d.id === slugOrId);

  const { data: destinationDetail, isLoading } = useQuery<DestinationDetail>({
    queryKey: [`/api/destinations/${destination?.id}/details`],
    enabled: !!destination?.id,
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

  // Get gallery images from destination - safely parse if it's a JSON string
  const galleryImages: string[] = (() => {
    const raw = destination.galleryImages;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  })();

  return (
    <>
      <SEOHead 
        title={`${destination.name} - Tanzania Travel Guide | Accommodation Collection`}
        description={destination.fullDescription || destinationDetail?.detailedDescription || destination.description}
        canonical={`/destinations/${destination.slug || destination.id}`}
        ogImage={destinationDetail?.imageUrl || destination.imageUrl || ''}
      />
      
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {destination.imageUrl || destinationDetail?.imageUrl ? (
          <img 
            src={destinationDetail?.imageUrl || destination.imageUrl || ''} 
            alt={destination.name}
            className="w-full h-full object-cover scale-105"
            data-testid="img-destination-hero"
          />
        ) : (
          <div className="image-placeholder w-full h-full">
            <span>{destination.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="container-custom">
            <Button 
              variant="ghost" 
              className="text-white hover:text-white/80 hover:bg-white/10 mb-6 -ml-3" 
              onClick={() => setLocation('/destinations')}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Destinations
            </Button>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-accent text-accent-foreground text-sm px-4 py-1">
                {destination.country.charAt(0).toUpperCase() + destination.country.slice(1)}
              </Badge>
              <Badge variant="outline" className="border-white/50 text-white text-sm px-4 py-1">
                {formatRegion(destination.region)}
              </Badge>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
              {destination.name}
            </h1>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <span>{formatRegion(destination.region)}, Tanzania</span>
              </div>
              {destination.bestTime && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>Best: {destination.bestTime.split(' ').slice(0, 3).join(' ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Floating Style */}
      <div className="sticky top-[88px] z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto py-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              data-testid="tab-overview"
            >
              <Info className="h-4 w-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('wildlife')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'wildlife'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              data-testid="tab-wildlife"
            >
              <TreePine className="h-4 w-4" />
              Wildlife & Nature
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'activities'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              data-testid="tab-activities"
            >
              <Compass className="h-4 w-4" />
              Activities
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              data-testid="tab-gallery"
            >
              <Camera className="h-4 w-4" />
              Gallery
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  {/* Introduction */}
                  <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Sunrise className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="font-serif text-3xl font-bold text-foreground">Discover {destination.name}</h2>
                    </div>
                    <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                      {isLoading ? 'Loading...' : destination.fullDescription || destinationDetail?.overview || destinationDetail?.detailedDescription || destination.description}
                    </p>
                  </section>

                  {/* Highlights Grid */}
                  {destination.highlights && destination.highlights.length > 0 && (
                    <section>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Top Highlights</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {destination.highlights.map((highlight, index) => (
                          <div 
                            key={highlight} 
                            className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                          >
                            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent font-bold">
                              {index + 1}
                            </div>
                            <span className="font-medium text-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Getting There */}
                  {destinationDetail?.gettingThere && (
                    <section className="bg-muted/50 rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Navigation className="h-6 w-6 text-primary" />
                        <h3 className="font-serif text-2xl font-bold text-foreground">Getting There</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{destinationDetail.gettingThere}</p>
                    </section>
                  )}
                </div>
              )}

              {/* Wildlife Tab */}
              {activeTab === 'wildlife' && (
                <div className="space-y-8">
                  <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-3xl p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center">
                        <TreePine className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="font-serif text-3xl font-bold text-foreground">Wildlife & Nature</h2>
                    </div>
                    {destinationDetail?.wildlife ? (
                      <p className="text-lg text-foreground/80 leading-relaxed">{destinationDetail.wildlife}</p>
                    ) : (
                      <p className="text-lg text-foreground/80 leading-relaxed">
                        {destination.name} is home to an incredible array of wildlife and natural wonders. 
                        From majestic elephants and lions to countless bird species, this destination offers 
                        unforgettable wildlife viewing opportunities throughout the year.
                      </p>
                    )}
                  </section>

                  {/* Best Time to Visit Card */}
                  {(destinationDetail?.bestTimeToVisit || destination.bestTime) && (
                    <section className="border-2 border-accent/30 rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar className="h-6 w-6 text-accent" />
                        <h3 className="font-serif text-2xl font-bold text-foreground">Best Time for Wildlife</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {destinationDetail?.bestTimeToVisit || destination.bestTime}
                      </p>
                    </section>
                  )}
                </div>
              )}

              {/* Activities Tab */}
              {activeTab === 'activities' && (
                <div className="space-y-8">
                  <section className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-3xl p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-2xl flex items-center justify-center">
                        <Compass className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h2 className="font-serif text-3xl font-bold text-foreground">Activities & Experiences</h2>
                    </div>
                    {destinationDetail?.activities ? (
                      <p className="text-lg text-foreground/80 leading-relaxed">{destinationDetail.activities}</p>
                    ) : (
                      <p className="text-lg text-foreground/80 leading-relaxed">
                        Experience the best of {destination.name} with our curated activities including 
                        game drives, walking safaris, cultural visits, and more. Each activity is designed 
                        to give you an authentic and memorable African experience.
                      </p>
                    )}
                  </section>

                  {/* Practical Info */}
                  {destinationDetail?.practicalInfo && (
                    <section className="bg-muted/50 rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Info className="h-6 w-6 text-primary" />
                        <h3 className="font-serif text-2xl font-bold text-foreground">Practical Information</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{destinationDetail.practicalInfo}</p>
                    </section>
                  )}
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Camera className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-3xl font-bold text-foreground">Photo Gallery</h2>
                  </div>
                  
                  {galleryImages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {galleryImages.map((image, index) => (
                        <div 
                          key={index} 
                          className={`relative overflow-hidden rounded-2xl group ${
                            index === 0 ? 'md:col-span-2 aspect-video' : 'aspect-[4/3]'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${destination.name} - Photo ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-muted/50 rounded-3xl p-12 text-center">
                      <Camera className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">No gallery images available yet</p>
                      <p className="text-muted-foreground/70 text-sm mt-2">Check back soon for stunning photos of {destination.name}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-card to-muted/30 rounded-3xl p-8 shadow-xl border border-border sticky top-[160px] space-y-8">
                {/* Destination Rating */}
                <div className="flex items-center gap-2 pb-6 border-b border-border">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Top-Rated Destination</span>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{formatRegion(destination.region)}</p>
                    </div>
                  </div>
                  
                  {destination.bestTime && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Best Time</p>
                        <p className="font-medium text-foreground text-sm">{destination.bestTime}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-6 border-t border-border">
                  <Button 
                    className="w-full btn-primary py-6 text-lg font-semibold"
                    onClick={() => setLocation('/contact')}
                    data-testid="button-plan-trip"
                  >
                    Plan Your Safari
                    <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full py-5"
                    onClick={() => setLocation('/itineraries')}
                    data-testid="button-view-tours"
                  >
                    View Safari Tours
                  </Button>
                </div>

                {/* Trust Badge */}
                <div className="bg-primary/5 rounded-2xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Expert-guided safaris with personalized experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
