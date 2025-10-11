import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'wouter';
import { MapPin, Clock, Users, DollarSign, Heart, Plane } from 'lucide-react';
import SEOHead from '@/components/seo/seo-head';
import { volunteerPrograms } from '@/data/volunteer-programs';
import { useQuery } from '@tanstack/react-query';

interface AdminVolunteerProgram {
  id: string;
  title: string;
  location: string;
  country: string;
  flag: string;
  minAge: string;
  duration: string;
  cost: string;
  focusAreas: string[];
  image: string;
  description: string;
  fullExplanation: string;
  activities: string;
  highlights: string[];
}

export default function VolunteersProgram() {
  // Fetch admin-created volunteer programs
  const { data: adminPrograms = [] } = useQuery<AdminVolunteerProgram[]>({
    queryKey: ['/api/public/volunteer-programs'],
    enabled: true,
  });

  // Transform admin programs to match VolunteerProgram interface
  const transformedAdminPrograms = adminPrograms.map(program => ({
    id: program.id,
    title: program.title,
    location: program.location,
    country: program.country,
    flag: program.flag,
    minAge: program.minAge,
    duration: program.duration,
    cost: program.cost,
    focusAreas: program.focusAreas || [],
    image: program.image,
    description: program.description,
    fullExplanation: program.fullExplanation,
    activities: typeof program.activities === 'string' 
      ? JSON.parse(program.activities) 
      : program.activities,
    highlights: program.highlights || [],
  }));

  // Merge admin programs with hardcoded programs
  const allPrograms = [...transformedAdminPrograms, ...volunteerPrograms];

  return (
    <>
      <SEOHead 
        title="Africa Volunteer Programs - Make a Difference | Accommodation Collection"
        description="Join our meaningful volunteer programs across Africa. From wildlife conservation to education, find the perfect opportunity to make a lasting impact while experiencing African culture."
        canonical="/volunteers-program"
        ogImage="/attached_assets/maasai immersion _1759178768271.jpg"
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Africa Volunteer Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Make a meaningful difference while experiencing the rich cultures and breathtaking landscapes of Africa. 
              Choose from our carefully selected volunteer opportunities that combine purpose with adventure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-primary" />
                <span>Multiple African Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>1-16 Weeks Duration</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>All Ages Welcome</span>
              </div>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPrograms.map((program) => (
              <Card 
                key={program.id} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-card"
                data-testid={`program-card-${program.id}`}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        <span className="mr-1">{program.flag}</span>
                        {program.country}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 text-primary border-primary">
                        from {program.cost}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Age {program.minAge}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {program.focusAreas.map((area) => (
                      <Badge 
                        key={area} 
                        variant="outline" 
                        className="text-xs text-primary border-primary/30"
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href={`/volunteer-program/${program.id}`} className="w-full">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      data-testid={`see-more-${program.id}`}
                    >
                      See More Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-20 bg-accent/10 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions about our volunteer programs? Our team is here to help you find the perfect 
              opportunity that matches your interests, skills, and availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="px-8 py-3 font-semibold bg-primary hover:bg-primary/90"
                  data-testid="contact-volunteer-team"
                >
                  Contact Our Team
                </Button>
              </Link>
              <Link href="/faq">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-3 font-semibold"
                  data-testid="volunteer-faq"
                >
                  View FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}