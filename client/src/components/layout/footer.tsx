import { Link } from 'wouter';
import { Mountain, Phone, Mail, MapPin } from 'lucide-react';
import { SiInstagram, SiFacebook, SiYoutube, SiX } from 'react-icons/si';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Accommodations', href: '/accommodations' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Itineraries', href: '/itineraries' },
    { name: 'Volunteers', href: '/volunteers-program' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const destinations = [
    'Serengeti National Park',
    'Ngorongoro Crater',
    'Tarangire National Park',
    'Lake Manyara',
    'Mount Kilimanjaro',
    'Zanzibar Island',
  ];

  const socialLinks = [
    { icon: SiInstagram, href: 'https://www.instagram.com/accommodationcollection?igsh=amtmazU2dmxqOGRh&utm_source=ig_contact_invite', label: 'Instagram' },
    { icon: SiFacebook, href: 'https://www.facebook.com/share/1B8V3VVZ9j/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: SiYoutube, href: 'https://www.youtube.com/@AccommodationCollection', label: 'YouTube' },
    { icon: SiX, href: 'https://x.com/africalodges?s=21', label: 'X (Twitter)' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Mountain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif">Accommodation Collection</h3>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Premium Africa travel experiences with over 10 years of expertise in safari, 
              accommodations, and personalized adventure planning.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors"
                  aria-label={social.label}
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-4 w-4 text-accent" />
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
              {destinations.map((destination) => (
                <li key={destination}>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                    data-testid={`destination-link-${destination.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-foreground/80 flex-shrink-0" />
                <span className="text-primary-foreground/80">accommodationcollection@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-foreground/80 flex-shrink-0" />
                <span className="text-primary-foreground/80">+255717523882</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-foreground/80 flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/80">
                  ACU Tower, Plot: 30 & 31, Block: J<br />Sokoine Road, Pangani Street<br />Arusha, Tanzania
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80">
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
