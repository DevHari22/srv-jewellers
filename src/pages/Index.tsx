
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import GoldRateSection from "@/components/GoldRateSection";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature blocks */}
              <div className="flex flex-col items-center text-center p-6 border border-gold/20 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Secure Transactions</h3>
                <p className="text-gray-600">
                  Every purchase is secure thanks to our advanced encryption and authentication protocols.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-gold/20 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Genuine Products</h3>
                <p className="text-gray-600">
                  All our jewelry comes with certification of authenticity and is hallmarked.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-gold/20 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Nationwide Delivery</h3>
                <p className="text-gray-600">
                  We deliver across India with insured shipping and tracking on all orders.
                </p>
              </div>
            </div>
          </div>
        </div>
        <FeaturedCategories />
        <FeaturedProducts />
        <GoldRateSection />
        <div className="py-16 bg-white">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center">
              {/* About section with image */}
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <img 
                  src="https://images.unsplash.com/photo-1684487747118-0497859dcamf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80" 
                  alt="Indian Jewelry Craftsmanship" 
                  className="rounded-lg shadow-md w-full h-auto max-h-[500px] object-cover"
                />
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-serif font-bold mb-4 text-gold-gradient">Our Heritage</h2>
                <p className="text-gray-700 mb-4">
                  For over three generations, Indian Gem Emporium has been crafting exquisite jewelry that
                  combines traditional artistry with contemporary design. Our master artisans bring centuries
                  of heritage techniques to create pieces that are both timeless and modern.
                </p>
                <p className="text-gray-700 mb-4">
                  We source only the finest materials - ethically mined diamonds, precious gemstones, and
                  high-quality gold - to ensure that each piece meets our exceptional standards of quality
                  and beauty.
                </p>
                <p className="text-gray-700 mb-4">
                  Every creation from Indian Gem Emporium tells a story of tradition, craftsmanship, and
                  the rich cultural heritage of India's jewelry-making legacy.
                </p>
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
