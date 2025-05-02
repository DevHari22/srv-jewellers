
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
      <div className="container relative z-10 py-20 md:py-28 lg:py-36">
        <div className="max-w-xl text-center md:text-left">
          <div className="inline-block bg-gold/70 px-3 py-1 rounded-full mb-4">
            <span className="text-maroon-dark font-bold text-sm md:text-base">New Collection 2025</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Exquisite <span className="text-gold/90">Jewelry</span> For Every Occasion
          </h1>
          <p className="text-gray-200 text-lg mb-8 max-w-lg">
            Discover our handcrafted traditional and contemporary designs made with the
            finest gold, diamonds, and precious gemstones.
          </p>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 items-center md:items-start">
            <Button className="bg-maroon hover:bg-maroon/90 text-white text-base px-6 py-6 md:py-3 rounded-md w-full md:w-auto" asChild>
              <Link to="/collections">Shop Collections</Link>
            </Button>
            <Button variant="outline" className="border-gold/70 text-white hover:bg-gold/30 hover:text-white text-base px-6 py-6 md:py-3 rounded-md w-full md:w-auto" asChild>
              <Link to="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling banner at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gold/70 py-2 z-20">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            <span className="mx-4 text-maroon-dark font-medium">FREE SHIPPING ON ORDERS ABOVE ₹25,000</span>
            <span className="mx-4 text-maroon-dark font-medium">•</span>
            <span className="mx-4 text-maroon-dark font-medium">100% CERTIFIED JEWELRY</span>
            <span className="mx-4 text-maroon-dark font-medium">•</span>
            <span className="mx-4 text-maroon-dark font-medium">BIS HALLMARKED GOLD</span>
            <span className="mx-4 text-maroon-dark font-medium">•</span>
            <span className="mx-4 text-maroon-dark font-medium">30-DAY RETURNS</span>
          </div>
          <div className="animate-marquee2 inline-block absolute">
            <span className="mx-4 text-maroon-dark font-medium">FREE SHIPPING ON ORDERS ABOVE ₹25,000</span>
            <span className="mx-4 text-maroon-dark font-medium">•</span>
            <span className="mx-4 text-maroon-dark font-medium">100% CERTIFIED JEWELRY</span>
            <span className="mx-4 text-maroon-dark font-medium">•</span>
            <span className="mx-4 text-maroon-dark font-medium">BIS HALLMARKED GOLD</span>
            <span className="mx-4 text-maroon-dark font-medium">•</span>
            <span className="mx-4 text-maroon-dark font-medium">30-DAY RETURNS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
