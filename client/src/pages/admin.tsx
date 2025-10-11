import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('accommodations');
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: string; id: string }>({
    open: false,
    type: '',
    id: '',
  });

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLocation('/admin/login');
    } else {
      setAdminToken(token);
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
    setLocation('/admin/login');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/${deleteDialog.type}/${deleteDialog.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        toast({
          title: 'Deleted',
          description: 'Item deleted successfully',
        });
        // Trigger refresh of the tables
        setRefreshKey(prev => prev + 1);
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete item',
        variant: 'destructive',
      });
    }
    setDeleteDialog({ open: false, type: '', id: '' });
  };

  if (!adminToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="accommodations" data-testid="tab-accommodations">
              Accommodations
            </TabsTrigger>
            <TabsTrigger value="destinations" data-testid="tab-destinations">
              Destinations
            </TabsTrigger>
            <TabsTrigger value="blogs" data-testid="tab-blogs">
              Blogs
            </TabsTrigger>
            <TabsTrigger value="volunteer-programs" data-testid="tab-volunteer-programs">
              Volunteer Programs
            </TabsTrigger>
            <TabsTrigger value="itineraries" data-testid="tab-itineraries">
              Itineraries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accommodations">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Accommodations</h2>
              <Button onClick={() => setLocation('/admin/accommodations/new')} data-testid="button-add-accommodation">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            <AdminContentTable 
              key={refreshKey}
              type="accommodations" 
              token={adminToken} 
              onDelete={(id) => setDeleteDialog({ open: true, type: 'accommodations', id })}
            />
          </TabsContent>

          <TabsContent value="destinations">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Destinations</h2>
              <Button onClick={() => setLocation('/admin/destinations/new')} data-testid="button-add-destination">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            <AdminContentTable 
              key={refreshKey}
              type="destinations" 
              token={adminToken} 
              onDelete={(id) => setDeleteDialog({ open: true, type: 'destinations', id })}
            />
          </TabsContent>

          <TabsContent value="blogs">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Blogs</h2>
              <Button onClick={() => setLocation('/admin/blogs/new')} data-testid="button-add-blog">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            <AdminContentTable 
              key={refreshKey}
              type="blogs" 
              token={adminToken}
              onDelete={(id) => setDeleteDialog({ open: true, type: 'blogs', id })}
            />
          </TabsContent>

          <TabsContent value="volunteer-programs">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Volunteer Programs</h2>
              <Button onClick={() => setLocation('/admin/volunteer-programs/new')} data-testid="button-add-volunteer-program">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            <AdminContentTable 
              key={refreshKey}
              type="volunteer-programs" 
              token={adminToken}
              onDelete={(id) => setDeleteDialog({ open: true, type: 'volunteer-programs', id })}
            />
          </TabsContent>

          <TabsContent value="itineraries">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Itineraries</h2>
              <Button onClick={() => setLocation('/admin/itineraries/new')} data-testid="button-add-itinerary">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            <AdminContentTable 
              key={refreshKey}
              type="itineraries" 
              token={adminToken}
              onDelete={(id) => setDeleteDialog({ open: true, type: 'itineraries', id })}
            />
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function AdminContentTable({ 
  type, 
  token,
  onDelete 
}: { 
  type: string; 
  token: string;
  onDelete: (id: string) => void;
}) {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/admin/${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [type, token]);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No items found. Click "Add New" to create one.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title/Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} data-testid={`row-${type}-${item.id}`}>
              <TableCell className="font-mono text-sm">{item.id}</TableCell>
              <TableCell>{item.title || item.name}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Published
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocation(`/admin/${type}/${item.id}`)}
                  data-testid={`button-edit-${item.id}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(item.id)}
                  data-testid={`button-delete-${item.id}`}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
