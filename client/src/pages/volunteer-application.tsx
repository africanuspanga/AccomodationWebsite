import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, FileText, User, Briefcase, Calendar, Users, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import SEOHead from '@/components/seo/seo-head';
import { volunteerPrograms } from '@/data/volunteer-programs';

const volunteerApplicationSchema = z.object({
  programId: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Female", "Male"], { required_error: "Please select your gender" }),
  fullAddress: z.string().min(1, "Full address is required"),
  country: z.string().min(1, "Country is required"),
  telephone: z.string().min(1, "Telephone number is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  email: z.string().email("Please enter a valid email address"),
  nationality: z.string().min(1, "Nationality is required"),
  passportNumber: z.string().min(1, "Passport number is required"),
  educationProfession: z.string().min(1, "Education/Profession is required"),
  language: z.string().min(1, "Please enter a valid language"),
  workingExperience: z.string().min(1, "Working experience is required"),
  howFoundUs: z.string().min(1, "Please explain how you found us"),
  expectedArrivalDate: z.string().min(1, "Expected arrival date is required"),
  volunteerDuration: z.string().min(1, "Duration of voluntary work is required"),
  dietaryRestrictions: z.boolean().default(false),
  dietaryDetails: z.string().optional(),
  excursions: z.array(z.string()).default([]),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyRelation: z.string().min(1, "Relation to emergency contact is required"),
  emergencyPhone: z.string().min(1, "Emergency contact phone is required"),
  emergencyEmail: z.string().email("Please enter a valid emergency contact email"),
});

type VolunteerApplicationForm = z.infer<typeof volunteerApplicationSchema>;

export default function VolunteerApplication() {
  const { id } = useParams();
  const program = volunteerPrograms.find(p => p.id === id);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedExcursions, setSelectedExcursions] = useState<string[]>([]);

  const excursionOptions = [
    "Tours & Safaris",
    "Mountain Climbing", 
    "Beach Holiday",
    "Cycling Adventure",
    "Cultural Tourism",
    "Local Village",
    "Local Activities"
  ];

  const form = useForm<VolunteerApplicationForm>({
    resolver: zodResolver(volunteerApplicationSchema),
    defaultValues: {
      programId: id || "",
      dietaryRestrictions: false,
      excursions: [],
    },
  });

  const mutation = useMutation({
    mutationFn: (data: VolunteerApplicationForm) => 
      apiRequest("/api/volunteer-applications", "POST", data),
    onSuccess: () => {
      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/volunteer-applications"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error submitting application",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: VolunteerApplicationForm) => {
    const submissionData = {
      ...data,
      excursions: selectedExcursions,
      dietaryDetails: data.dietaryRestrictions ? data.dietaryDetails : undefined,
    };
    mutation.mutate(submissionData);
  };

  const handleExcursionChange = (excursion: string, checked: boolean) => {
    setSelectedExcursions(prev => 
      checked 
        ? [...prev, excursion]
        : prev.filter(e => e !== excursion)
    );
    form.setValue('excursions', selectedExcursions);
  };

  if (!program) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
          <p className="text-muted-foreground mb-8">The volunteer program you're trying to apply for doesn't exist.</p>
          <Link href="/volunteers-program">
            <Button>Back to All Programs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={`Apply for ${program.title} - Volunteer Application | Accommodation Collection`}
        description={`Apply for the ${program.title} volunteer program and make a meaningful difference in ${program.country}.`}
        canonical={`/volunteer-application/${program.id}`}
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link href={`/volunteer-program/${program.id}`}>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Program Details
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Apply for Volunteer Program
            </h1>
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="text-sm">
                <span className="mr-2">{program.flag}</span>
                {program.title}
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete this application to join our {program.title} program. 
              All fields marked with * are required.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal & Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal & Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...form.register('firstName')}
                      className="bg-background"
                      data-testid="first-name-input"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...form.register('lastName')}
                      className="bg-background"
                      data-testid="last-name-input"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...form.register('dateOfBirth')}
                      className="bg-background"
                      data-testid="date-of-birth-input"
                    />
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.dateOfBirth.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>Gender *</Label>
                    <RadioGroup
                      onValueChange={(value) => form.setValue('gender', value as 'Female' | 'Male')}
                      className="flex gap-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                    </RadioGroup>
                    {form.formState.errors.gender && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.gender.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="fullAddress">Full Address *</Label>
                  <Textarea
                    id="fullAddress"
                    {...form.register('fullAddress')}
                    className="bg-background"
                    placeholder="Enter your full physical mailing address"
                    data-testid="address-input"
                  />
                  {form.formState.errors.fullAddress && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.fullAddress.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      {...form.register('country')}
                      className="bg-background"
                      data-testid="country-input"
                    />
                    {form.formState.errors.country && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.country.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      {...form.register('nationality')}
                      className="bg-background"
                      data-testid="nationality-input"
                    />
                    {form.formState.errors.nationality && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.nationality.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telephone">Telephone *</Label>
                    <Input
                      id="telephone"
                      {...form.register('telephone')}
                      className="bg-background"
                      data-testid="telephone-input"
                    />
                    {form.formState.errors.telephone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.telephone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile *</Label>
                    <Input
                      id="mobile"
                      {...form.register('mobile')}
                      className="bg-background"
                      data-testid="mobile-input"
                    />
                    {form.formState.errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.mobile.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      className="bg-background"
                      data-testid="email-input"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="passportNumber">Passport Number *</Label>
                    <Input
                      id="passportNumber"
                      {...form.register('passportNumber')}
                      className="bg-background"
                      data-testid="passport-input"
                    />
                    {form.formState.errors.passportNumber && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.passportNumber.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional & Experience Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Professional & Experience Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="educationProfession">Education/Profession *</Label>
                  <Input
                    id="educationProfession"
                    {...form.register('educationProfession')}
                    className="bg-background"
                    data-testid="education-input"
                  />
                  {form.formState.errors.educationProfession && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.educationProfession.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="language">Language *</Label>
                  <Input
                    id="language"
                    {...form.register('language')}
                    className="bg-background"
                    placeholder="Please enter a valid language"
                    data-testid="language-input"
                  />
                  {form.formState.errors.language && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.language.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="workingExperience">Working Experience *</Label>
                  <Textarea
                    id="workingExperience"
                    {...form.register('workingExperience')}
                    className="bg-background"
                    placeholder="Describe your relevant working experience"
                    data-testid="experience-input"
                  />
                  {form.formState.errors.workingExperience && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.workingExperience.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="howFoundUs">How did you find Accommodation Collection? *</Label>
                  <Textarea
                    id="howFoundUs"
                    {...form.register('howFoundUs')}
                    className="bg-background"
                    placeholder="Explain how you found us"
                    data-testid="how-found-us-input"
                  />
                  {form.formState.errors.howFoundUs && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.howFoundUs.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Program & Logistics Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Program & Logistics Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedArrivalDate">Expected Arrival Date *</Label>
                    <Input
                      id="expectedArrivalDate"
                      type="date"
                      {...form.register('expectedArrivalDate')}
                      className="bg-background"
                      data-testid="arrival-date-input"
                    />
                    {form.formState.errors.expectedArrivalDate && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.expectedArrivalDate.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="volunteerDuration">Duration of Voluntary Work *</Label>
                    <Input
                      id="volunteerDuration"
                      {...form.register('volunteerDuration')}
                      className="bg-background"
                      placeholder="e.g., 4 weeks, 2 months"
                      data-testid="duration-input"
                    />
                    {form.formState.errors.volunteerDuration && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.volunteerDuration.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="dietaryRestrictions"
                      checked={form.watch('dietaryRestrictions')}
                      onCheckedChange={(checked) => form.setValue('dietaryRestrictions', !!checked)}
                    />
                    <Label htmlFor="dietaryRestrictions">Do you have dietary restrictions?</Label>
                  </div>
                  {form.watch('dietaryRestrictions') && (
                    <div>
                      <Label htmlFor="dietaryDetails">Please specify your dietary restrictions</Label>
                      <Textarea
                        id="dietaryDetails"
                        {...form.register('dietaryDetails')}
                        className="bg-background"
                        placeholder="Describe your dietary restrictions in detail"
                        data-testid="dietary-details-input"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Optional Excursions (Select all that interest you)
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {excursionOptions.map((excursion) => (
                      <div key={excursion} className="flex items-center space-x-2">
                        <Checkbox
                          id={excursion}
                          checked={selectedExcursions.includes(excursion)}
                          onCheckedChange={(checked) => handleExcursionChange(excursion, !!checked)}
                        />
                        <Label htmlFor={excursion} className="text-sm">{excursion}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Emergency Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyContactName"
                      {...form.register('emergencyContactName')}
                      className="bg-background"
                      data-testid="emergency-name-input"
                    />
                    {form.formState.errors.emergencyContactName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.emergencyContactName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="emergencyRelation">Relation to You *</Label>
                    <Input
                      id="emergencyRelation"
                      {...form.register('emergencyRelation')}
                      className="bg-background"
                      placeholder="e.g., Parent, Sibling, Friend"
                      data-testid="emergency-relation-input"
                    />
                    {form.formState.errors.emergencyRelation && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.emergencyRelation.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyPhone">Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      {...form.register('emergencyPhone')}
                      className="bg-background"
                      data-testid="emergency-phone-input"
                    />
                    {form.formState.errors.emergencyPhone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.emergencyPhone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="emergencyEmail">Email *</Label>
                    <Input
                      id="emergencyEmail"
                      type="email"
                      {...form.register('emergencyEmail')}
                      className="bg-background"
                      data-testid="emergency-email-input"
                    />
                    {form.formState.errors.emergencyEmail && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.emergencyEmail.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                size="lg"
                disabled={mutation.isPending}
                className="px-12 py-4 text-lg font-semibold bg-primary hover:bg-primary/90"
                data-testid="submit-application-button"
              >
                {mutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}