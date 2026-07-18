import { useState } from 'react';
import { Link } from 'wouter';
import { Mountain, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { SiInstagram, SiFacebook, SiYoutube, SiX, SiTiktok, SiLinkedin, SiWhatsapp, SiPinterest } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useContent } from '@/hooks/use-content';
import likeeIcon from '@assets/images-removebg-preview_1760198548949.png';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { destinations: contentDestinations } = useContent();

  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/newsletter', { email: newsletterEmail });
      toast({
        title: 'Successfully Subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      setNewsletterEmail('');
    } catch (error) {
      toast({
        title: 'Subscription Failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Accommodations', href: '/accommodations' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Itineraries', href: '/itineraries' },
    { name: 'Volunteers', href: '/volunteers-program' },
    { name: 'Agent Partnerships', href: '/agent-partnerships' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const getDestinationHref = (...candidateNames: string[]) => {
    const destination = contentDestinations.find((item) => {
      const itemName = item.name.trim().toLowerCase();
      return candidateNames.some((name) => itemName === name.trim().toLowerCase());
    });

    return destination ? `/destinations/${destination.slug || destination.id}` : '/destinations';
  };

  const popularDestinations = [
    { name: 'Serengeti National Park', href: getDestinationHref('Serengeti National Park') },
    { name: 'Ngorongoro Crater', href: getDestinationHref('Ngorongoro Crater', 'Ngorongoro Conservation Area') },
    { name: 'Tarangire National Park', href: getDestinationHref('Tarangire National Park') },
    { name: 'Lake Manyara', href: getDestinationHref('Lake Manyara', 'Lake Manyara National Park') },
    { name: 'Mount Kilimanjaro', href: getDestinationHref('Mount Kilimanjaro', 'Kilimanjaro') },
    { name: 'Zanzibar Island', href: getDestinationHref('Zanzibar Island', 'Zanzibar') },
  ];

  const socialLinks = [
    { icon: SiInstagram, href: 'https://www.instagram.com/accommodationcollection?igsh=amtmazU2dmxqOGRh&utm_source=ig_contact_invite', label: 'Instagram' },
    { icon: SiFacebook, href: 'https://www.facebook.com/share/1AT6FFsUCX/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: SiYoutube, href: 'https://www.youtube.com/@accommodationcollections', label: 'YouTube' },
    { icon: SiX, href: 'https://x.com/accommodat3621?s=21', label: 'X (Twitter)' },
    { icon: SiTiktok, href: 'https://www.tiktok.com/@accommodationcollection', label: 'TikTok' },
    { icon: SiLinkedin, href: 'https://www.linkedin.com/company/accommodation-collection', label: 'LinkedIn' },
    { icon: SiWhatsapp, href: 'https://wa.me/255768512626', label: 'WhatsApp' },
    { icon: SiPinterest, href: 'https://pin.it/7tjYyt5au', label: 'Pinterest' },
    { iconImage: likeeIcon, href: 'https://l.likee.video/p/NYkOhC', label: 'Likee' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/favicon.png" alt="Accommodation Collection Logo" className="w-16 h-16 object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif">Accommodation Collection</h3>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Premium Africa travel experiences with over 10 years of expertise in safari, 
              accommodations, and personalized adventure planning.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors"
                  aria-label={social.label}
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                >
                  {'iconImage' in social ? (
                    <img src={social.iconImage} alt={social.label} className="h-4 w-4 object-contain" />
                  ) : (
                    <social.icon className="h-4 w-4 text-accent" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Destinations</h3>
            <ul className="space-y-3">
              {popularDestinations.map((destination) => (
                <li key={destination.name}>
                  <Link
                    href={destination.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                    data-testid={`destination-link-${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-primary-foreground/80 flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/80 text-sm break-all">info@accommodations.guide</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-primary-foreground/80 flex-shrink-0 mt-1" />
                <div className="text-primary-foreground/80 text-sm">
                  <div>+255717523882</div>
                  <div>+255789631010</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-foreground/80 flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/80 text-sm">
                  ACU Tower, Plot: 30 & 31, Block: J<br />Sokoine Road, Pangani Street<br />Arusha, Tanzania
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-8 bg-accent/10 rounded-2xl">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold font-serif mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-primary-foreground/80 mb-6">
              Get the latest travel tips, exclusive offers, and destination updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-background text-foreground flex-1"
                data-testid="newsletter-email-input"
              />
              <Button 
                className="btn-accent whitespace-nowrap"
                onClick={handleNewsletterSubmit}
                disabled={isSubmitting}
                data-testid="newsletter-subscribe-button"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm md:text-base">
              &copy; 2025 Accommodation Collection. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                data-testid="privacy-policy-link"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                data-testid="terms-link"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                data-testid="cookie-policy-link"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
