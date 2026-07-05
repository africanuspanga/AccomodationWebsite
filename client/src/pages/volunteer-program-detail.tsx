import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
import { useQuery } from '@tanstack/react-query';
import { type AdminVolunteerProgram, mergeVolunteerPrograms } from '@/lib/volunteer-programs';

const fallbackProgramImage = '/attached_assets/maasai immersion _1759178768271.jpg';

function getDisplayCost(cost: string) {
  const trimmedCost = cost?.trim();

  if (!trimmedCost) {
    return 'Contact us';
  }

  if (/^(from|contact)/i.test(trimmedCost)) {
    return trimmedCost;
  }

  return `From ${trimmedCost}`;
}

function getParagraphs(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length > 0 ? paragraphs : ['Details coming soon.'];
}

export default function VolunteerProgramDetail() {
  const { id } = useParams();
  const { data: adminPrograms = [], isLoading } = useQuery<AdminVolunteerProgram[]>({
    queryKey: ['/api/public/volunteer-programs'],
    enabled: true,
  });
  const allPrograms = mergeVolunteerPrograms(adminPrograms, volunteerPrograms);
  const program = allPrograms.find(p => p.id === id);

  if (!program) {
    if (isLoading) {
      return (
        <div className="pt-32 pb-20">
          <div className="container-custom text-center">
            <p className="text-muted-foreground">Loading program...</p>
          </div>
        </div>
      );
    }

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

  const programImage = program.image || fallbackProgramImage;
  const focusAreas = program.focusAreas.filter(Boolean);
  const highlights = program.highlights.length > 0
    ? program.highlights
    : ['Meaningful volunteer experience'];
  const explanationParagraphs = getParagraphs(program.fullExplanation || program.description);
  const availableActivitiesCount = Object.values(program.activities).filter(Boolean).length;

  return (
    <>
      <SEOHead 
        title={`${program.title} - Volunteer in ${program.country} | Accommodation Collection`}
        description={program.description}
        canonical={`/volunteer-program/${program.id}`}
        ogImage={programImage}
      />
      
      <div className="bg-background">
        <section className="relative isolate overflow-hidden bg-foreground text-white">
          <img
            src={programImage}
            alt=""
            onError={(event) => {
              event.currentTarget.src = fallbackProgramImage;
            }}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

          <div className="container-custom py-28 md:py-32 lg:py-36">
            <Link href="/volunteers-program">
              <Button
                variant="ghost"
                className="cursor-pointer bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to All Programs
              </Button>
            </Link>

            <div className="mt-10 max-w-4xl space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-white/95 px-3 py-1.5 text-foreground">
                  {program.flag && <span className="mr-1.5">{program.flag}</span>}
                  {program.country || 'Africa'}
                </Badge>
                <Badge variant="outline" className="border-white/30 bg-white/15 px-3 py-1.5 text-white backdrop-blur">
                  {getDisplayCost(program.cost)}
                </Badge>
              </div>

              <div className="space-y-5">
                <h1 className="break-words font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
                  {program.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-white/85 md:text-xl">
                  {program.description}
                </p>
              </div>

              <div className="grid max-w-4xl gap-3 sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">Location</p>
                    <p className="text-sm leading-6 text-white/75">{program.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">Duration</p>
                    <p className="text-sm leading-6 text-white/75">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">Age</p>
                    <p className="text-sm leading-6 text-white/75">{program.minAge}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom py-16 md:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-16">
            <article className="space-y-12 md:space-y-16">
              <section className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Program overview
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
                  A clearer look at the work, setting, and experience.
                </h2>
                <div className="mt-7 space-y-5">
                  {explanationParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-muted-foreground md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {focusAreas.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {focusAreas.map((area) => (
                      <Badge 
                        key={area} 
                        variant="outline" 
                        className="border-primary/25 bg-primary/5 px-3 py-1.5 text-primary"
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                )}
              </section>

              <section className="border-t border-border pt-10 md:pt-12">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Volunteer work
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground">
                    What you'll do
                  </h2>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {highlights.map((highlight, index) => (
                    <div key={`${highlight}-${index}`} className="flex items-start gap-4 rounded-lg border border-border/80 bg-card p-5 shadow-sm">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="leading-7 text-muted-foreground">{highlight}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border-t border-border pt-10 md:pt-12">
                <div className="max-w-3xl space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Add-on experiences
                  </p>
                  <h2 className="font-serif text-3xl font-bold leading-tight text-foreground">
                    Optional activities while volunteering
                  </h2>
                  <p className="text-base leading-7 text-muted-foreground md:text-lg">
                    {availableActivitiesCount > 0
                      ? 'These activities may be available around the placement area and can help round out the trip.'
                      : 'This placement is currently focused on volunteer work only, with optional activities confirmed by the team.'}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {Object.entries(program.activities).map(([key, available]) => {
                    const activity = activityIcons[key as keyof typeof activityIcons];
                    if (!activity) return null;

                    return (
                      <div 
                        key={key}
                        className={`flex min-h-24 items-center gap-4 rounded-lg border p-5 transition-colors ${
                          available 
                            ? 'border-primary/25 bg-primary/5 text-foreground' 
                            : 'border-border bg-muted/30 text-muted-foreground'
                        }`}
                      >
                        <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg ${
                          available ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'
                        }`}>
                          {available ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <activity.icon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-6">{activity.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {available ? 'Available with this program' : 'Not currently listed'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </article>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Card className="border-border/80 shadow-lg">
                <CardContent className="space-y-7 p-6 md:p-7">
                  <div className="space-y-2 border-b border-border pb-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-3xl font-bold text-foreground">
                        {getDisplayCost(program.cost).replace(/^From\s+/i, '')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Starting cost</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">Program snapshot</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Location</p>
                          <p className="leading-6 text-muted-foreground">{program.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Duration</p>
                          <p className="leading-6 text-muted-foreground">{program.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Minimum age</p>
                          <p className="leading-6 text-muted-foreground">{program.minAge}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href={`/volunteer-application/${program.id}`} className="w-full">
                      <Button 
                        size="lg" 
                        className="h-12 w-full cursor-pointer bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                        data-testid="apply-program-button"
                      >
                        <Heart className="h-4 w-4" />
                        Apply to This Program
                      </Button>
                    </Link>
                    
                    <Link href="/contact" className="w-full">
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="h-12 w-full cursor-pointer"
                        data-testid="ask-questions-button"
                      >
                        Ask Questions
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4 border-t border-border pt-6">
                    <h4 className="font-semibold text-foreground">What's included</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {[
                        'Accommodation during program',
                        'Meals and local transportation',
                        'Program orientation and support',
                        'Certificate of completion',
                        '24/7 emergency support',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="leading-6">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-sm leading-6 text-muted-foreground">
                      Need help choosing? Contact our volunteer coordinators for personalized guidance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
