import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import SEOHead from '@/components/seo/seo-head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowLeft, Check, X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useContent } from '@/hooks/use-content';
import type { ItineraryDetail } from '@shared/schema';

interface DayByDayItem {
  day: number;
  title: string;
  description: string;
}

interface SeasonPricing {
  months: string;
  prices: {
    person1: string;
    person2: string;
    person3: string;
    person4: string;
    person5: string;
    person6: string;
    person7: string;
  };
}

interface PricingData {
  lowSeason: SeasonPricing;
  highSeason: SeasonPricing;
}

export default function ItineraryDetail() {
  const params = useParams();
  const slugOrId = params.id; // Can be slug or ID
  const [, setLocation] = useLocation();
  const { itineraries, isLoading: isContentLoading } = useContent();
  const [activeTab, setActiveTab] = useState<'tour-details' | 'itinerary' | 'gallery' | 'prices' | 'terms'>('tour-details');
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Find by slug first, then fall back to ID for backward compatibility
  const itinerary = itineraries.find(i => i.slug === slugOrId || i.id === slugOrId);

  const { data: itineraryDetail, isLoading } = useQuery<ItineraryDetail>({
    queryKey: [`/api/itineraries/${itinerary?.id}/details`],
    enabled: !!itinerary?.id,
  });

  // Show loading state while content is being fetched
  if (isContentLoading) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

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

  // Parse JSON data from itinerary or itineraryDetail (prefer itinerary as it comes from main list)
  // Use safe parsing with try-catch to handle malformed JSON
  const dayByDaySource = itinerary?.dayByDay || itineraryDetail?.dayByDay;
  const dayByDay: DayByDayItem[] = (() => {
    if (!dayByDaySource) return [];
    if (Array.isArray(dayByDaySource)) return dayByDaySource;
    if (typeof dayByDaySource === 'string') {
      try {
        const parsed = JSON.parse(dayByDaySource);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  })();
  
  const pricingDataSource = itinerary?.pricingData || itineraryDetail?.pricingData;
  const pricingData: PricingData | null = (() => {
    if (!pricingDataSource) return null;
    if (typeof pricingDataSource === 'object' && pricingDataSource !== null) return pricingDataSource as PricingData;
    if (typeof pricingDataSource === 'string') {
      try {
        const parsed = JSON.parse(pricingDataSource);
        return parsed && typeof parsed === 'object' ? parsed : null;
      } catch {
        return null;
      }
    }
    return null;
  })();
  
  // Get includes data from itinerary or itineraryDetail
  const whatsIncluded = itinerary?.includes || itineraryDetail?.whatsIncluded || [];
  const whatsNotIncluded = itinerary?.whatsNotIncluded || itineraryDetail?.whatsNotIncluded || [];
  const whatToBring = itinerary?.whatToBring || itineraryDetail?.whatToBring || [];
  const optionalActivities = itinerary?.optionalActivities || itineraryDetail?.optionalActivities || [];
  const termsAndConditions = itinerary?.termsAndConditions || itineraryDetail?.termsAndConditions || null;
  
  // Get gallery images from itinerary - safely parse if it's a JSON string
  const galleryImages: string[] = (() => {
    const raw = itinerary?.galleryImages;
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

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <>
      <SEOHead 
        title={`${itinerary.name} - Tanzania Safari Package`}
        description={itinerary.description}
        canonical={`/itineraries/${itinerary.slug || itinerary.id}`}
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
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="itinerary-name">
                  {itinerary.name}
                </h1>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-3 mb-8 border-b border-border">
                <button
                  onClick={() => setActiveTab('tour-details')}
                  className={`px-6 py-3 font-serif text-lg font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === 'tour-details'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="tab-tour-details"
                >
                  TOUR DETAILS
                </button>
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`px-6 py-3 font-serif text-lg font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === 'itinerary'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="tab-itinerary"
                >
                  ITINERARY
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-6 py-3 font-serif text-lg font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === 'gallery'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="tab-gallery"
                >
                  GALLERY
                </button>
                <button
                  onClick={() => setActiveTab('prices')}
                  className={`px-6 py-3 font-serif text-lg font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === 'prices'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="tab-prices"
                >
                  PRICES & COST
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`px-6 py-3 font-serif text-lg font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === 'terms'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="tab-terms"
                >
                  TERMS AND CONDITIONS
                </button>
              </div>

              {/* Tab Content */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading details...</p>
                </div>
              ) : (
                <>
                  {/* Tour Details Tab */}
                  {activeTab === 'tour-details' && (
                    <div className="space-y-8">
                      {/* What's Included */}
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-4 uppercase">What's Included</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {whatsIncluded && whatsIncluded.length > 0 ? (
                            whatsIncluded.map((item, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">{item}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted-foreground col-span-2">No information available</p>
                          )}
                        </div>
                      </div>

                      {/* What's Not Included */}
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-4 uppercase">What's Not Included</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {whatsNotIncluded && whatsNotIncluded.length > 0 ? (
                            whatsNotIncluded.map((item, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">{item}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted-foreground col-span-2">No information available</p>
                          )}
                        </div>
                      </div>

                      {/* What to Bring */}
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-4 uppercase">What to Bring</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {whatToBring && whatToBring.length > 0 ? (
                            whatToBring.map((item, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <Star className="h-5 w-5 text-accent fill-current flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">{item}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted-foreground col-span-2">No information available</p>
                          )}
                        </div>
                      </div>

                      {/* Optional Activities */}
                      {optionalActivities && optionalActivities.length > 0 && (
                        <div>
                          <h2 className="font-serif text-2xl font-bold text-foreground mb-4 uppercase">Optional Activities</h2>
                          <div className="grid md:grid-cols-2 gap-3">
                            {optionalActivities.map((item, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <Star className="h-5 w-5 text-amber-500 fill-current flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Itinerary Tab */}
                  {activeTab === 'itinerary' && (
                    <div className="space-y-6">
                      {/* Itinerary Overview */}
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-4 uppercase">Itinerary Overview</h2>
                        <p className="text-foreground leading-relaxed">
                          {itineraryDetail?.itineraryOverview || itinerary.description}
                        </p>
                      </div>

                      {/* Day by Day */}
                      <div className="space-y-4 mt-8">
                        {dayByDay.length > 0 ? (
                          dayByDay.map((day) => (
                            <div key={day.day} className="border border-border rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleDay(day.day)}
                                className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 transition-colors"
                                data-testid={`day-${day.day}-toggle`}
                              >
                                <div className="flex items-center space-x-4">
                                  <Badge className="bg-primary text-primary-foreground">
                                    DAY {day.day}
                                  </Badge>
                                  <h3 className="font-serif text-lg font-semibold text-foreground text-left uppercase">
                                    {day.title}
                                  </h3>
                                </div>
                                {expandedDay === day.day ? (
                                  <ChevronUp className="h-5 w-5 text-primary" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-primary" />
                                )}
                              </button>
                              {expandedDay === day.day && (
                                <div className="p-4 bg-card">
                                  <p className="text-foreground leading-relaxed">{day.description}</p>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground">No day-by-day itinerary available</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Gallery Tab */}
                  {activeTab === 'gallery' && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-6 uppercase">Photo Gallery</h2>
                        {galleryImages.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {galleryImages.map((image, index) => (
                              <div key={index} className="aspect-video rounded-2xl overflow-hidden">
                                <img 
                                  src={image} 
                                  alt={`${itinerary.name} - Gallery ${index + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No gallery images available</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Prices & Cost Tab */}
                  {activeTab === 'prices' && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-2 uppercase">Prices & Cost</h2>
                        <p className="text-muted-foreground mb-6">
                          The total Seasonal cost of this itinerary is <span className="font-semibold">Per person</span>
                        </p>

                        {pricingData?.lowSeason && pricingData?.highSeason ? (
                          <>
                            {/* Low Season */}
                            <div className="mb-10">
                              <h3 className="font-serif text-xl font-bold text-foreground mb-1 uppercase tracking-wide">Low Season</h3>
                              <p className="text-sm text-muted-foreground mb-4">{pricingData.lowSeason?.months || 'April, May, November'}</p>
                              
                              <div className="overflow-x-auto rounded-lg border border-border">
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-primary text-primary-foreground">
                                      <th className="px-6 py-4 text-left font-serif text-sm uppercase tracking-wider">Group Size</th>
                                      <th className="px-6 py-4 text-right font-serif text-sm uppercase tracking-wider">Price Per Person</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    <tr className="bg-card hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">1 person</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.lowSeason?.prices?.person1 || '-'}</td>
                                    </tr>
                                    <tr className="bg-muted/30 hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">2 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.lowSeason?.prices?.person2 || '-'}</td>
                                    </tr>
                                    <tr className="bg-card hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">3 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.lowSeason?.prices?.person3 || '-'}</td>
                                    </tr>
                                    <tr className="bg-muted/30 hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">4 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.lowSeason?.prices?.person4 || '-'}</td>
                                    </tr>
                                    <tr className="bg-card hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">5 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.lowSeason?.prices?.person5 || '-'}</td>
                                    </tr>
                                    <tr className="bg-muted/30 hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">6 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.lowSeason?.prices?.person6 || '-'}</td>
                                    </tr>
                                    <tr className="bg-card hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">7 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.lowSeason?.prices?.person7 || '-'}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* High Season */}
                            <div>
                              <h3 className="font-serif text-xl font-bold text-foreground mb-1 uppercase tracking-wide">High Season</h3>
                              <p className="text-sm text-muted-foreground mb-4">{pricingData.highSeason?.months || 'Jan, Feb, Mar, Jun, Jul, Aug, Sep, Oct, Dec'}</p>
                              
                              <div className="overflow-x-auto rounded-lg border border-border">
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-primary text-primary-foreground">
                                      <th className="px-6 py-4 text-left font-serif text-sm uppercase tracking-wider">Group Size</th>
                                      <th className="px-6 py-4 text-right font-serif text-sm uppercase tracking-wider">Price Per Person</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    <tr className="bg-card hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">1 person</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.highSeason?.prices?.person1 || '-'}</td>
                                    </tr>
                                    <tr className="bg-muted/30 hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">2 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.highSeason?.prices?.person2 || '-'}</td>
                                    </tr>
                                    <tr className="bg-card hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">3 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.highSeason?.prices?.person3 || '-'}</td>
                                    </tr>
                                    <tr className="bg-muted/30 hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">4 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.highSeason?.prices?.person4 || '-'}</td>
                                    </tr>
                                    <tr className="bg-card hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">5 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.highSeason?.prices?.person5 || '-'}</td>
                                    </tr>
                                    <tr className="bg-muted/30 hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">6 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.highSeason?.prices?.person6 || '-'}</td>
                                    </tr>
                                    <tr className="bg-card hover:bg-muted/50 transition-colors">
                                      <td className="px-6 py-4 font-medium text-foreground">7 people</td>
                                      <td className="px-6 py-4 text-right text-foreground font-semibold">{pricingData.highSeason?.prices?.person7 || '-'}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p className="text-muted-foreground">No pricing information available. Starting from {formatPrice(itinerary.price)} per person.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Terms and Conditions Tab */}
                  {activeTab === 'terms' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-4 uppercase">Terms and Conditions</h2>
                        {termsAndConditions ? (
                          <div className="prose prose-slate max-w-none">
                            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                              {termsAndConditions}
                            </p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No terms and conditions available for this itinerary.</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border-2 border-primary/10 rounded-2xl p-6 sticky top-24 space-y-6">
                {/* Price Display */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">From</p>
                  <p className="text-4xl font-bold text-primary font-serif" data-testid="itinerary-price">
                    {formatPrice(itinerary.price)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">/ Per Person</p>
                </div>

                {/* Tour Highlights */}
                {(itineraryDetail?.tourHighlights && itineraryDetail.tourHighlights.length > 0) || (itinerary.highlights && itinerary.highlights.length > 0) ? (
                  <div className="pt-6 border-t border-border">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-4 uppercase">Tour Highlights</h3>
                    <div className="space-y-2">
                      {(itineraryDetail?.tourHighlights || itinerary.highlights)?.map((highlight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                          <span className="text-sm text-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Enquiry Button */}
                <Button
                  className="w-full btn-primary py-6 text-lg font-semibold"
                  onClick={() => setLocation(`/book/itinerary/${itinerary.id}`)}
                  data-testid="enquiry-now-button"
                >
                  ENQUIRY NOW
                </Button>

                {/* Map */}
                {itineraryDetail?.mapImageUrl && (
                  <div className="pt-6 border-t border-border">
                    <img 
                      src={itineraryDetail.mapImageUrl} 
                      alt="Tour Map"
                      className="w-full rounded-lg"
                      data-testid="tour-map"
                    />
                    <Button
                      variant="outline"
                      className="w-full mt-3"
                      onClick={() => itineraryDetail.mapImageUrl && window.open(itineraryDetail.mapImageUrl, '_blank')}
                      data-testid="enlarge-map-button"
                    >
                      ENLARGE MAP
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
