import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, Clock, Heart, MapPin, Plane, Users } from 'lucide-react';
import SEOHead from '@/components/seo/seo-head';
import { volunteerPrograms } from '@/data/volunteer-programs';
import { useQuery } from '@tanstack/react-query';
import { getVolunteerProgramSlug, type AdminVolunteerProgram, mergeVolunteerPrograms } from '@/lib/volunteer-programs';
import { plainTextFromRichText } from '@/lib/rich-text';

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

export default function VolunteersProgram() {
  // Fetch admin-created volunteer programs
  const { data: adminPrograms = [] } = useQuery<AdminVolunteerProgram[]>({
    queryKey: ['/api/public/volunteer-programs'],
    enabled: true,
  });

  // Merge admin programs with hardcoded programs
  const allPrograms = mergeVolunteerPrograms(adminPrograms, volunteerPrograms);
  const heroImage = allPrograms[0]?.image || fallbackProgramImage;
  const countries = Array.from(new Set(allPrograms.map((program) => program.country).filter(Boolean)));
  const focusAreas = Array.from(
    new Set(allPrograms.flatMap((program) => program.focusAreas).filter(Boolean)),
  ).slice(0, 6);

  return (
    <>
      <SEOHead 
        title="Africa Volunteer Programs - Make a Difference | Accommodation Collection"
        description="Join our meaningful volunteer programs across Africa. From wildlife conservation to education, find the perfect opportunity to make a lasting impact while experiencing African culture."
        canonical="/volunteers-program"
        ogImage="/attached_assets/maasai immersion _1759178768271.jpg"
      />
      
      <div className="bg-background">
        <section className="relative isolate overflow-hidden bg-foreground text-primary-foreground">
          <img
            src={heroImage}
            alt=""
            onError={(event) => {
              event.currentTarget.src = fallbackProgramImage;
            }}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

          <div className="container-custom py-28 md:py-32 lg:py-36">
            <div className="max-w-3xl space-y-7">
              <Badge
                variant="outline"
                className="border-white/30 bg-white/15 px-4 py-2 text-sm text-white backdrop-blur"
              >
                Volunteer experiences across Africa
              </Badge>

              <div className="space-y-5">
                <h1 className="break-words font-serif text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                  Africa Volunteer Programs
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
                  Make a meaningful difference while experiencing the rich cultures and breathtaking landscapes of Africa.
                  Choose a program that pairs purpose, local support, and time to explore.
                </p>
              </div>

              <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <Plane className="h-5 w-5 flex-shrink-0 text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">{countries.length || 'Multiple'} destinations</p>
                    <p className="text-xs text-white/70">Across Africa</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <Clock className="h-5 w-5 flex-shrink-0 text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">1-16 weeks</p>
                    <p className="text-xs text-white/70">Flexible stays</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <Users className="h-5 w-5 flex-shrink-0 text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">Supported travel</p>
                    <p className="text-xs text-white/70">Guidance before arrival</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-custom py-16 md:py-20 lg:py-24">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Find your placement
              </p>
              <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Programs with clearer details, real impact, and room to choose well.
              </h2>
              <p className="text-base leading-7 text-muted-foreground md:text-lg">
                Browse each opportunity by destination, duration, cost, and focus area before opening the full program.
              </p>
            </div>

            {focusAreas.length > 0 && (
              <div className="flex max-w-xl flex-wrap gap-2 lg:justify-end">
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
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {allPrograms.map((program) => (
              <Card 
                key={program.id} 
                className="group flex h-full overflow-hidden border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                data-testid={`program-card-${program.id}`}
              >
                <div className="flex w-full flex-col">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={program.image || fallbackProgramImage}
                        alt={program.title}
                        onError={(event) => {
                          event.currentTarget.src = fallbackProgramImage;
                        }}
                        className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-56"
                      />
                      <div className="absolute left-4 top-4">
                        <Badge variant="secondary" className="bg-white/95 px-3 py-1.5 text-foreground shadow-sm">
                          {program.flag && <span className="mr-1.5">{program.flag}</span>}
                          {program.country || 'Africa'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="border-primary/30 bg-white/95 px-3 py-1.5 text-primary shadow-sm">
                          {getDisplayCost(program.cost)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="break-words font-serif text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {program.title}
                    </h3>
                  
                    <div className="mt-5 grid gap-3 border-y border-border/70 py-5">
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="leading-6">{program.location}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="leading-6">{program.duration}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="leading-6">Age {program.minAge}</span>
                      </div>
                    </div>

                    <p className="mt-5 line-clamp-4 text-sm leading-7 text-muted-foreground">
                      {plainTextFromRichText(program.description)}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {program.focusAreas.slice(0, 3).map((area) => (
                        <Badge 
                          key={area} 
                          variant="outline" 
                          className="border-primary/25 bg-primary/5 text-xs text-primary"
                        >
                          {area}
                        </Badge>
                      ))}
                      {program.focusAreas.length > 3 && (
                        <Badge variant="outline" className="border-border text-xs text-muted-foreground">
                          +{program.focusAreas.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 md:p-7 md:pt-0">
                    <Link href={`/volunteer-program/${getVolunteerProgramSlug(program)}`} className="w-full">
                      <Button 
                        className="h-12 w-full cursor-pointer bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                        data-testid={`see-more-${program.id}`}
                      >
                        See More Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-muted/30 py-16 md:py-20">
          <div className="container-custom grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Heart className="h-6 w-6" />
              </div>
              <div className="max-w-2xl space-y-4">
                <h3 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
                  Ready to make a difference?
                </h3>
                <p className="text-base leading-7 text-muted-foreground md:text-lg">
                  Our team can help match your interests, skills, budget, and travel window with the right volunteer opportunity.
                </p>
              </div>
            </div>

            <div className="space-y-5 lg:justify-self-end">
              <div className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="max-w-md leading-7">Get guidance on placement fit, application steps, and what to prepare before travel.</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="h-12 cursor-pointer px-8 font-semibold bg-primary hover:bg-primary/90"
                    data-testid="contact-volunteer-team"
                  >
                    Contact Our Team
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-12 cursor-pointer px-8 font-semibold"
                    data-testid="volunteer-faq"
                  >
                    View FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
