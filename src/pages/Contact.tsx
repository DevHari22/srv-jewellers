import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, phone, subject, message });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-gold">Home</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">Contact Us</span>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <h1 className="text-3xl font-serif font-bold text-gray-900 text-center mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mb-4">
                <Phone size={24} className="text-maroon" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 mb-4">
                Call us directly for immediate assistance
              </p>
              <a href="tel:+919876543210" className="text-lg font-medium text-maroon">
                +91 98765 43210
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Mon-Sat: 10:00 AM - 8:00 PM
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mb-4">
                <Mail size={24} className="text-maroon" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-4">
                Write to us for queries and support
              </p>
              <a href="mailto:info@srvjewellers.com" className="text-lg font-medium text-maroon">
                info@srvjewellers.com
              </a>
              <p className="text-sm text-gray-500 mt-2">
                We respond within 24 hours
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mb-4">
                <MapPin size={24} className="text-maroon" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">
                Come to our store to see our collections
              </p>
              <p className="text-lg font-medium text-maroon">
                229 A, Bazzar Street, Namakkal
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tamil Nadu - 637001
              </p>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
                
                {submitted ? (
                  <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-4">
                    <h3 className="font-medium text-green-800 mb-2">Thank you for contacting us!</h3>
                    <p className="text-green-700">
                      We have received your message and will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      ></textarea>
                    </div>
                    
                    <Button type="submit" className="bg-maroon hover:bg-maroon-dark text-white">
                      <Send size={18} className="mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
              
              <div className="h-96 lg:h-auto">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.8087928666396!2d78.16469661478558!3d11.227728992009284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babe1ba07b5002f%3A0xf434d3800d817d0c!2sBazaar%20St%2C%20Namakkal%2C%20Tamil%20Nadu%20637001!5e0!3m2!1sen!2sin!4v1650364787!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SRV Jewellers Namakkal Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
