
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { LoginForm } from "@/components/auth/LoginForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress"; 

const Login = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Handle email verification redirects
  useEffect(() => {
    if (location.hash) {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        {loading ? (
          <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
            <div className="text-center">
              <h2 className="text-lg font-medium mb-4">Authenticating...</h2>
              <Progress className="h-2" value={75} />
            </div>
          </div>
        ) : (
          <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-maroon via-gold to-maroon bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>
            <LoginForm />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Login;
