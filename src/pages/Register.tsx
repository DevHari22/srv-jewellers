
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Register = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-maroon via-gold to-maroon bg-clip-text text-transparent">
              Create an Account
            </h1>
            <p className="text-gray-600 mt-2">Join SRV JEWELLERS to explore our collection</p>
          </div>
          
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-700">Email Verification</AlertTitle>
            <AlertDescription className="text-blue-600 text-sm">
              After signing up, you'll receive a verification email. 
              Click the link in the email to verify your account and complete the registration process.
            </AlertDescription>
          </Alert>
          
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
