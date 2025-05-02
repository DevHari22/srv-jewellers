
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
          alt="SRV JEWELLERS Collection"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="container relative z-10 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left px-4 md:px-0">
          <div className="inline-block bg-gold/50 px-3 py-1 rounded-full mb-4">
            <span className="text-maroon-dark font-bold text-xs sm:text-sm md:text-base">New Collection 2025</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
            Exquisite <span className="text-gold/80">Jewelry</span> For Every Occasion
          </h1>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg">
            Discover our handcrafted traditional and contemporary designs made with the
            finest gold, diamonds, and precious gemstones.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center sm:items-start justify-center md:justify-start">
            <Button className="bg-maroon hover:bg-maroon/90 text-white text-sm sm:text-base px-5 py-2 sm:py-3 rounded-md w-full sm:w-auto" asChild>
              <Link to="/collections">Shop Collections</Link>
            </Button>
            <Button variant="outline" className="border-gold/70 text-white hover:bg-gold/20 hover:text-white text-sm sm:text-base px-5 py-2 sm:py-3 rounded-md w-full sm:w-auto" asChild>
              <Link to="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling banner at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gold/50 py-1.5 sm:py-2 z-20">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">FREE SHIPPING ON ORDERS ABOVE ₹25,000</span>
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">•</span>
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">100% CERTIFIED JEWELRY</span>
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">•</span>
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">BIS HALLMARKED GOLD</span>
          </div>
          <div className="animate-marquee2 inline-block absolute">
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">FREE SHIPPING ON ORDERS ABOVE ₹25,000</span>
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">•</span>
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">100% CERTIFIED JEWELRY</span>
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">•</span>
            <span className="mx-3 sm:mx-4 text-maroon-dark font-medium text-xs sm:text-sm">BIS HALLMARKED GOLD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
