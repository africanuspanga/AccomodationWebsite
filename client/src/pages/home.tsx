import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/seo/seo-head';
import SearchWidget from '@/components/ui/search-widget';
import AccommodationCard from '@/components/ui/accommodation-card';
import DestinationCard from '@/components/ui/destination-card';
import { Shield, Star, Heart, Users, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useContent } from '@/hooks/use-content';
import { Link } from 'wouter';
import elephantHeroImage from '@assets/beautiful-african-elephant_1757883583699.jpg';
import googleReviewsLogo from '@assets/google-reviews-logo_1762719328160.png';
import tripadvisorLogo from '@assets/tripadvisor-logo-vector-png-trip-advisor-logo-png-720_1762719328162.webp';
import getyourguideLogo from '@assets/get-your-guide-old6003.logowik.com-removebg-preview_1762719328159.png';
import trustpilotLogo from '@assets/Trustpilot4-removebg-preview_1762719328163.png';
import tanzaniaLogo from '@assets/Tanzania-tourist-board_1762719328161.jpg';
import aptaLogo from '@assets/association_for_the_promotion_of_tourism_to_africa_small-e1605455307548_1762719328158.jpg';
import safarigoLogo from '@assets/images-removebg-preview_1762719328161.png';

export default function Home() {
  const { accommodations, destinations } = useContent();

  // Get featured content
  const featuredDestinations = destinations.slice(0, 6);
  const featuredAccommodations = accommodations.filter(acc => 
    ['ultra-luxury', 'luxury'].includes(acc.category) && acc.imageUrl
  ).slice(0, 4);

  const trustFeatures = [
    {
      icon: Shield,
      title: 'Safety First',
      description: '10+ years of experience ensuring secure, well-planned adventures with local expertise and safety protocols.',
    },
    {
      icon: Star,
      title: '10+ Years Experience',
      description: 'A decade of crafting unforgettable journeys has given us deep insights into Africa\'s hidden gems.',
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description: 'Every itinerary is carefully tailored to your preferences, creating unique memories that last a lifetime.',
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Specialized in creating seamless, enjoyable experiences for families with children of all ages.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'Family of 4, California',
      rating: 5,
      quote: 'Absolutely incredible experience! The team at Accommodation Collection crafted the perfect safari for our family. Every detail was handled with such care and professionalism.',
    },
    {
      name: 'James & Linda Roberts',
      location: 'Couple, London',
      rating: 5,
      quote: 'Our 10th anniversary trip to Africa was pure magic. From the Serengeti to Zanzibar, everything exceeded our expectations. We can\'t wait to return!',
    },
    {
      name: 'Michael Peterson',
      location: 'Solo Traveler, Germany',
      rating: 5,
      quote: 'Professional, knowledgeable, and incredibly accommodating. The guides were fantastic and the lodge recommendations were spot-on. Highly recommended!',
    },
    {
      name: 'Sophie Dubois',
      location: 'Couple, France',
      rating: 5,
      quote: 'Our Kenyan safari was nothing short of spectacular! Witnessing the Great Migration in the Maasai Mara was a dream come true. The accommodations were luxurious and the guides exceptional.',
    },
    {
      name: 'Marco & Elena Rossi',
      location: 'Family of 3, Italy',
      rating: 5,
      quote: 'Tracking mountain gorillas in Rwanda was the most profound wildlife experience of our lives. The organization was flawless, and our guides were incredibly knowledgeable about conservation.',
    },
    {
      name: 'Henrik Andersson',
      location: 'Solo Traveler, Sweden',
      rating: 5,
      quote: 'Victoria Falls took my breath away! The combination of Zimbabwe and Zambia exploration was perfectly planned. Adventure activities were thrilling and accommodations were top-notch.',
    },
  ];

  return (
    <>
      <SEOHead 
        title="Accommodation Collection - Premium Africa Travel & Safari Experiences"
        description="Discover luxury Africa safaris, Mt. Kilimanjaro treks, and premium accommodations. Expert-guided adventures featuring the Big Five, Great Migration, and pristine beaches in Zanzibar."
        canonical="/"
        ogImage="/attached_assets/beautiful-african-elephant_1757883583699.jpg"
      />
      
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${elephantHeroImage})`,
          }}
        ></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Curating Your Perfect<br />Getaway
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Discover Africa's breathtaking landscapes, extraordinary wildlife, and luxury accommodations with over 10 years of trusted expertise.
          </p>
          
          <SearchWidget className="max-w-2xl mx-auto animate-slide-up" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Our Clients Trust Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With over a decade of expertise in Africa tourism, we deliver exceptional experiences that exceed expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="text-center group">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Top Destinations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore Africa's most spectacular national parks and conservation areas, each offering unique wildlife experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination}
                data-testid={`destination-card-${destination.id}`}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/destinations">
              <Button className="btn-primary px-8 py-3 font-semibold" data-testid="view-all-destinations-button">
                View All Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Accommodations Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Featured Luxury Stays
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience world-class accommodations from intimate safari camps to beachfront resorts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredAccommodations.map((accommodation) => (
              <AccommodationCard 
                key={accommodation.id} 
                accommodation={accommodation}
                data-testid={`accommodation-card-${accommodation.id}`}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/accommodations">
              <Button className="btn-primary px-8 py-3 font-semibold" data-testid="view-all-accommodations-button">
                View All Accommodations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real experiences from families who trusted us with their Africa adventures.
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-card rounded-2xl p-8 shadow-lg h-full" data-testid={`testimonial-${index}`}>
                      <div className="flex text-accent mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                          <span className="font-semibold text-sm">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </Carousel>
        </div>
      </section>

      {/* Recommended By Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recommended By
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by leading travel platforms and tourism organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center p-4 bg-card rounded-xl hover:shadow-lg transition-shadow">
              <img src={googleReviewsLogo} alt="Google Reviews" className="h-12 md:h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 bg-card rounded-xl hover:shadow-lg transition-shadow">
              <img src={tripadvisorLogo} alt="TripAdvisor" className="h-12 md:h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 bg-card rounded-xl hover:shadow-lg transition-shadow">
              <img src={getyourguideLogo} alt="GetYourGuide" className="h-12 md:h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 bg-card rounded-xl hover:shadow-lg transition-shadow">
              <img src={trustpilotLogo} alt="Trustpilot" className="h-12 md:h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 bg-card rounded-xl hover:shadow-lg transition-shadow">
              <img src={tanzaniaLogo} alt="Tanzania Tourist Board" className="h-12 md:h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 bg-card rounded-xl hover:shadow-lg transition-shadow">
              <img src={aptaLogo} alt="APTA - Association for the Promotion of Tourism to Africa" className="h-12 md:h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 bg-card rounded-xl hover:shadow-lg transition-shadow">
              <img src={safarigoLogo} alt="Safarigo" className="h-12 md:h-16 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Let Us Help You Have a Great Trip in Africa and Around the World
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Whether you're dreaming of witnessing the Great Migration, climbing Mount Kilimanjaro, or relaxing on pristine beaches, our expert team is ready to craft your perfect adventure.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 px-10 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all" data-testid="book-tour-button">
                BOOK TOUR
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
