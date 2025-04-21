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
                  Founded in 1935, SRV JEWELLERS represents five generations of master jewelers, with our current leader 
                  Mr. Rajasekaran bringing over 35 years of expertise in handcrafting exquisite jewelry. Our legacy 
                  of traditional craftsmanship has been passed down through generations, making us one of the most 
                  trusted names in Indian jewelry.
                </p>
                <p className="text-gray-700 mb-4">
                  Mr. Rajasekaran, a fifth-generation jeweler, has personally trained numerous artisans in the 
                  ancient techniques of handcrafting jewelry. His dedication to preserving these traditional methods 
                  while embracing modern designs has made SRV JEWELLERS a benchmark for quality in the industry.
                </p>
                <p className="text-gray-700">
                  Today, under Mr. Rajasekaran's leadership, SRV JEWELLERS continues to create masterpieces that 
                  blend centuries-old craftsmanship with contemporary aesthetics, ensuring each piece tells a story 
                  of heritage and excellence.
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
              <h2 className="text-3xl font-serif font-bold mb-4 text-gold-gradient">Our Expert</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Meet the master craftsman behind our exquisite jewelry creations.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Mr. Rajasekaran" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-1">Mr. Rajasekaran</h3>
                <p className="text-gold mb-3">Founder & Master Craftsman</p>
                <p className="text-gray-600">
                  A fifth-generation jeweler with over 35 years of expertise in traditional handcrafted jewelry. His dedication to preserving ancient techniques while embracing contemporary designs has made him a respected figure in the industry.
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
