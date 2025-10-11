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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/ui/image-upload';

const destinationFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  continental: z.string().min(1, 'Continental is required'),
  country: z.string().min(1, 'Country is required'),
  region: z.string().optional(),
  destinationType: z.string().min(1, 'Destination type is required'),
  description: z.string().min(1, 'Description is required'),
  highlights: z.array(z.string()).optional(),
  bestTime: z.string().optional(),
  imageUrl: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  subDestinations: z.array(z.string()).optional(),
});

type DestinationFormData = z.infer<typeof destinationFormSchema>;

export default function AdminDestinationForm() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [newHighlight, setNewHighlight] = useState('');
  const [newSubDestination, setNewSubDestination] = useState('');
  const isEdit = id && id !== 'new';

  const form = useForm<DestinationFormData>({
    resolver: zodResolver(destinationFormSchema),
    defaultValues: {
      name: '',
      continental: 'africa',
      country: 'tanzania',
      region: '',
      destinationType: 'safari-circuit',
      description: '',
      highlights: [],
      bestTime: '',
      imageUrl: '',
      galleryImages: [],
      subDestinations: [],
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
      fetchDestination();
    }
  }, [isEdit, adminToken]);

  const fetchDestination = async () => {
    try {
      const response = await fetch(`/api/admin/destinations/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (response.ok) {
        const destination = await response.json();
        form.reset({
          name: destination.name,
          continental: destination.continental,
          country: destination.country,
          region: destination.region || '',
          destinationType: destination.destinationType,
          description: destination.description,
          highlights: destination.highlights || [],
          bestTime: destination.bestTime || '',
          imageUrl: destination.imageUrl || '',
          galleryImages: destination.galleryImages || [],
          subDestinations: destination.subDestinations || [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch destination:', error);
    }
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      const currentHighlights = form.getValues('highlights') || [];
      form.setValue('highlights', [...currentHighlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    const currentHighlights = form.getValues('highlights') || [];
    form.setValue('highlights', currentHighlights.filter((_, i) => i !== index));
  };

  const addSubDestination = () => {
    if (newSubDestination.trim()) {
      const currentSubDestinations = form.getValues('subDestinations') || [];
      form.setValue('subDestinations', [...currentSubDestinations, newSubDestination.trim()]);
      setNewSubDestination('');
    }
  };

  const removeSubDestination = (index: number) => {
    const currentSubDestinations = form.getValues('subDestinations') || [];
    form.setValue('subDestinations', currentSubDestinations.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: DestinationFormData) => {
    setIsLoading(true);
    try {
      const url = isEdit ? `/api/admin/destinations/${id}` : '/api/admin/destinations';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: isEdit ? 'Destination updated' : 'Destination created',
          description: `Destination has been ${isEdit ? 'updated' : 'created'} successfully`,
        });
        setLocation('/admin');
      } else {
        throw new Error('Failed to save destination');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save destination',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
            data-testid="button-back-to-admin"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
          <h1 className="text-2xl font-serif font-bold">
            {isEdit ? 'Edit Destination' : 'Create New Destination'}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Serengeti National Park" 
                      {...field} 
                      data-testid="input-destination-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="continental"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Continental</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-continental">
                          <SelectValue placeholder="Select continental" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="africa">Africa</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tanzania">Tanzania</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="rwanda">Rwanda</SelectItem>
                        <SelectItem value="uganda">Uganda</SelectItem>
                        <SelectItem value="south-africa">South Africa</SelectItem>
                        <SelectItem value="botswana">Botswana</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="destinationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-destination-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="safari-circuit">Safari Circuit</SelectItem>
                        <SelectItem value="beach">Beach</SelectItem>
                        <SelectItem value="mountain">Mountain</SelectItem>
                        <SelectItem value="city">City</SelectItem>
                        <SelectItem value="country">Country</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="northern-circuit, coast, etc." 
                        {...field} 
                        data-testid="input-region"
                      />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe this destination..."
                      className="min-h-[100px]"
                      {...field}
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bestTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Best Time to Visit (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="June-October for dry season..." 
                      {...field} 
                      data-testid="input-best-time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>Highlights (Optional)</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a highlight"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                  data-testid="input-new-highlight"
                />
                <Button 
                  type="button" 
                  onClick={addHighlight} 
                  size="sm"
                  data-testid="button-add-highlight"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {(form.watch('highlights') || []).map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted p-2 rounded-md"
                    data-testid={`highlight-item-${index}`}
                  >
                    <span>{highlight}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHighlight(index)}
                      data-testid={`button-remove-highlight-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <FormLabel>Sub-Destinations (Optional, for countries)</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a sub-destination"
                  value={newSubDestination}
                  onChange={(e) => setNewSubDestination(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubDestination())}
                  data-testid="input-new-subdestination"
                />
                <Button 
                  type="button" 
                  onClick={addSubDestination} 
                  size="sm"
                  data-testid="button-add-subdestination"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {(form.watch('subDestinations') || []).map((subDest, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted p-2 rounded-md"
                    data-testid={`subdestination-item-${index}`}
                  >
                    <span>{subDest}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubDestination(index)}
                      data-testid={`button-remove-subdestination-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
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

            <FormField
              control={form.control}
              name="galleryImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallery Images (Optional)</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      multiple
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation('/admin')}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                data-testid="button-submit"
              >
                {isLoading ? 'Saving...' : isEdit ? 'Update Destination' : 'Create Destination'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
