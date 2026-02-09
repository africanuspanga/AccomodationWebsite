import { useParams, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, ArrowLeft, Users, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useContent } from '@/hooks/use-content';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/seo/seo-head';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const bookingFormSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number with country code'),
  checkInDate: z.date({ required_error: 'Please select check-in date' }),
  nights: z.coerce.number().int().min(1, 'Minimum 1 night').max(30, 'Maximum 30 nights'),
  adults: z.coerce.number().int().min(1, 'At least one person is required').max(20, 'Maximum 20 people'),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingForm() {
  const params = useParams<{ type: string; id: string }>();
  const [, setLocation] = useLocation();
  const { accommodations, itineraries } = useContent();
  const { toast } = useToast();

  const bookingType = params.type as 'accommodation' | 'itinerary';
  const item = bookingType === 'accommodation'
    ? accommodations.find((accommodation) => accommodation.id === params.id)
    : itineraries.find((itinerary) => itinerary.id === params.id);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      nights: 3,
      adults: 2,
      specialRequests: '',
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (values: BookingFormValues) => {
      const checkOutDate = addDays(values.checkInDate, values.nights);

      const bookingData = {
        bookingType,
        itemId: params.id,
        itemName: item?.name || '',
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        checkInDate: format(values.checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
        numberOfDays: values.nights,
        adults: values.adults,
        children: 0,
        specialRequests: values.specialRequests || '',
      };

      return apiRequest('POST', '/api/bookings', bookingData);
    },
    onSuccess: () => {
      toast({
        title: 'Booking Submitted Successfully!',
        description: 'We will contact you shortly to confirm your booking.',
      });
      form.reset({
        fullName: '',
        email: '',
        phone: '',
        nights: 3,
        adults: 2,
        specialRequests: '',
      });
      setTimeout(() => {
        setLocation(bookingType === 'accommodation' ? '/accommodations' : '/itineraries');
      }, 2000);
    },
    onError: (error: Error) => {
      toast({
        title: 'Booking Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: BookingFormValues) => {
    bookingMutation.mutate(values);
  };

  if (!item) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
          <Button onClick={() => setLocation(bookingType === 'accommodation' ? '/accommodations' : '/itineraries')}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const checkInDate = form.watch('checkInDate');
  const nights = form.watch('nights') || 0;
  const checkOutDate = checkInDate && nights > 0 ? addDays(checkInDate, nights) : null;

  return (
    <>
      <SEOHead
        title={`Book ${item.name} - Accommodation Collection`}
        description={`Complete your booking for ${item.name}`}
        canonical={`/book/${bookingType}/${params.id}`}
      />

      <div className="pt-32 pb-20">
        <div className="container-custom max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => setLocation(`/${bookingType === 'accommodation' ? 'accommodations' : 'itineraries'}/${params.id}`)}
            className="mb-6 hover:bg-primary/10"
            data-testid="back-button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
                Complete Your Booking
              </h1>

              <div className="bg-card border-2 border-primary/10 rounded-2xl overflow-hidden mb-6">
                {item.imageUrl && (
                  <div className="aspect-[16/9] w-full">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      data-testid="booking-item-image"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-bold text-primary mb-2" data-testid="booking-item-name">
                    {item.name}
                  </h2>
                  <Badge variant="secondary" className="mb-4">
                    {bookingType === 'accommodation' ? 'Accommodation' : 'Safari Package'}
                  </Badge>
                  <p className="text-muted-foreground text-sm">
                    {(item.description || '').substring(0, 150)}...
                  </p>
                </div>
              </div>

              {nights > 0 && (
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold text-foreground">
                        {nights} {nights === 1 ? 'Night' : 'Nights'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">People:</span>
                      <span className="font-semibold text-foreground">
                        {form.watch('adults')} {form.watch('adults') === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                    {checkOutDate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-out:</span>
                        <span className="font-semibold text-foreground">{format(checkOutDate, 'PPP')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Full Name</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            data-testid="input-fullname"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email Address</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Phone Number</span>
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            international
                            defaultCountry="TZ"
                            value={field.value || undefined}
                            onChange={(value) => field.onChange(value || '')}
                            className="phone-input-booking"
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkInDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-in Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                  data-testid="input-checkin"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, 'PPP') : <span>Select date</span>}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nights"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nights</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="30"
                              className="no-spinner"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
                              data-testid="input-nights"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Number of People</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="20"
                            className="no-spinner"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
                            data-testid="input-adults"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special requirements or requests?"
                            className="min-h-[100px]"
                            {...field}
                            data-testid="input-special-requests"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full btn-primary py-6 text-lg font-semibold"
                    disabled={bookingMutation.isPending}
                    data-testid="button-submit"
                  >
                    {bookingMutation.isPending ? 'Submitting...' : 'Submit Booking'}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting, you agree to our terms and conditions. We'll contact you shortly to confirm your booking.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
