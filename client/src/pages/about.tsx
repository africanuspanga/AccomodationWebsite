import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/seo/seo-head';
import { Check, Users, Shield, Heart, Award } from 'lucide-react';

export default function About() {
  const stats = [
    { number: '2,500+', label: 'Happy Families' },
    { number: '10+', label: 'Years Experience' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '50+', label: 'Destinations' },
  ];

  const whyChooseUs = [
    {
      title: 'Personalized Service',
      description: 'Every itinerary is tailored to your unique preferences, interests, and travel style',
    },
    {
      title: 'Expert Local Knowledge',
      description: 'Our team\'s deep understanding of Tanzania ensures authentic, off-the-beaten-path experiences',
    },
    {
      title: 'Premium Partnerships',
      description: 'Exclusive relationships with Tanzania\'s finest lodges, camps, and service providers',
    },
    {
      title: '24/7 Support',
      description: 'Comprehensive support throughout your journey with local assistance always available',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety & Security',
      description: 'Your safety is our top priority with comprehensive protocols and experienced guides.',
    },
    {
      icon: Heart,
      title: 'Sustainable Tourism',
      description: 'Supporting local communities and conservation efforts through responsible travel practices.',
    },
    {
      icon: Users,
      title: 'Family Focus',
      description: 'Specialized expertise in creating memorable experiences for families with children.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering exceptional service that exceeds expectations every time.',
    },
  ];

  return (
    <>
      <SEOHead 
        title="About Accommodation Collection - 10+ Years Tanzania Travel Expertise"
        description="Learn about Accommodation Collection's 10+ years of experience creating unforgettable Tanzania safaris, Kilimanjaro treks, and luxury travel experiences. Family-owned, safety-first approach."
        canonical="/about"
        ogImage="/attached_assets/beautiful-african-elephant_1757883583699.jpg"
      />
      
      <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Your Journey, Our Passion
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-2xl text-muted-foreground font-light">
            A Decade of Unforgettable Adventures
          </p>
        </div>

        <div className="space-y-16">
          {/* Introduction */}
          <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
            <p className="text-xl leading-relaxed text-muted-foreground">
              For over 10 years, <strong className="text-primary">Accommodation Collection</strong> has been 
              crafting extraordinary travel experiences across Tanzania's most spectacular destinations. What began 
              as a passion for sharing the unparalleled beauty of East Africa has evolved into a trusted partnership 
              with travelers from around the world who seek authentic, safe, and transformative adventures.
            </p>
          </div>

          {/* Mission & Promise */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/30 p-8 rounded-2xl">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide seamless, safe, and memorable journeys that connect travelers with Tanzania's 
                incredible wildlife, diverse landscapes, and rich cultural heritage while ensuring sustainable 
                tourism practices that benefit local communities.
              </p>
            </div>
            
            <div className="bg-muted/30 p-8 rounded-2xl">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Our Promise</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every detail of your adventure is carefully planned and executed with precision, from luxury 
                lodge selections to expert guide assignments, ensuring your Tanzania experience exceeds all expectations.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-primary/5 p-8 rounded-2xl">
            <h2 className="font-serif text-2xl font-semibold text-primary text-center mb-8">A Decade of Excellence</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className="text-3xl font-bold text-accent mb-2">{stat.number}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">A Decade of Expertise</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Our extensive experience spanning more than 10 years has given us unmatched insights into Tanzania's 
                seasonal patterns, wildlife behavior, and the hidden gems that make each safari truly special. We've 
                guided thousands of families, couples, solo adventurers, and groups through the Serengeti's endless 
                plains, into the depths of Ngorongoro Crater, and across the diverse landscapes that make Tanzania 
                Africa's premier safari destination.
              </p>
            </div>
          </div>

          {/* Safety & Family Focus */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">Safety & Family-Friendly Focus</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Safety is not just our priority—it's our foundation. Our comprehensive safety protocols, professional 
                guides, and carefully vetted accommodation partners ensure that families with children of all ages can 
                enjoy Tanzania's wonders with complete peace of mind. From infant-friendly lodges to adventure activities 
                for teenagers, we specialize in creating seamless experiences that bring families closer together through 
                shared wonder and discovery.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
            <h3 className="font-serif text-2xl font-semibold text-primary mb-6">Why Choose Accommodation Collection?</h3>
            <div className="space-y-4">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-start space-x-3" data-testid={`why-choose-us-${index}`}>
                  <Check className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}:</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-muted/30 rounded-xl" data-testid={`value-${index}`}>
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainability */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">Sustainable Tourism Commitment</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                We believe that the best travel experiences are those that not only create lasting memories for our 
                guests but also contribute positively to the destinations we visit. Through partnerships with 
                community-based tourism initiatives and conservation projects, we ensure that your adventure supports 
                wildlife protection, local employment, and community development across Tanzania.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-muted/30 p-12 rounded-2xl">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Ready to Begin Your Tanzania Adventure?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our decade of expertise transform your Tanzania dreams into an unforgettable reality. 
              From the Great Migration to pristine Zanzibar beaches, from Kilimanjaro's summit to intimate 
              cultural encounters—your perfect getaway awaits.
            </p>
            <Button 
              className="btn-primary px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
              data-testid="start-planning-button"
            >
              Start Planning Your Journey
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
