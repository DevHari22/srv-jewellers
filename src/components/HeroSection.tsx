
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero background with overlay */}
      <div className="absolute inset-0 bg-black">
        <img
          src="https://images.unsplash.com/photo-1601121778838-e0320cf10b3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
          alt="Indian Jewelry Collection"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="container relative z-10 py-24 md:py-32 lg:py-40">
        <div className="max-w-xl">
          <div className="inline-block bg-gold px-3 py-1 rounded mb-4">
            <span className="text-maroon-dark font-medium">New Collection 2025</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Exquisite Indian Jewelry Collection
          </h1>
          <p className="text-gray-200 text-lg mb-8 max-w-lg">
            Discover our handcrafted traditional and contemporary designs made with the
            finest gold, diamonds, and precious gemstones.
          </p>
          <div className="space-x-4">
            <Button className="btn-gold text-base px-6 py-3 rounded-md" asChild>
              <Link to="/collections">Shop Collections</Link>
            </Button>
            <Button variant="outline" className="border-gold text-white hover:bg-gold hover:text-maroon-dark text-base px-6 py-3 rounded-md" asChild>
              <Link to="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
