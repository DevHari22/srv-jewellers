
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Box } from "lucide-react";
import { Button } from "@/components/ui/button";

const Collections = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-700">Collections</span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center">
          <Box className="mr-2 text-maroon" /> Our Collections
        </h1>
        <div className="bg-white rounded-lg p-8 shadow">
          <p className="text-gray-700 mb-4">
            Explore our exquisite collections of fine jewelry, each crafted with care and love.
          </p>
          <Button asChild className="bg-maroon hover:bg-maroon-dark text-white">
            <Link to="/categories">Shop Now</Link>
          </Button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Collections;
