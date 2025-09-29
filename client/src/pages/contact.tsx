import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check,
  Clock,
  Users,
  Award,
  Shield,
  MessageCircle,
  Calendar,
  Star,
  CreditCard,
  ExternalLink
} from 'lucide-react';
import { SiTiktok, SiThreads, SiPinterest, SiLinkedin, SiTumblr, SiInstagram, SiFacebook, SiYoutube, SiWhatsapp, SiX } from 'react-icons/si';
import SEOHead from '@/components/seo/seo-head';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  adults: z.string().optional(),
  children: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          ...(phoneValue && { phone: phoneValue }),
          ...(data.arrivalDate && { arrivalDate: data.arrivalDate }),
          ...(data.departureDate && { departureDate: data.departureDate }),
          ...(data.adults && { adults: parseInt(data.adults) }),
          ...(data.children && { children: parseInt(data.children) }),
          message: data.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
        });
        reset();
        setPhoneValue(undefined);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Address',
      value: 'accommodationcollection@gmail.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      value: '+255717523882 / +255696154521',
      description: 'Available 9 AM - 6 PM EAT',
    },
    {
      icon: Phone,
      title: 'Emergency Contact',
      value: '+255789631010 / +255768512626',
      description: '24/7 support during your trip',
    },
    {
      icon: MapPin,
      title: 'HQ Office Address',
      value: 'ACU Tower, Plot: 30 & 31, Block: J\nHouse Number: 18, Road: Sokoine Road\nStreet: Pangani, Ward: Kati\nRegion: Arusha, Country: Tanzania\nPostal Address: 13874, Post Code: 23102',
      description: 'Visit by appointment only',
    },
  ];

  const socialLinks = [
    { icon: SiInstagram, href: 'https://www.instagram.com/accommodationcollection?igsh=amtmazU2dmxqOGRh&utm_source=ig_contact_invite', label: 'Instagram' },
    { icon: SiThreads, href: 'https://www.threads.com/@accommodationcollection?igshid=NTc4MTIwNjQ2YQ==', label: 'Threads' },
    { icon: SiFacebook, href: 'https://www.facebook.com/share/1B8V3VVZ9j/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: SiTiktok, href: 'https://www.tiktok.com/@accommodationcollection', label: 'TikTok' },
    { icon: SiYoutube, href: 'https://www.youtube.com/@AccommodationCollection', label: 'YouTube' },
    { icon: SiWhatsapp, href: 'https://wa.me/255768512626', label: 'WhatsApp' },
    { icon: SiX, href: 'https://x.com/africalodges?s=21', label: 'X (Twitter)' },
    { icon: SiPinterest, href: 'https://pin.it/5fIXuXfWK', label: 'Pinterest' },
    { icon: SiLinkedin, href: 'https://www.linkedin.com/company/kim-zebra-adventures-and-safaris-limited/', label: 'LinkedIn' },
    { icon: SiTumblr, href: 'https://www.tumblr.com/kimzebraadventuressafaris', label: 'Tumblr' },
  ];

  const additionalLinks = [
    { icon: Star, href: 'https://www.tripadvisor.com.au/Attraction_Review-g297913-d16634014-Reviews-Kim_zebra_Adventures_and_Safaris_Limited-Arusha_Arusha_Region.html', label: 'TripAdvisor Reviews' },
    { icon: ExternalLink, href: 'https://share.google/JplRQSFfZoa2Ae6yZ', label: 'Google Account' },
    { icon: ExternalLink, href: 'https://www.getyourguide.com/s/?q=supplier:463668', label: 'Get Your Guide' },
    { icon: Star, href: 'https://www.trustindex.io/reviews/www.kim.tours?_gl=1*1jjxjzh*_gcl_au*Mzk1MDEyOTk3LjE3Mjk3MDE4NzM.*_ga*MTMxMjYzMzkwLjE3Mjk3MDE1MDI.*_ga_DGL6KLFTVT*MTcyOTcwMTUwMi4xLjEuMTcyOTcxNTM3OC4zMy4wLjA.', label: 'Trustindex Reviews' },
    { icon: Calendar, href: 'https://calendly.com/kimtours/30min', label: 'Schedule Meeting' },
    { icon: MessageCircle, href: 'https://app.chatra.io/conversations/G3K8M46mJREExm84m', label: 'Live Chat' },
  ];

  const paymentLinks = [
    { icon: CreditCard, href: 'https://payments.pesapal.com/kim-tours', label: 'Payment Option A' },
    { icon: CreditCard, href: 'https://shop.directpay.online/paymybills/KIMZEBRAADVENTURESANDSAFARISLIMITED', label: 'Payment Option B' },
  ];

  const whyContactUs = [
    'Free personalized consultation and itinerary planning',
    'Competitive pricing with no hidden fees',
    '24/7 support during your Africa adventure',
    'Expert local knowledge and insider access',
  ];

  return (
    <>
      <SEOHead 
        title="Contact Accommodation Collection - Africa Travel Specialists"
        description="Contact our Africa travel experts in Arusha. Get personalized safari quotes, Kilimanjaro trek planning, and luxury accommodation bookings. Emergency contacts available 24/7."
        canonical="/contact"
        ogImage="/attached_assets/Arusha_1757885640432.jpg"
      />
      
      <div className="pt-32 pb-20">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Let's Plan Your Perfect Escape
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to embark on your Africa adventure? Our expert team is here to craft your personalized journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    placeholder="Enter your first name"
                    className="bg-background"
                    data-testid="first-name-input"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    placeholder="Enter your last name"
                    className="bg-background"
                    data-testid="last-name-input"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email address"
                  className="bg-background"
                  data-testid="email-input"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </Label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  value={phoneValue}
                  onChange={setPhoneValue}
                  placeholder="Enter your phone number"
                  className="phone-input bg-background border border-input rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  data-testid="phone-input"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Travel Dates</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="arrivalDate" className="text-xs text-muted-foreground">Arrival Date</Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      {...register('arrivalDate')}
                      className="bg-background"
                      data-testid="arrival-date-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="departureDate" className="text-xs text-muted-foreground">Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      {...register('departureDate')}
                      className="bg-background"
                      data-testid="departure-date-input"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Number of Travelers</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="adults" className="text-xs text-muted-foreground">Adults</Label>
                    <Input
                      id="adults"
                      type="number"
                      min="1"
                      max="20"
                      {...register('adults')}
                      placeholder="Number of adults"
                      className="bg-background"
                      data-testid="adults-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="children" className="text-xs text-muted-foreground">Children</Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      max="10"
                      {...register('children')}
                      placeholder="Number of children"
                      className="bg-background"
                      data-testid="children-input"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  {...register('message')}
                  placeholder="Tell us about your dream Africa adventure - preferred destinations, accommodation style, special interests, or any questions you have..."
                  className="bg-background resize-none"
                  data-testid="message-textarea"
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-lg font-semibold"
                data-testid="submit-contact-form-button"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Get In Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4" data-testid={`contact-info-${index}`}>
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                      <p className="text-muted-foreground whitespace-pre-line">{info.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Follow Our Adventures</h3>
              <div className="grid grid-cols-5 gap-4 mb-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label={social.label}
                    title={social.label}
                    data-testid={`social-link-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Stay updated with our latest safari adventures, travel tips, and exclusive offers.
              </p>
            </div>

            {/* Additional Links */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Reviews & Bookings</h3>
              <div className="space-y-4">
                {additionalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                    data-testid={`additional-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <link.icon className="h-5 w-5 text-primary" />
                    <span className="text-foreground font-medium">{link.label}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Secure Payment Options</h3>
              <div className="space-y-4">
                {paymentLinks.map((payment) => (
                  <a
                    key={payment.label}
                    href={payment.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors duration-200"
                    data-testid={`payment-link-${payment.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <payment.icon className="h-6 w-6 text-primary" />
                    <div>
                      <span className="text-foreground font-semibold block">{payment.label}</span>
                      <span className="text-muted-foreground text-sm">Secure online payment</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                  </a>
                ))}
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">Why Contact Us?</h3>
              <ul className="space-y-3 text-muted-foreground">
                {whyContactUs.map((reason, index) => (
                  <li key={index} className="flex items-start space-x-3" data-testid={`why-contact-us-${index}`}>
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="bg-muted/30 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Quick Response</h4>
                  <p className="text-sm text-muted-foreground">Within 24 hours</p>
                </div>
                <div>
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Expert Team</h4>
                  <p className="text-sm text-muted-foreground">10+ years experience</p>
                </div>
                <div>
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Quality Service</h4>
                  <p className="text-sm text-muted-foreground">98% satisfaction</p>
                </div>
                <div>
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Safe Travel</h4>
                  <p className="text-sm text-muted-foreground">Fully insured</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Hours & Emergency Contact */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">Office Hours</h4>
              <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM EAT</p>
              <p className="text-muted-foreground">Saturday: 9:00 AM - 3:00 PM EAT</p>
              <p className="text-muted-foreground">Sunday: Closed</p>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">Emergency Contact</h4>
              <p className="text-muted-foreground">24/7 support during your trip</p>
              <p className="text-muted-foreground font-semibold">+255768512626</p>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">Languages</h4>
              <p className="text-muted-foreground">English, Swahili</p>
              <p className="text-muted-foreground">German, French</p>
              <p className="text-muted-foreground">(other languages on request)</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
