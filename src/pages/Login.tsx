
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { LoginForm } from "@/components/auth/LoginForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { createDemoUsers } from "@/utils/createDemoUsers";

const Login = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Handle email verification redirects
  useEffect(() => {
    // Check if the URL contains a hash which might have auth data
    if (location.hash) {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        // Process the tokens to create a session
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        }).then(({ data, error }) => {
          if (error) {
            toast({
              title: "Verification Error",
              description: error.message,
              variant: "destructive"
            });
          } else if (data.session) {
            toast({
              title: "Email Verified",
              description: "Your email has been verified successfully. You can now log in.",
              variant: "default"
            });
          }
        });
      }
    }
  }, [location, toast]);

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Function to create demo users
  const handleCreateDemoUsers = async () => {
    toast({
      title: "Creating Demo Users",
      description: "Please wait while we create demo users...",
    });

    const result = await createDemoUsers();
    
    if (result) {
      toast({
        title: "Demo Users Created",
        description: "Admin: admin@example.com and Customer: customer@example.com (both with password: password123)",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to create demo users. See console for details.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-maroon via-gold to-maroon bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          <LoginForm />
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-3 text-center">Demo Accounts</h3>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleCreateDemoUsers}
            >
              Create Demo Users
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              This will create admin@example.com and customer@example.com accounts
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
