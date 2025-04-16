
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 bg-gray-50 indian-pattern">
        <div className="container max-w-md text-center px-4">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gold/20">
            <h1 className="text-5xl font-serif font-bold text-gold mb-4">404</h1>
            <h2 className="text-2xl font-serif font-semibold text-maroon mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              We're sorry, the page you are looking for could not be found or may have been moved.
            </p>
            <Button className="btn-gold inline-flex items-center" asChild>
              <Link to="/">
                <ArrowLeft size={18} className="mr-2" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
