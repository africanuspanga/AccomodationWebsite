import { useParams, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, differenceInDays } from 'date-fns';
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

const bookingFormSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number with country code'),
  checkInDate: z.date({ required_error: 'Please select check-in date' }),
  checkOutDate: z.date({ required_error: 'Please select check-out date' }),
  adults: z.number().min(1, 'At least one adult is required').max(20, 'Maximum 20 adults'),
  children: z.number().min(0, 'Cannot be negative').max(20, 'Maximum 20 children'),
  specialRequests: z.string().optional(),
}).refine((data) => data.checkOutDate > data.checkInDate, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOutDate'],
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingForm() {
  const params = useParams<{ type: string; id: string }>();
  const [, setLocation] = useLocation();
  const { accommodations, itineraries } = useContent();
  const { toast } = useToast();

  const bookingType = params.type as 'accommodation' | 'itinerary';
  const item = bookingType === 'accommodation' 
    ? accommodations.find(a => a.id === params.id)
    : itineraries.find(i => i.id === params.id);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      adults: 2,
      children: 0,
      specialRequests: '',
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (values: BookingFormValues) => {
      const numberOfDays = differenceInDays(values.checkOutDate, values.checkInDate);
      
      const bookingData = {
        bookingType,
        itemId: params.id,
        itemName: item?.name || '',
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        checkInDate: format(values.checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(values.checkOutDate, 'yyyy-MM-dd'),
        numberOfDays,
        adults: values.adults,
        children: values.children,
        specialRequests: values.specialRequests || '',
      };

      return apiRequest('POST', '/api/bookings', bookingData);
    },
    onSuccess: () => {
      toast({
        title: 'Booking Submitted Successfully!',
        description: 'We will contact you shortly to confirm your booking.',
      });
      form.reset();
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
  const checkOutDate = form.watch('checkOutDate');
  const numberOfDays = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;

  return (
    <>
      <SEOHead 
        title={`Book ${item.name} - Accommodation Collection`}
        description={`Complete your booking for ${item.name}`}
        canonical={`/book/${bookingType}/${params.id}`}
      />

      <div className="pt-32 pb-20">
        <div className="container-custom max-w-6xl">
          {/* Back Button */}
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
            {/* Left Side - Booking Summary */}
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
                    {item.description.substring(0, 150)}...
                  </p>
                </div>
              </div>

              {numberOfDays > 0 && (
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold text-foreground">{numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests:</span>
                      <span className="font-semibold text-foreground">
                        {form.watch('adults')} {form.watch('adults') === 1 ? 'adult' : 'adults'}
                        {form.watch('children') > 0 && `, ${form.watch('children')} ${form.watch('children') === 1 ? 'child' : 'children'}`}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Booking Form */}
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name */}
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

                  {/* Email */}
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

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Phone Number (with country code)</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="+255 XXX XXX XXX" 
                            {...field} 
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Check-in and Check-out Dates */}
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
                      name="checkOutDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-out Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                  data-testid="input-checkout"
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
                                disabled={(date) => date <= (checkInDate || new Date())}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Adults and Children */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="adults"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>Adults</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              max="20" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              data-testid="input-adults"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>Children</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              max="20" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              data-testid="input-children"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Special Requests */}
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

                  {/* Submit Button */}
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
