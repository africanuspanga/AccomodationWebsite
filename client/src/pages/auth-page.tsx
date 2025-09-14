import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MapPin, Star, Users } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "", confirmPassword: "" });

  // Redirect if user is already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    registerMutation.mutate({
      username: registerForm.username,
      password: registerForm.password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              Accommodation Collection
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Discover Premium Travel Experiences in Tanzania
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <span className="text-slate-700 dark:text-slate-300">Curated destinations and luxury accommodations</span>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <span className="text-slate-700 dark:text-slate-300">Premium safari itineraries and experiences</span>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-slate-700 dark:text-slate-300">Personalized travel planning and booking</span>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg backdrop-blur">
            <p className="text-slate-600 dark:text-slate-400 italic">
              "Join thousands of travelers who have discovered the magic of Tanzania through our carefully curated accommodations and unforgettable safari experiences."
            </p>
          </div>
        </div>

        {/* Auth Form Section */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account or create a new one to start planning your dream safari
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" data-testid="tab-login">Sign In</TabsTrigger>
                  <TabsTrigger value="register" data-testid="tab-register">Create Account</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        data-testid="input-login-username"
                        type="text"
                        placeholder="Enter your username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        data-testid="input-login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      data-testid="button-login"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input
                        id="register-username"
                        data-testid="input-register-username"
                        type="text"
                        placeholder="Choose a username"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        data-testid="input-register-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        data-testid="input-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      data-testid="button-register"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}