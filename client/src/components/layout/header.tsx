import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Mountain, User, LogOut } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useSupabaseAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Accommodations', href: '/accommodations' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Itineraries', href: '/itineraries' },
    { name: 'Flights', href: '/flights' },
    { name: 'Blogs', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];


  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/logo.png" alt="Accommodation Collection Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-serif text-primary">Accommodation Collection</h1>
              <p className="text-xs text-muted-foreground">Premium Africa Experiences</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  location === item.href
                    ? 'text-accent font-semibold'
                    : 'text-foreground hover:text-accent'
                }`}
                data-testid={`nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Authentication Controls */}
          <div className="hidden lg:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2" data-testid="user-menu-trigger">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center space-x-2 cursor-pointer" data-testid="profile-link">
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 cursor-pointer"
                    data-testid="logout-button"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="outline" data-testid="sign-in-button">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors duration-200 ${
                      location === item.href
                        ? 'text-accent font-semibold'
                        : 'text-foreground hover:text-accent'
                    }`}
                    data-testid={`mobile-nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Authentication */}
                <div className="border-t pt-4 mt-6">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>Signed in as {user.email}</span>
                      </div>
                      <Link href="/dashboard">
                        <Button 
                          onClick={() => setIsOpen(false)}
                          variant="outline"
                          className="w-full flex items-center space-x-2"
                          data-testid="mobile-profile-button"
                        >
                          <User className="h-4 w-4" />
                          <span>My Profile</span>
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        variant="outline"
                        className="w-full flex items-center space-x-2"
                        data-testid="mobile-logout-button"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </Button>
                    </div>
                  ) : (
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full" data-testid="mobile-sign-in-button">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
