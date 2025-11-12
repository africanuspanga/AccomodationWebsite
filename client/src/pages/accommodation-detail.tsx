import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import SEOHead from '@/components/seo/seo-head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowLeft, Star, Wifi, Coffee, Utensils, Dumbbell, Waves, Car, Users, Home } from 'lucide-react';
import { useContent } from '@/hooks/use-content';
import type { AccommodationDetail } from '@shared/schema';

interface RoomType {
  name: string;
  description: string;
  amenities: string[];
  images: string[];
}

export default function AccommodationDetail() {
  const params = useParams();
  const slugOrId = params.id; // This can be either slug or ID
  const [, setLocation] = useLocation();
  const { accommodations } = useContent();
  const [activeTab, setActiveTab] = useState<'facilities' | 'rooms' | 'gallery' | 'terms'>('facilities');

  // Try to find by slug first, then fall back to ID for backward compatibility
  const accommodation = accommodations.find(a => a.slug === slugOrId || a.id === slugOrId);

  const { data: accommodationDetail, isLoading } = useQuery<AccommodationDetail>({
    queryKey: [`/api/accommodations/${accommodation?.id}/details`],
    enabled: !!accommodation?.id,
  });

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

  // Parse JSON data from accommodationDetail
  const rooms: RoomType[] = accommodationDetail?.rooms 
    ? JSON.parse(accommodationDetail.rooms) 
    : [];

  const galleryImages: string[] = accommodationDetail?.galleryImages || [];

  // Icon mapping for facilities
  const getFacilityIcon = (facility: string) => {
    const lowerFacility = facility.toLowerCase();
    if (lowerFacility.includes('wifi') || lowerFacility.includes('internet')) return Wifi;
    if (lowerFacility.includes('restaurant') || lowerFacility.includes('dining')) return Utensils;
    if (lowerFacility.includes('bar') || lowerFacility.includes('coffee')) return Coffee;
    if (lowerFacility.includes('gym') || lowerFacility.includes('fitness')) return Dumbbell;
    if (lowerFacility.includes('pool') || lowerFacility.includes('swimming')) return Waves;
    if (lowerFacility.includes('parking') || lowerFacility.includes('transport')) return Car;
    if (lowerFacility.includes('conference') || lowerFacility.includes('meeting')) return Users;
    return Home;
  };

  return (
    <>
      <SEOHead 
        title={`${accommodation.name} - Luxury African Accommodation`}
        description={accommodation.description}
        canonical={`/accommodations/${accommodation.slug || accommodation.id}`}
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
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="accommodation-name">
                  {accommodation.name}
                </h1>
                
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{formatDestination(accommodation.destination)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-accent">
                    {[...Array(accommodation.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed" data-testid="accommodation-description">
                    {accommodation.description}
                  </p>
                </div>

                {/* Room Types & Pricing */}
                {accommodation.roomTypes && (() => {
                  try {
                    const roomTypes = JSON.parse(accommodation.roomTypes);
                    return roomTypes && roomTypes.length > 0 ? (
                      <div className="mb-8 bg-muted/30 rounded-2xl p-6">
                        <h3 className="font-serif text-xl font-bold text-foreground mb-4">Room Types & Pricing</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {roomTypes.map((room: { roomType: string; price: number }, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                              <span className="font-medium text-foreground">{room.roomType}</span>
                              <span className="text-lg font-bold text-primary">
                                ${room.price}<span className="text-sm font-normal text-muted-foreground">/night</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  } catch (e) {
                    return null;
                  }
                })()}
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-3 mb-8 border-b border-border">
                <button
                  onClick={() => setActiveTab('facilities')}
                  className={`px-6 py-3 font-serif text-lg font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === 'facilities'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="tab-facilities"
                >
                  FACILITIES
                </button>
                <button
                  onClick={() => setActiveTab('rooms')}
                  className={`px-6 py-3 font-serif text-lg font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === 'rooms'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="tab-rooms"
                >
                  ROOMS
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
                  onClick={() => setActiveTab('terms')}
                  className={`px-6 py-3 font-serif text-lg font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === 'terms'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="tab-terms"
                >
                  TERMS & CONDITIONS
                </button>
              </div>

              {/* Tab Content */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading details...</p>
                </div>
              ) : (
                <>
                  {/* Facilities Tab */}
                  {activeTab === 'facilities' && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-6 uppercase">Our Facilities</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {accommodationDetail?.facilities && accommodationDetail.facilities.length > 0 ? (
                            accommodationDetail.facilities.map((facility, index) => {
                              const Icon = getFacilityIcon(facility);
                              return (
                                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                                  <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-foreground font-medium">{facility}</span>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-muted-foreground col-span-2">No facilities information available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rooms Tab */}
                  {activeTab === 'rooms' && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-6 uppercase">Room Types</h2>
                        {rooms.length > 0 ? (
                          <div className="space-y-8">
                            {rooms.map((room, index) => (
                              <div key={index} className="border border-border rounded-2xl overflow-hidden">
                                {/* Room Images */}
                                {room.images && room.images.length > 0 && (
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">
                                    {room.images.map((image, imgIndex) => (
                                      <div key={imgIndex} className="aspect-video rounded-lg overflow-hidden">
                                        <img 
                                          src={image} 
                                          alt={`${room.name} - ${imgIndex + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Room Details */}
                                <div className="p-6 bg-card">
                                  <h3 className="font-serif text-2xl font-bold text-primary mb-3">{room.name}</h3>
                                  <p className="text-muted-foreground mb-4 leading-relaxed">{room.description}</p>
                                  
                                  {/* Room Amenities */}
                                  {room.amenities && room.amenities.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold text-foreground mb-3">Room Amenities</h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {room.amenities.map((amenity, amenityIndex) => (
                                          <div key={amenityIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                            <span>{amenity}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No room information available</p>
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
                                  alt={`${accommodation.name} - Gallery ${index + 1}`}
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

                  {/* Terms & Conditions Tab */}
                  {activeTab === 'terms' && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-6 uppercase">Terms & Conditions</h2>
                        {accommodation.termsAndConditions ? (
                          <div className="prose prose-lg max-w-none">
                            <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
                              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                {accommodation.termsAndConditions}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No terms and conditions available. Please contact us for more information.</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
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
