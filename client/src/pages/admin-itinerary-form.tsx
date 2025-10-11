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

const itineraryFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().min(1, 'Price is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  highlights: z.array(z.string()).min(1, 'At least one highlight is required'),
  includes: z.array(z.string()).min(1, 'At least one inclusion is required'),
  difficulty: z.string().optional(),
  groupSize: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
  imageUrl: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
});

type ItineraryFormData = z.infer<typeof itineraryFormSchema>;

export default function AdminItineraryForm() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [newHighlight, setNewHighlight] = useState('');
  const [newInclusion, setNewInclusion] = useState('');
  const isEdit = id && id !== 'new';

  const form = useForm<ItineraryFormData>({
    resolver: zodResolver(itineraryFormSchema),
    defaultValues: {
      name: '',
      duration: '',
      price: 0,
      category: 'classic-safari',
      description: '',
      highlights: [],
      includes: [],
      difficulty: '',
      groupSize: '',
      rating: 5,
      imageUrl: '',
      galleryImages: [],
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
      fetchItinerary();
    }
  }, [isEdit, adminToken]);

  const fetchItinerary = async () => {
    try {
      const response = await fetch(`/api/admin/itineraries/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (response.ok) {
        const itinerary = await response.json();
        form.reset({
          name: itinerary.name,
          duration: itinerary.duration,
          price: itinerary.price,
          category: itinerary.category,
          description: itinerary.description,
          highlights: itinerary.highlights || [],
          includes: itinerary.includes || [],
          difficulty: itinerary.difficulty || '',
          groupSize: itinerary.groupSize || '',
          rating: itinerary.rating || 5,
          imageUrl: itinerary.imageUrl || '',
          galleryImages: itinerary.galleryImages || [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch itinerary:', error);
    }
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      const currentHighlights = form.getValues('highlights');
      form.setValue('highlights', [...currentHighlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    const currentHighlights = form.getValues('highlights');
    form.setValue('highlights', currentHighlights.filter((_, i) => i !== index));
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      const currentInclusions = form.getValues('includes');
      form.setValue('includes', [...currentInclusions, newInclusion.trim()]);
      setNewInclusion('');
    }
  };

  const removeInclusion = (index: number) => {
    const currentInclusions = form.getValues('includes');
    form.setValue('includes', currentInclusions.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ItineraryFormData) => {
    setIsLoading(true);
    try {
      const url = isEdit ? `/api/admin/itineraries/${id}` : '/api/admin/itineraries';
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
          title: isEdit ? 'Itinerary updated' : 'Itinerary created',
          description: `Itinerary has been ${isEdit ? 'updated' : 'created'} successfully`,
        });
        setLocation('/admin');
      } else {
        throw new Error('Failed to save itinerary');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save itinerary',
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
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
          <h1 className="text-2xl font-serif font-bold">
            {isEdit ? 'Edit Itinerary' : 'Create New Itinerary'}
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
                  <FormLabel>Itinerary Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Classic Tanzania Safari" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="7 Days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="day-trip">Day Trip</SelectItem>
                        <SelectItem value="classic-safari">Classic Safari</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="kilimanjaro">Kilimanjaro</SelectItem>
                        <SelectItem value="trekking">Trekking</SelectItem>
                        <SelectItem value="hiking">Hiking</SelectItem>
                      </SelectContent>
                    </Select>
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
                      placeholder="Describe this itinerary..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2500"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Moderate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="groupSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Size (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="2-8 people" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="highlights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Highlights</FormLabel>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a highlight"
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addHighlight();
                          }
                        }}
                      />
                      <Button type="button" onClick={addHighlight}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {field.value.length > 0 && (
                      <div className="space-y-2">
                        {field.value.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted rounded"
                          >
                            <span>{highlight}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeHighlight(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's Included</FormLabel>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an inclusion"
                        value={newInclusion}
                        onChange={(e) => setNewInclusion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addInclusion();
                          }
                        }}
                      />
                      <Button type="button" onClick={addInclusion}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {field.value.length > 0 && (
                      <div className="space-y-2">
                        {field.value.map((inclusion, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted rounded"
                          >
                            <span>{inclusion}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeInclusion(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      folder="itineraries"
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
                  <FormLabel>Gallery Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      multiple
                      folder="itineraries/gallery"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Saving...' : isEdit ? 'Update Itinerary' : 'Create Itinerary'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation('/admin')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
