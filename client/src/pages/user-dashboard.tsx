import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Redirect, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, MapPin, Hotel, Receipt, MessageSquare, Calendar, DollarSign, User } from "lucide-react";
import SEOHead from '@/components/seo/seo-head';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockTrips = [
  {
    id: "1",
    destination: "Serengeti National Park",
    dates: "Dec 15-22, 2024",
    status: "Confirmed",
    guests: 2,
    totalCost: "$4,500"
  },
  {
    id: "2",
    destination: "Zanzibar Beach Resort",
    dates: "Jan 10-17, 2025",
    status: "Pending",
    guests: 2,
    totalCost: "$3,200"
  },
  {
    id: "3",
    destination: "Ngorongoro Crater Safari",
    dates: "Aug 5-9, 2024",
    status: "Completed",
    guests: 4,
    totalCost: "$6,800"
  }
];

const mockAccommodations = [
  {
    id: "1",
    name: "Four Seasons Safari Lodge",
    location: "Serengeti",
    checkIn: "Dec 15, 2024",
    checkOut: "Dec 22, 2024",
    roomType: "Luxury Safari Suite",
    status: "Confirmed"
  },
  {
    id: "2",
    name: "Park Hyatt Zanzibar",
    location: "Stone Town",
    checkIn: "Jan 10, 2025",
    checkOut: "Jan 17, 2025",
    roomType: "Ocean View Suite",
    status: "Pending"
  }
];

const mockReceipts = [
  {
    id: "REC-2024-001",
    date: "Aug 9, 2024",
    description: "Ngorongoro Crater Safari Package",
    amount: "$6,800",
    status: "Paid"
  },
  {
    id: "REC-2024-002",
    date: "Nov 20, 2024",
    description: "Serengeti Safari Deposit",
    amount: "$1,500",
    status: "Paid"
  },
  {
    id: "REC-2024-003",
    date: "Dec 10, 2024",
    description: "Zanzibar Resort Booking",
    amount: "$3,200",
    status: "Pending"
  }
];

const mockMessages = [
  {
    id: "1",
    from: "Safari Concierge",
    subject: "Your Serengeti Safari Confirmation",
    preview: "Your safari has been confirmed! Here are your booking details...",
    date: "Nov 22, 2024",
    unread: true
  },
  {
    id: "2",
    from: "Support Team",
    subject: "Travel Documents Required",
    preview: "Please upload your passport and visa documents for your upcoming trip...",
    date: "Nov 18, 2024",
    unread: true
  },
  {
    id: "3",
    from: "Billing Department",
    subject: "Payment Confirmation",
    preview: "We have received your payment of $1,500 for the Serengeti safari...",
    date: "Nov 20, 2024",
    unread: false
  }
];

export default function UserDashboard() {
  const { user, signOut, isLoading } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  const handleLogout = async () => {
    await signOut();
    setLocation('/');
  };

  return (
    <>
      <SEOHead 
        title="My Dashboard - Accommodation Collection"
        description="Manage your trips, accommodations, and bookings with Accommodation Collection."
        canonical="/dashboard"
        noIndex={true}
      />
      
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="border-b bg-background">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold">My Dashboard</h1>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="trips" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="trips" data-testid="tab-trips">
                <MapPin className="mr-2 h-4 w-4" />
                My Trips
              </TabsTrigger>
              <TabsTrigger value="accommodations" data-testid="tab-accommodations">
                <Hotel className="mr-2 h-4 w-4" />
                Accommodations
              </TabsTrigger>
              <TabsTrigger value="receipts" data-testid="tab-receipts">
                <Receipt className="mr-2 h-4 w-4" />
                Receipts
              </TabsTrigger>
              <TabsTrigger value="messages" data-testid="tab-messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
                {mockMessages.filter(m => m.unread).length > 0 && (
                  <Badge variant="destructive" className="ml-2">{mockMessages.filter(m => m.unread).length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Trips Tab */}
            <TabsContent value="trips">
              <Card>
                <CardHeader>
                  <CardTitle>My Trips</CardTitle>
                  <CardDescription>View and manage your upcoming and past trips</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTrips.map((trip) => (
                      <Card key={trip.id} data-testid={`trip-${trip.id}`}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg">{trip.destination}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {trip.dates}
                                </span>
                                <span>{trip.guests} guests</span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {trip.totalCost}
                                </span>
                              </div>
                            </div>
                            <Badge variant={
                              trip.status === 'Confirmed' ? 'default' : 
                              trip.status === 'Pending' ? 'secondary' : 
                              'outline'
                            }>
                              {trip.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accommodations Tab */}
            <TabsContent value="accommodations">
              <Card>
                <CardHeader>
                  <CardTitle>My Accommodations</CardTitle>
                  <CardDescription>Manage your booked accommodations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>Room Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAccommodations.map((accommodation) => (
                        <TableRow key={accommodation.id} data-testid={`accommodation-${accommodation.id}`}>
                          <TableCell className="font-medium">{accommodation.name}</TableCell>
                          <TableCell>{accommodation.location}</TableCell>
                          <TableCell>{accommodation.checkIn}</TableCell>
                          <TableCell>{accommodation.checkOut}</TableCell>
                          <TableCell>{accommodation.roomType}</TableCell>
                          <TableCell>
                            <Badge variant={accommodation.status === 'Confirmed' ? 'default' : 'secondary'}>
                              {accommodation.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Receipts Tab */}
            <TabsContent value="receipts">
              <Card>
                <CardHeader>
                  <CardTitle>Receipts & Invoices</CardTitle>
                  <CardDescription>View your payment history and receipts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Receipt ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReceipts.map((receipt) => (
                        <TableRow key={receipt.id} data-testid={`receipt-${receipt.id}`}>
                          <TableCell className="font-mono text-sm">{receipt.id}</TableCell>
                          <TableCell>{receipt.date}</TableCell>
                          <TableCell>{receipt.description}</TableCell>
                          <TableCell className="font-semibold">{receipt.amount}</TableCell>
                          <TableCell>
                            <Badge variant={receipt.status === 'Paid' ? 'default' : 'secondary'}>
                              {receipt.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>View your communications and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockMessages.map((message) => (
                      <Card 
                        key={message.id} 
                        className={message.unread ? 'border-primary/50 bg-primary/5' : ''}
                        data-testid={`message-${message.id}`}
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{message.subject}</h4>
                                {message.unread && <Badge variant="secondary" className="text-xs">New</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground">From: {message.from}</p>
                              <p className="text-sm">{message.preview}</p>
                            </div>
                            <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                              {message.date}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
