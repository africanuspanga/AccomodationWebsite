import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchWidget from '@/components/ui/search-widget';
import AccommodationCard from '@/components/ui/accommodation-card';
import DestinationCard from '@/components/ui/destination-card';
import { Shield, Star, Heart, Users, ArrowRight } from 'lucide-react';
import { useContent } from '@/hooks/use-content';
import { Link } from 'wouter';
import elephantHeroImage from '@assets/beautiful-african-elephant_1757883583699.jpg';

export default function Home() {
  const { accommodations, destinations } = useContent();

  // Get featured content
  const featuredDestinations = destinations.slice(0, 6);
  const featuredAccommodations = accommodations.filter(acc => 
    ['ultra-luxury', 'luxury'].includes(acc.category)
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
      description: 'A decade of crafting unforgettable journeys has given us deep insights into Tanzania\'s hidden gems.',
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
      quote: 'Our 10th anniversary trip to Tanzania was pure magic. From the Serengeti to Zanzibar, everything exceeded our expectations. We can\'t wait to return!',
    },
    {
      name: 'Michael Peterson',
      location: 'Solo Traveler, Germany',
      rating: 5,
      quote: 'Professional, knowledgeable, and incredibly accommodating. The guides were fantastic and the lodge recommendations were spot-on. Highly recommended!',
    },
  ];

  return (
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
            Discover Tanzania's breathtaking landscapes, extraordinary wildlife, and luxury accommodations with over 10 years of trusted expertise.
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
              With over a decade of expertise in Tanzania tourism, we deliver exceptional experiences that exceed expectations.
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
              Explore Tanzania's most spectacular national parks and conservation areas, each offering unique wildlife experiences.
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
              Real experiences from families who trusted us with their Tanzania adventures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-lg" data-testid={`testimonial-${index}`}>
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
