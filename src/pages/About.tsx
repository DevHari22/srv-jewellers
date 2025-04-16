
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Award, Check, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-gold">Home</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">About Us</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-maroon-dark to-maroon text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Story</h1>
              <p className="text-lg text-gold-light font-light mb-8">
                Crafting exceptional jewelry since 1985
              </p>
              <p className="text-gray-200 mb-8">
                SRV JEWELLERS has been a beacon of excellence in the Indian jewelry industry, 
                bringing together traditional craftsmanship and contemporary design to create 
                timeless pieces that celebrate the rich heritage of Indian jewelry making.
              </p>
            </div>
          </div>
        </section>

        {/* Our Heritage */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient">Our Heritage</h2>
                <p className="text-gray-700 mb-4">
                  Founded by Shri Ramesh Verma in 1985, SRV JEWELLERS began as a small family-owned shop in Chandni Chowk, 
                  the historic jewelry market of Delhi. With an unwavering commitment to quality and authenticity, the 
                  business quickly gained popularity among discerning customers.
                </p>
                <p className="text-gray-700 mb-4">
                  Over three generations, we have preserved the art of traditional jewelry making while embracing modern 
                  techniques and designs. Our master craftsmen, many of whom have been with us for decades, bring 
                  hundreds of years of collective expertise to every piece we create.
                </p>
                <p className="text-gray-700">
                  Today, SRV JEWELLERS stands as a testament to excellence in Indian jewelry, offering a diverse 
                  collection that ranges from wedding and bridal jewelry to everyday wear, all crafted with the 
                  same dedication to quality that has defined our legacy.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg h-96">
                <img 
                  src="https://images.unsplash.com/photo-1684487747118-0497859dcamf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80" 
                  alt="Indian Jewelry Workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4 text-gold-gradient">Our Values</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                At SRV JEWELLERS, our core values guide everything we do, from the selection of materials 
                to our customer service approach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <Award size={24} className="text-maroon" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Quality Excellence</h3>
                <p className="text-gray-600">
                  We source only the finest materials and maintain rigorous quality standards throughout 
                  our manufacturing process.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <ShieldCheck size={24} className="text-maroon" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Trust & Transparency</h3>
                <p className="text-gray-600">
                  We believe in complete transparency about our products, pricing, and processes, 
                  earning the trust of generations of customers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <Users size={24} className="text-maroon" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Customer Focus</h3>
                <p className="text-gray-600">
                  Our relationships with customers extend beyond transactions; we strive to create 
                  jewelry that marks their most precious moments.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <Check size={24} className="text-maroon" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Ethical Sourcing</h3>
                <p className="text-gray-600">
                  We are committed to responsible and ethical sourcing of our materials, ensuring 
                  our jewelry is as beautiful in its origins as in its appearance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4 text-gold-gradient">Our Team</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Meet the passionate individuals who bring our vision to life through their 
                craftsmanship, expertise, and dedication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Sunil Verma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-1">Sunil Verma</h3>
                <p className="text-gold mb-3">CEO & Master Jeweler</p>
                <p className="text-gray-600">
                  Third-generation jeweler with over 25 years of experience in the industry.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Priya Verma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-1">Priya Verma</h3>
                <p className="text-gold mb-3">Creative Director</p>
                <p className="text-gray-600">
                  Award-winning designer bringing contemporary vision to traditional jewelry.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Rajesh Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-1">Rajesh Kumar</h3>
                <p className="text-gold mb-3">Master Craftsman</p>
                <p className="text-gray-600">
                  With 40 years of experience, Rajesh leads our team of skilled artisans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-maroon-dark to-maroon text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-6">Visit Our Store</h2>
              <p className="text-gray-200 mb-8">
                Experience our collection in person and let our experts help you find the perfect piece.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-gold hover:bg-gold-dark text-maroon" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/categories">View Collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
