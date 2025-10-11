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

const accommodationFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  continental: z.string().min(1, 'Continental is required'),
  country: z.string().min(1, 'Country is required'),
  destination: z.string().min(1, 'Destination is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(1, 'Price is required'),
  rating: z.coerce.number().min(1).max(5).default(5),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  imageUrl: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
});

type AccommodationFormData = z.infer<typeof accommodationFormSchema>;

export default function AdminAccommodationForm() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState('');
  const isEdit = id && id !== 'new';

  const form = useForm<AccommodationFormData>({
    resolver: zodResolver(accommodationFormSchema),
    defaultValues: {
      name: '',
      continental: 'africa',
      country: 'tanzania',
      destination: '',
      category: 'luxury',
      description: '',
      price: 0,
      rating: 5,
      features: [],
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
      fetchAccommodation();
    }
  }, [isEdit, adminToken]);

  const fetchAccommodation = async () => {
    try {
      const response = await fetch(`/api/admin/accommodations/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (response.ok) {
        const accommodation = await response.json();
        form.reset({
          name: accommodation.name,
          continental: accommodation.continental,
          country: accommodation.country,
          destination: accommodation.destination,
          category: accommodation.category,
          description: accommodation.description,
          price: accommodation.price,
          rating: accommodation.rating || 5,
          features: accommodation.features || [],
          imageUrl: accommodation.imageUrl || '',
          galleryImages: accommodation.galleryImages || [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch accommodation:', error);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = form.getValues('features');
      form.setValue('features', [...currentFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues('features');
    form.setValue('features', currentFeatures.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: AccommodationFormData) => {
    setIsLoading(true);
    try {
      const url = isEdit ? `/api/admin/accommodations/${id}` : '/api/admin/accommodations';
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
          title: isEdit ? 'Accommodation updated' : 'Accommodation created',
          description: `Accommodation has been ${isEdit ? 'updated' : 'created'} successfully`,
        });
        setLocation('/admin');
      } else {
        throw new Error('Failed to save accommodation');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save accommodation',
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
            {isEdit ? 'Edit Accommodation' : 'Create New Accommodation'}
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
                  <FormLabel>Accommodation Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Four Seasons Safari Lodge" {...field} />
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
                        <SelectTrigger>
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
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tanzania">Tanzania</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="rwanda">Rwanda</SelectItem>
                        <SelectItem value="uganda">Uganda</SelectItem>
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
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="serengeti" {...field} />
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
                        <SelectItem value="ultra-luxury">Ultra Luxury</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="mid-range">Mid Range</SelectItem>
                        <SelectItem value="budget">Budget</SelectItem>
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
                      placeholder="Describe this accommodation..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD per night)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features & Amenities</FormLabel>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a feature (e.g., Free WiFi)"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addFeature();
                          }
                        }}
                      />
                      <Button type="button" onClick={addFeature}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {field.value.length > 0 && (
                      <div className="space-y-2">
                        {field.value.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted rounded"
                          >
                            <span>{feature}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeature(index)}
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
                      folder="accommodations"
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
                      folder="accommodations/gallery"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Saving...' : isEdit ? 'Update Accommodation' : 'Create Accommodation'}
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
