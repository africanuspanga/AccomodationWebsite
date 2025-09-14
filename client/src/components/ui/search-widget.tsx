import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface SearchWidgetProps {
  className?: string;
}

export default function SearchWidget({ className = '' }: SearchWidgetProps) {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const destinations = [
    'Serengeti National Park',
    'Ngorongoro Conservation Area',
    'Tarangire National Park',
    'Lake Manyara National Park',
    'Ruaha National Park',
    'Zanzibar Island',
  ];

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search:', { destination, checkIn, checkOut });
  };

  return (
    <div className={`glass-card p-6 md:p-8 rounded-2xl shadow-2xl ${className}`}>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-semibold text-foreground">
            Destination
          </Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger id="destination" data-testid="destination-select">
              <SelectValue placeholder="Select Destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest} value={dest.toLowerCase().replace(/\s+/g, '-')}>
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="check-in" className="text-sm font-semibold text-foreground">
            Check-in
          </Label>
          <Input
            id="check-in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-background"
            data-testid="check-in-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="check-out" className="text-sm font-semibold text-foreground">
            Check-out
          </Label>
          <Input
            id="check-out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-background"
            data-testid="check-out-input"
          />
        </div>
      </div>

      <Button
        onClick={handleSearch}
        className="w-full btn-primary py-4 text-lg font-semibold"
        data-testid="search-button"
      >
        <Search className="mr-2 h-5 w-5" />
        Search Experiences
      </Button>
    </div>
  );
}
