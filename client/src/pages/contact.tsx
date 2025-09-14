import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Check,
  Clock,
  Users,
  Award,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  travelers: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      // Simulate form submission - in production this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
      value: 'info@accommodationcollection.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone Number',
      value: '+255 7XX XXX XXX',
      description: 'Available 9 AM - 6 PM EAT',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      value: 'Plot 45, Nyerere Road\nDar es Salaam, Tanzania',
      description: 'Visit by appointment only',
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const whyContactUs = [
    'Free personalized consultation and itinerary planning',
    'Competitive pricing with no hidden fees',
    '24/7 support during your Tanzania adventure',
    'Expert local knowledge and insider access',
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Let's Plan Your Perfect Escape
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to embark on your Tanzania adventure? Our expert team is here to craft your personalized journey.
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
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="Enter your phone number"
                  className="bg-background"
                  data-testid="phone-input"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Travel Dates</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkIn" className="text-xs text-muted-foreground">Check-in</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      {...register('checkIn')}
                      className="bg-background"
                      data-testid="check-in-date-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOut" className="text-xs text-muted-foreground">Check-out</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      {...register('checkOut')}
                      className="bg-background"
                      data-testid="check-out-date-input"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-sm font-medium text-foreground">
                  Number of Travelers
                </Label>
                <Select onValueChange={(value) => setValue('travelers', value)}>
                  <SelectTrigger className="bg-background" data-testid="travelers-select">
                    <SelectValue placeholder="Select number of travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3-4">3-4 people</SelectItem>
                    <SelectItem value="5-8">5-8 people</SelectItem>
                    <SelectItem value="9+">9+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  {...register('message')}
                  placeholder="Tell us about your dream Tanzania adventure - preferred destinations, accommodation style, special interests, or any questions you have..."
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
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label={social.label}
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
              <p className="text-muted-foreground font-semibold">+255 7XX XXX XXX</p>
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
  );
}
