import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import Home from "@/pages/home";
import Accommodations from "@/pages/accommodations";
import AccommodationDetail from "@/pages/accommodation-detail";
import Destinations from "@/pages/destinations";
import Itineraries from "@/pages/itineraries";
import ItineraryDetail from "@/pages/itinerary-detail";
import BookingForm from "@/pages/booking-form";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import FAQ from "@/pages/faq";
import Flights from "@/pages/flights";
import VolunteersProgram from "@/pages/volunteers-program";
import VolunteerProgramDetail from "@/pages/volunteer-program-detail";
import VolunteerApplication from "@/pages/volunteer-application";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CookiePolicy from "@/pages/cookie-policy";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin";
import AdminBlogForm from "@/pages/admin-blog-form";
import UserDashboard from "@/pages/user-dashboard";
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/accommodations" component={Accommodations} />
          <Route path="/accommodations/:id" component={AccommodationDetail} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/itineraries" component={Itineraries} />
          <Route path="/itineraries/:id" component={ItineraryDetail} />
          <Route path="/book/:type/:id" component={BookingForm} />
          <Route path="/flights" component={Flights} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogPost} />
          <Route path="/faq" component={FAQ} />
          <Route path="/volunteers-program" component={VolunteersProgram} />
          <Route path="/volunteer-program/:id" component={VolunteerProgramDetail} />
          <Route path="/volunteer-application/:id" component={VolunteerApplication} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/dashboard" component={UserDashboard} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/blogs/:id" component={AdminBlogForm} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SupabaseAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SupabaseAuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
