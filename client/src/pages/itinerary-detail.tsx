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

interface PricingPackage {
  name: string;
  prices: {
    '1person': string;
    '2persons': string;
    '4persons': string;
    '6+persons': string;
  };
}

interface PricingData {
  lowSeason: {
    months: string;
    packages: PricingPackage[];
  };
  highSeason: {
    months: string;
    packages: PricingPackage[];
  };
}

export default function ItineraryDetail() {
  const params = useParams();
  const itineraryId = params.id;
  const [, setLocation] = useLocation();
  const { itineraries } = useContent();
  const [activeTab, setActiveTab] = useState<'tour-details' | 'itinerary' | 'prices' | 'terms'>('tour-details');
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const itinerary = itineraries.find(i => i.id === itineraryId);

  const { data: itineraryDetail, isLoading } = useQuery<ItineraryDetail>({
    queryKey: [`/api/itineraries/${itineraryId}/details`],
    enabled: !!itineraryId,
  });

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

  // Parse JSON data from itineraryDetail
  const dayByDay: DayByDayItem[] = itineraryDetail?.dayByDay 
    ? JSON.parse(itineraryDetail.dayByDay) 
    : [];
  
  const pricingData: PricingData | null = itineraryDetail?.pricingData 
    ? JSON.parse(itineraryDetail.pricingData) 
    : null;

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
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
                          {itineraryDetail?.whatsIncluded?.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{item}</span>
                            </div>
                          )) || (
                            <p className="text-muted-foreground col-span-2">No information available</p>
                          )}
                        </div>
                      </div>

                      {/* What's Not Included */}
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-4 uppercase">What's Not Included</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {itineraryDetail?.whatsNotIncluded?.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{item}</span>
                            </div>
                          )) || (
                            <p className="text-muted-foreground col-span-2">No information available</p>
                          )}
                        </div>
                      </div>

                      {/* What to Bring */}
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-4 uppercase">What to Bring</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {itineraryDetail?.whatToBring?.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <Star className="h-5 w-5 text-accent fill-current flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{item}</span>
                            </div>
                          )) || (
                            <p className="text-muted-foreground col-span-2">No information available</p>
                          )}
                        </div>
                      </div>
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

                  {/* Prices & Cost Tab */}
                  {activeTab === 'prices' && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-2 uppercase">Prices & Cost</h2>
                        <p className="text-muted-foreground mb-6">
                          The total Seasonal cost of this itinerary is <span className="font-semibold">Per person</span>
                        </p>

                        {pricingData ? (
                          <>
                            {/* Low Season */}
                            <div className="mb-8">
                              <h3 className="font-serif text-xl font-bold text-foreground mb-2 uppercase">Low Season</h3>
                              <p className="text-sm text-muted-foreground mb-4">{pricingData.lowSeason.months}</p>
                              
                              <div className="overflow-x-auto">
                                <table className="w-full border border-border">
                                  <thead>
                                    <tr className="bg-primary text-primary-foreground">
                                      <th className="px-4 py-3 text-left font-serif">Level</th>
                                      <th className="px-4 py-3 text-center font-serif">1 person</th>
                                      <th className="px-4 py-3 text-center font-serif">2 persons</th>
                                      <th className="px-4 py-3 text-center font-serif">4 persons</th>
                                      <th className="px-4 py-3 text-center font-serif">6+ persons</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {pricingData.lowSeason.packages.map((pkg, index) => (
                                      <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : 'bg-card'}>
                                        <td className="px-4 py-3 font-medium border-r border-border">{pkg.name}</td>
                                        <td className="px-4 py-3 text-center border-r border-border">{pkg.prices['1person']}</td>
                                        <td className="px-4 py-3 text-center border-r border-border">{pkg.prices['2persons']}</td>
                                        <td className="px-4 py-3 text-center border-r border-border">{pkg.prices['4persons']}</td>
                                        <td className="px-4 py-3 text-center">{pkg.prices['6+persons']}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* High Season */}
                            <div>
                              <h3 className="font-serif text-xl font-bold text-foreground mb-2 uppercase">High Season</h3>
                              <p className="text-sm text-muted-foreground mb-4">{pricingData.highSeason.months}</p>
                              
                              <div className="overflow-x-auto">
                                <table className="w-full border border-border">
                                  <thead>
                                    <tr className="bg-primary text-primary-foreground">
                                      <th className="px-4 py-3 text-left font-serif">Level</th>
                                      <th className="px-4 py-3 text-center font-serif">1 person</th>
                                      <th className="px-4 py-3 text-center font-serif">2 persons</th>
                                      <th className="px-4 py-3 text-center font-serif">4 persons</th>
                                      <th className="px-4 py-3 text-center font-serif">6+ persons</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {pricingData.highSeason.packages.map((pkg, index) => (
                                      <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : 'bg-card'}>
                                        <td className="px-4 py-3 font-medium border-r border-border">{pkg.name}</td>
                                        <td className="px-4 py-3 text-center border-r border-border">{pkg.prices['1person']}</td>
                                        <td className="px-4 py-3 text-center border-r border-border">{pkg.prices['2persons']}</td>
                                        <td className="px-4 py-3 text-center border-r border-border">{pkg.prices['4persons']}</td>
                                        <td className="px-4 py-3 text-center">{pkg.prices['6+persons']}</td>
                                      </tr>
                                    ))}
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
                        {(itineraryDetail?.termsAndConditions || itinerary.termsAndConditions) ? (
                          <div className="prose prose-slate max-w-none">
                            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                              {itineraryDetail?.termsAndConditions || itinerary.termsAndConditions}
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
