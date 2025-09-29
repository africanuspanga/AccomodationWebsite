import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link, useParams } from 'wouter';
import { 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Check, 
  ArrowLeft,
  Binoculars,
  Mountain,
  TreePine,
  Globe2,
  Heart
} from 'lucide-react';
import SEOHead from '@/components/seo/seo-head';
import { volunteerPrograms } from '@/data/volunteer-programs';

export default function VolunteerProgramDetail() {
  const { id } = useParams();
  const program = volunteerPrograms.find(p => p.id === id);

  if (!program) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
          <p className="text-muted-foreground mb-8">The volunteer program you're looking for doesn't exist.</p>
          <Link href="/volunteers-program">
            <Button>Back to All Programs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const activityIcons = {
    safari: { icon: Binoculars, label: "Safari Experience" },
    hiking: { icon: TreePine, label: "Hiking Adventures" },
    mountainClimbing: { icon: Mountain, label: "Mountain Climbing" },
    culturalTours: { icon: Globe2, label: "Cultural Tours" }
  };

  return (
    <>
      <SEOHead 
        title={`${program.title} - Volunteer in ${program.country} | Accommodation Collection`}
        description={program.description}
        canonical={`/volunteer-program/${program.id}`}
        ogImage={program.image}
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link href="/volunteers-program">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Programs
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative overflow-hidden rounded-2xl mb-8">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-6 left-6">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground text-sm">
                    <span className="mr-2">{program.flag}</span>
                    {program.country}
                  </Badge>
                </div>
                <div className="absolute top-6 right-6">
                  <Badge variant="outline" className="bg-white/90 text-primary border-primary text-sm font-semibold">
                    from {program.cost}
                  </Badge>
                </div>
              </div>

              {/* Program Title and Overview */}
              <div className="mb-8">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {program.title}
                </h1>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{program.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Duration</p>
                      <p className="text-sm text-muted-foreground">{program.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Age</p>
                      <p className="text-sm text-muted-foreground">{program.minAge}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {program.focusAreas.map((area) => (
                    <Badge 
                      key={area} 
                      variant="outline" 
                      className="text-primary border-primary/30"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Program Description */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  About This Program
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {program.fullExplanation}
                </p>
              </div>

              {/* Program Highlights */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  What You'll Do
                </h2>
                <div className="grid gap-4">
                  {program.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <p className="text-muted-foreground">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Activities */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Optional Activities While Volunteering
                </h2>
                <p className="text-muted-foreground mb-6">
                  Enhance your volunteer experience with these exciting activities available in the region:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(program.activities).map(([key, available]) => {
                    const activity = activityIcons[key as keyof typeof activityIcons];
                    return (
                      <div 
                        key={key}
                        className={`flex items-center gap-3 p-4 rounded-lg border ${
                          available 
                            ? 'bg-accent/10 border-primary/20 text-foreground' 
                            : 'bg-muted/30 border-muted text-muted-foreground'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          available ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {available ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <activity.icon className="h-4 w-4" />
                          )}
                        </div>
                        <span className="font-medium">{activity.label}</span>
                        {available && (
                          <Badge variant="secondary" className="ml-auto text-xs">Available</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader className="pb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-foreground">
                        {program.cost}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Starting cost</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">What's Included</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          Accommodation during program
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          Meals and local transportation
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          Program orientation and support
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          Certificate of completion
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          24/7 emergency support
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href={`/volunteer-application/${program.id}`} className="w-full">
                      <Button 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                        data-testid="apply-program-button"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Apply to This Program
                      </Button>
                    </Link>
                    
                    <Link href="/contact" className="w-full">
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full"
                        data-testid="ask-questions-button"
                      >
                        Ask Questions
                      </Button>
                    </Link>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                      Need help choosing? Contact our volunteer coordinators for personalized guidance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}