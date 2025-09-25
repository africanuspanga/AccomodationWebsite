import DestinationCard from '@/components/ui/destination-card';
import SEOHead from '@/components/seo/seo-head';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { useContent } from '@/hooks/use-content';

export default function Destinations() {
  const { destinations } = useContent();

  const northernCircuit = destinations.filter(dest => dest.region === 'northern-circuit');
  const southernCircuit = destinations.filter(dest => dest.region === 'southern-circuit');
  const coastalRegions = destinations.filter(dest => dest.region === 'coast');

  const otherCountries = [
    { name: 'Kenya', destinations: ['Maasai Mara', 'Amboseli National Park', 'Tsavo National Parks', 'Samburu National Reserve'], imageUrl: '/attached_assets/Serengeti _1757885374577.png' },
    { name: 'Uganda', destinations: ['Bwindi Impenetrable Forest', 'Queen Elizabeth National Park', 'Murchison Falls National Park'], imageUrl: '/attached_assets/Ruaha_1757885374579.jpg' },
    { name: 'Rwanda', destinations: ['Volcanoes National Park', 'Akagera National Park'], imageUrl: '/attached_assets/Ngorongro_1757885374578.png' },
  ];


  const cities = [
    { name: 'Arusha City', description: 'Safari capital and gateway to Northern Circuit parks', imageUrl: '/attached_assets/Arusha_1757885640432.jpg' },
    { name: 'Stone Town, Zanzibar', description: 'UNESCO World Heritage site with rich cultural heritage', imageUrl: '/attached_assets/Stone Town, Znazibar_1757885640432.jpg' },
    { name: 'Dar es Salaam', description: 'Commercial capital and main international gateway', imageUrl: '/attached_assets/Dar es SALAAM_1757885640431.jpg' },
    { name: 'Moshi Town', description: 'Gateway to Kilimanjaro climbing expeditions', imageUrl: '/attached_assets/Mount kILIMANAJRO _1757885640431.jpg' },
  ];

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

        {/* Eastern Africa - Tanzania Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="font-serif text-3xl font-bold text-foreground">Eastern Africa - Tanzania</h2>
          </div>
          
          {/* Northern Circuit */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-semibold text-foreground">Northern Safari Circuit</h3>
              <Badge variant="secondary" className="text-sm">
                Most Popular
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="northern-circuit-destinations">
              {northernCircuit.map((destination) => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination}
                  data-testid={`destination-card-${destination.id}`}
                />
              ))}
            </div>
          </div>

          {/* Southern Circuit */}
          {southernCircuit.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl font-semibold text-foreground">Southern Safari Circuit</h3>
                <Badge variant="outline" className="text-sm">
                  Less Crowded
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="southern-circuit-destinations">
                {southernCircuit.map((destination) => (
                  <DestinationCard 
                    key={destination.id} 
                    destination={destination}
                    data-testid={`destination-card-${destination.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Mountains & Coast */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Mountains & Coast</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coastalRegions.map((destination) => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination}
                  data-testid={`destination-card-${destination.id}`}
                />
              ))}
              
              {/* Additional mountain destinations */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div className="image-placeholder aspect-[4/3] w-full group-hover:scale-105 transition-transform duration-300">
                    <span className="text-sm">Mount Kilimanjaro</span>
                  </div>
                </div>
                <h4 className="font-serif text-lg font-semibold mb-2 text-primary">Mount Kilimanjaro</h4>
                <p className="text-muted-foreground text-sm">Africa's highest peak with multiple trekking routes to the summit</p>
              </div>
              
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div className="image-placeholder aspect-[4/3] w-full group-hover:scale-105 transition-transform duration-300">
                    <span className="text-sm">Mount Meru</span>
                  </div>
                </div>
                <h4 className="font-serif text-lg font-semibold mb-2 text-primary">Mount Meru</h4>
                <p className="text-muted-foreground text-sm">Tanzania's second-highest mountain with excellent acclimatization treks</p>
              </div>
              
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div className="image-placeholder aspect-[4/3] w-full group-hover:scale-105 transition-transform duration-300">
                    <span className="text-sm">Pemba Island</span>
                  </div>
                </div>
                <h4 className="font-serif text-lg font-semibold mb-2 text-primary">Pemba Island</h4>
                <p className="text-muted-foreground text-sm">Unspoiled island paradise perfect for diving and pristine beaches</p>
              </div>
            </div>
          </div>

          {/* Major Cities */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Major Cities & Towns</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cities.map((city) => (
                <div key={city.name} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    {city.imageUrl ? (
                      <img 
                        src={city.imageUrl} 
                        alt={city.name}
                        className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-testid={`img-city-${city.name.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                    ) : (
                      <div className="image-placeholder aspect-[4/3] w-full group-hover:scale-105 transition-transform duration-300">
                        <span className="text-sm">{city.name}</span>
                      </div>
                    )}
                  </div>
                  <h4 className="font-serif text-lg font-semibold mb-2 text-primary">{city.name}</h4>
                  <p className="text-muted-foreground text-sm">{city.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Eastern African Countries */}
          <div className="mb-12" data-testid="other-eastern-africa-section">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Other Eastern African Countries</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {otherCountries.map((country) => (
                <div key={country.name} className="bg-card rounded-2xl p-6 shadow-lg" data-testid={`country-card-${country.name.toLowerCase()}`}>
                  <div className="mb-4">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      {country.imageUrl ? (
                        <img 
                          src={country.imageUrl} 
                          alt={`${country.name} Landscape`}
                          className="aspect-[4/3] w-full object-cover"
                          data-testid={`img-country-${country.name.toLowerCase()}`}
                        />
                      ) : (
                        <div className="image-placeholder aspect-[4/3] w-full">
                          <span className="text-sm">{country.name} Landscape</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-serif text-xl font-semibold mb-2 text-primary">{country.name}</h4>
                    <Badge variant="outline" className="text-xs mb-4">
                      {country.destinations.length} Destinations
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {country.destinations.map((destination) => (
                      <div key={destination} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                        <span className="text-sm text-muted-foreground">{destination}</span>
                        <span className="text-xs text-accent">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
