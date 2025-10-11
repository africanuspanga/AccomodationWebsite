import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const volunteerFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  country: z.string().min(1, 'Country is required'),
  flag: z.string().min(1, 'Flag emoji is required'),
  minAge: z.string().min(1, 'Minimum age is required'),
  duration: z.string().min(1, 'Duration is required'),
  cost: z.string().min(1, 'Cost is required'),
  focusAreas: z.array(z.string()).min(1, 'At least one focus area is required'),
  image: z.string().min(1, 'Main image is required'),
  description: z.string().min(1, 'Description is required'),
  fullExplanation: z.string().min(1, 'Full explanation is required'),
  activities: z.object({
    safari: z.boolean(),
    hiking: z.boolean(),
    mountainClimbing: z.boolean(),
    culturalTours: z.boolean(),
  }),
  highlights: z.array(z.string()).min(1, 'At least one highlight is required'),
});

type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

export default function AdminVolunteerForm() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [focusAreaInput, setFocusAreaInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const isEdit = id && id !== 'new';

  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      title: '',
      location: '',
      country: '',
      flag: '',
      minAge: '',
      duration: '',
      cost: '',
      focusAreas: [],
      image: '',
      description: '',
      fullExplanation: '',
      activities: {
        safari: false,
        hiking: false,
        mountainClimbing: false,
        culturalTours: false,
      },
      highlights: [],
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLocation('/admin/login');
    } else {
      setAdminToken(token);
    }
  }, [setLocation]);

  useEffect(() => {
    if (isEdit && adminToken) {
      fetchVolunteerProgram();
    }
  }, [isEdit, adminToken]);

  const fetchVolunteerProgram = async () => {
    try {
      const response = await fetch(`/api/admin/volunteer-programs/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (response.ok) {
        const program = await response.json();
        const activities = typeof program.activities === 'string' 
          ? JSON.parse(program.activities) 
          : program.activities;
        
        form.reset({
          title: program.title,
          location: program.location,
          country: program.country,
          flag: program.flag,
          minAge: program.minAge,
          duration: program.duration,
          cost: program.cost,
          focusAreas: program.focusAreas || [],
          image: program.image,
          description: program.description,
          fullExplanation: program.fullExplanation,
          activities,
          highlights: program.highlights || [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch volunteer program:', error);
    }
  };

  const onSubmit = async (data: VolunteerFormData) => {
    setIsLoading(true);
    try {
      const url = isEdit ? `/api/admin/volunteer-programs/${id}` : '/api/admin/volunteer-programs';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...data,
        activities: JSON.stringify(data.activities),
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: isEdit ? 'Program updated' : 'Program created',
          description: `Volunteer program has been ${isEdit ? 'updated' : 'created'} successfully`,
        });
        setLocation('/admin');
      } else {
        throw new Error('Failed to save volunteer program');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save volunteer program',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addFocusArea = () => {
    if (focusAreaInput.trim()) {
      const currentAreas = form.getValues('focusAreas');
      form.setValue('focusAreas', [...currentAreas, focusAreaInput.trim()]);
      setFocusAreaInput('');
    }
  };

  const removeFocusArea = (index: number) => {
    const currentAreas = form.getValues('focusAreas');
    form.setValue('focusAreas', currentAreas.filter((_, i) => i !== index));
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      const currentHighlights = form.getValues('highlights');
      form.setValue('highlights', [...currentHighlights, highlightInput.trim()]);
      setHighlightInput('');
    }
  };

  const removeHighlight = (index: number) => {
    const currentHighlights = form.getValues('highlights');
    form.setValue('highlights', currentHighlights.filter((_, i) => i !== index));
  };

  if (!adminToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => setLocation('/admin')}
            className="mb-2"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-serif font-bold">
            {isEdit ? 'Edit Volunteer Program' : 'Create New Volunteer Program'}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wildlife Conservation" {...field} data-testid="input-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Arusha, Tanzania" {...field} data-testid="input-location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tanzania" {...field} data-testid="input-country" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="flag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flag Emoji</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 🇹🇿" {...field} data-testid="input-flag" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Age</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 18+" {...field} data-testid="input-min-age" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2-12 weeks" {...field} data-testid="input-duration" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $500" {...field} data-testid="input-cost" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description for the program card"
                      className="resize-none"
                      rows={3}
                      {...field}
                      data-testid="input-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullExplanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Explanation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed explanation about the program"
                      className="resize-none"
                      rows={8}
                      {...field}
                      data-testid="input-full-explanation"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Focus Areas</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add focus area"
                  value={focusAreaInput}
                  onChange={(e) => setFocusAreaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFocusArea();
                    }
                  }}
                  data-testid="input-focus-area"
                />
                <Button
                  type="button"
                  onClick={addFocusArea}
                  size="icon"
                  data-testid="button-add-focus-area"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {form.watch('focusAreas').map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-sm"
                    data-testid={`focus-area-${index}`}
                  >
                    <span>{area}</span>
                    <button
                      type="button"
                      onClick={() => removeFocusArea(index)}
                      className="ml-1"
                      data-testid={`remove-focus-area-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              {form.formState.errors.focusAreas && (
                <p className="text-sm text-destructive mt-2">{form.formState.errors.focusAreas.message}</p>
              )}
            </div>

            <div>
              <FormLabel>Highlights</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add program highlight"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addHighlight();
                    }
                  }}
                  data-testid="input-highlight"
                />
                <Button
                  type="button"
                  onClick={addHighlight}
                  size="icon"
                  data-testid="button-add-highlight"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 mt-3">
                {form.watch('highlights').map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted p-2 rounded"
                    data-testid={`highlight-${index}`}
                  >
                    <span className="flex-1 text-sm">{highlight}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      data-testid={`remove-highlight-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              {form.formState.errors.highlights && (
                <p className="text-sm text-destructive mt-2">{form.formState.errors.highlights.message}</p>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <FormLabel className="text-base mb-4 block">Available Activities</FormLabel>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="activities.safari"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-safari"
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Safari</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activities.hiking"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-hiking"
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Hiking</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activities.mountainClimbing"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-mountain-climbing"
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Mountain Climbing</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activities.culturalTours"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-cultural-tours"
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Cultural Tours</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation('/admin')}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} data-testid="button-submit">
                {isLoading ? 'Saving...' : isEdit ? 'Update Program' : 'Create Program'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
