
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import NewsletterSection from "@/components/NewsletterSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PromotionalBanner from "@/components/PromotionalBanner";
import JewelryRotator from "@/components/JewelryRotator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromotionalBanner
        title="FESTIVE SALE! 15% OFF on All Diamond Jewelry"
        description="Use code FESTIVE15 at checkout. Valid until 31st May"
        buttonText="Shop Diamonds"
        buttonLink="/categories/diamonds"
        backgroundColor="bg-rich-gold-gradient"
      />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <div className="py-12 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature blocks with enhanced colors */}
              <div className="flex flex-col items-center text-center p-6 border border-gold/20 rounded-lg shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-gold/5">
                <div className="w-16 h-16 rounded-full bg-gold-shimmer flex items-center justify-center mb-4 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2 text-maroon">Secure Transactions</h3>
                <p className="text-gray-600">
                  Every purchase is secure thanks to our advanced encryption and authentication protocols.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-gold/20 rounded-lg shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-gold/5">
                <div className="w-16 h-16 rounded-full bg-gold-shimmer flex items-center justify-center mb-4 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2 text-maroon">Genuine Products</h3>
                <p className="text-gray-600">
                  All our jewelry comes with certification of authenticity and is hallmarked.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-gold/20 rounded-lg shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-gold/5">
                <div className="w-16 h-16 rounded-full bg-gold-shimmer flex items-center justify-center mb-4 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2 text-maroon">Nationwide Delivery</h3>
                <p className="text-gray-600">
                  We deliver across India with insured shipping and tracking on all orders.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <PromotionalBanner
          title="NEW ARRIVALS: Wedding Collection 2025"
          description="Exclusive designs for the wedding season"
          buttonText="View Collection"
          buttonLink="/collections/wedding"
          backgroundColor="bg-maroon"
          textColor="text-white"
        />
        
        <FeaturedCategories />
        
        {/* 3D Jewelry Showcase */}
        <div className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                <span className="text-maroon">Interactive Jewelry</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our featured pieces in 3D. Click and drag to rotate and see the jewelry from different angles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <JewelryRotator 
                imageSrc="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
                title="Diamond Pendant"
                subtitle="Starting at ₹54,999"
                className="shadow-lg hover:shadow-xl transition-shadow"
              />
              
              <JewelryRotator 
                imageSrc="https://images.unsplash.com/photo-1605100804763-247f67b3557e"
                title="Ruby Cocktail Ring"
                subtitle="Starting at ₹48,999"
                className="shadow-lg hover:shadow-xl transition-shadow"
              />
              
              <JewelryRotator 
                imageSrc="https://images.unsplash.com/photo-1611592546144-85a763db01a1"
                title="Gold Bangles"
                subtitle="Starting at ₹72,999"
                className="shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
            
            <div className="text-center mt-10">
              <Button className="bg-maroon hover:bg-maroon/90 text-white px-8 py-2 text-lg" asChild>
                <Link to="/collections/premium">View Premium Collection</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <FeaturedProducts displayCount={8} />
        
        {/* Limited Time Offer Banner */}
        <div className="py-12 bg-gradient-to-r from-maroon to-maroon-dark text-white">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">Limited Time Offer</h3>
                <p className="text-lg text-gold-light">Buy any necklace and get earrings at 10% off!</p>
                <p className="text-sm opacity-80 mt-2">Offer valid until stocks last. T&C apply.</p>
              </div>
              <Button 
                className="bg-gold hover:bg-gold-shimmer text-maroon-dark font-medium px-8 py-6 text-lg"
                asChild
              >
                <Link to="/collections/sets">Shop Jewelry Sets</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="py-16 bg-white">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center">
              {/* About section with image */}
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <img 
                  src="https://images.unsplash.com/photo-1684487747118-0497859dcamf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80" 
                  alt="SRV JEWELLERS Craftsmanship" 
                  className="rounded-lg shadow-md w-full h-auto max-h-[500px] object-cover"
                />
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-serif font-bold mb-4 text-maroon">Our Heritage</h2>
                <p className="text-gray-700 mb-4">
                  For over three generations, SRV JEWELLERS has been crafting exquisite jewelry that
                  combines traditional artistry with contemporary design. Our master artisans bring centuries
                  of heritage techniques to create pieces that are both timeless and modern.
                </p>
                <p className="text-gray-700 mb-4">
                  We source only the finest materials - ethically mined diamonds, precious gemstones, and
                  high-quality gold - to ensure that each piece meets our exceptional standards of quality
                  and beauty.
                </p>
                <p className="text-gray-700 mb-6">
                  Every creation from SRV JEWELLERS tells a story of tradition, craftsmanship, and
                  the rich cultural heritage of India's jewelry-making legacy.
                </p>
                <Button className="bg-maroon hover:bg-maroon/90 text-white px-8 py-2 text-lg" asChild>
                  <Link to="/about">Explore Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
