
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
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="container relative z-10 py-16 sm:py-24 md:py-32 lg:py-40">
        <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left px-4 md:px-0">
          <div className="inline-block bg-[#D4AF37]/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-[#4A3212] font-semibold text-sm sm:text-base">New Collection 2025</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 sm:mb-8 leading-tight">
            Exquisite <span className="text-[#D4AF37]">Jewelry</span> For Every Occasion
          </h1>
          <p className="text-gray-100 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-lg">
            Discover our handcrafted traditional and contemporary designs made with the
            finest gold, diamonds, and precious gemstones.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center sm:items-start justify-center md:justify-start">
            <Button className="bg-[#8B4513] hover:bg-[#6B3612] text-white text-base sm:text-lg px-8 py-6 rounded-md w-full sm:w-auto" asChild>
              <Link to="/collections">Shop Collections</Link>
            </Button>
            <Button variant="outline" className="border-2 border-[#D4AF37] text-white hover:bg-[#D4AF37]/20 hover:text-white text-base sm:text-lg px-8 py-6 rounded-md w-full sm:w-auto" asChild>
              <Link to="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling banner at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#D4AF37]/70 backdrop-blur-sm py-2.5 z-20">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">FREE SHIPPING ON ORDERS ABOVE ₹25,000</span>
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">•</span>
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">100% CERTIFIED JEWELRY</span>
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">•</span>
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">BIS HALLMARKED GOLD</span>
          </div>
          <div className="animate-marquee2 inline-block absolute">
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">FREE SHIPPING ON ORDERS ABOVE ₹25,000</span>
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">•</span>
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">100% CERTIFIED JEWELRY</span>
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">•</span>
            <span className="mx-4 sm:mx-6 text-[#4A3212] font-medium text-sm sm:text-base">BIS HALLMARKED GOLD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
