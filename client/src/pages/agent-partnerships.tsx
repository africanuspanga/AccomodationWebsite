import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Globe, Leaf, Phone, Shield, Users } from 'lucide-react';

export default function AgentPartnerships() {
  return (
    <>
      <Helmet>
        <title>Agent Partnerships - Partner With Us | Accommodation Collection</title>
        <meta name="description" content="Partner with Accommodation Collection for extraordinary travel experiences across Africa. Over 10 years of expertise, dedicated support, and meaningful impact." />
        <meta property="og:title" content="Agent Partnerships - Partner With Us | Accommodation Collection" />
        <meta property="og:description" content="Partner with Accommodation Collection for extraordinary travel experiences across Africa. Over 10 years of expertise, dedicated support, and meaningful impact." />
        <meta property="og:url" content="https://accommodations.guide/agent-partnerships" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-card">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Agents & Partnerships
            </h1>
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
              For over 10 years, Accommodation Collection has been crafting extraordinary travel experiences across Africa's most spectacular destinations. What began as a passion for sharing the unparalleled beauty of East Africa has evolved into a trusted partnership with travel agents and partners from around the world who seek authentic, safe, and transformative adventures for their clients.
            </p>
          </div>
        </section>

        {/* Partner With Us Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground font-serif">
                Partner with Accommodation Collection
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We are dedicated to building strong, mutually beneficial partnerships. Our goal is to make selling in Africa seamless, rewarding, and impactful for you.
              </p>
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-16 px-4 bg-card">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground font-serif">
              Why Partner With Accommodation Collection?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-muted p-8 rounded-lg">
                <Globe className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-foreground">Deep Africa Expertise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  At Accommodation Collection, we go beyond simply providing stays; we offer seamless support to our agent partners across Africa. With our deep, on-the-ground expertise, we simplify itinerary planning, logistics, and competitive pricing, helping you deliver exceptional experiences effortlessly.
                </p>
              </div>

              <div className="bg-muted p-8 rounded-lg">
                <Shield className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-foreground">Award-Winning Portfolio</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With a portfolio of award-winning camps and lodges, we ensure premier stays while upholding the highest safari standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment to Impact Section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground font-serif">
              Our Commitment to Impact
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              We believe travel should be a force for good. Our decade-long commitment to conservation and supporting local communities ensures that every journey with us is both meaningful and impactful.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Positive Contribution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We ensure your clients' trips contribute positively to the areas they visit. Impact is in our DNA. We are actively involved in initiatives with local partners who share our commitment and vision of helping people and ecosystems thrive together across the continent.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Minimizing Environmental Footprint</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We send your travelers into some of the world's most pristine landscapes. Every operational decision—from using renewable energy to efficient resource use and sustainable sourcing—is rooted in minimizing the environmental impact of their presence and ours.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Emissions Offsetting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  As a business, we prioritize reducing emissions, and we offset all our Scope 1 emissions (direct greenhouse gas emissions from sources we own or control). We target high-integrity, independently verified REDD+ projects that align with our impact approach and create significant, tangible impact for communities in the ecosystems where we operate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Support Section */}
        <section className="py-16 px-4 bg-card">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground font-serif">
              Agent Support and Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              We are your direct strategic link to establishing and growing your business in East Africa.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Dedicated Support */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Dedicated Support</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our team provides 24-hour emergency support and is dedicated to delivering exceptional service—as evidenced by our consistently excellent guest reviews.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Expert Knowledge</h4>
                      <p className="text-muted-foreground">Benefit from our deep Africa experience and knowledge. Our Agent Relationship Managers (ARMs) are here to support your sales and product development.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Highly Trained Teams</h4>
                      <p className="text-muted-foreground">Our teams include highly trained and multilingual guides, ensuring unforgettable wild experiences and professional service.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Exclusive Agent Space (Our Technology)</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our exclusive Agent Space provides you with a comprehensive suite of resources for a seamless booking experience.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Live Pricing & Quotes</h4>
                      <p className="text-muted-foreground">Get instant accommodation quotes and access live pricing for our portfolio of camps and lodges.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Resource Library</h4>
                      <p className="text-muted-foreground">Access essential resources to begin or grow your existing foundation of safari knowledge.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Streamlined Process</h4>
                      <p className="text-muted-foreground">Expect ongoing tech developments to continually streamline your sales process and enhance your booking experience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <Phone className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
              Become an Agent Partner
            </h2>
            <p className="text-lg mb-8 opacity-90">
              To begin our partnership, please contact us
            </p>
            <Link href="/contact" data-testid="link-contact-partnerships">
              <Button 
                size="lg" 
                className="bg-accent hover:opacity-90 text-accent-foreground font-semibold px-8 py-6 text-lg"
                data-testid="button-contact-us"
              >
                CONTACT US
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
