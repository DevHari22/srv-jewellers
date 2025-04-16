import React from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-maroon-dark to-maroon text-white pt-12 pb-6">
      <div className="container">
        {/* Footer top - main sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About us section */}
          <div>
            <h3 className="text-gold text-xl font-serif font-bold mb-4">SRV JEWELLERS</h3>
            <p className="text-gray-200 mb-4">
              Exquisite traditional and contemporary Indian jewelry crafted with
              the finest materials and exceptional artisanship since 1985.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-light transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-light transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-light transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-gold text-lg font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-gold-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-200 hover:text-gold-light transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-200 hover:text-gold-light transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-gold-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-gold-light transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-gold text-lg font-serif font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-gray-200 hover:text-gold-light transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-200 hover:text-gold-light transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-200 hover:text-gold-light transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-200 hover:text-gold-light transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-200 hover:text-gold-light transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-gold text-lg font-serif font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-gold-light shrink-0 mt-1" />
                <span className="text-gray-200">
                  229 A, Bazzar Street,<br />
                  Namakkal, Tamil Nadu - 637001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gold-light" />
                <span className="text-gray-200">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gold-light" />
                <span className="text-gray-200">info@srvjewellers.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="border-t border-gold/20 pt-6 mb-6">
          <div className="text-center">
            <h4 className="text-gold text-sm mb-3">ACCEPTED PAYMENT METHODS</h4>
            <div className="flex justify-center space-x-4">
              <div className="bg-white rounded px-3 py-1">
                <span className="text-maroon-dark font-bold">Visa</span>
              </div>
              <div className="bg-white rounded px-3 py-1">
                <span className="text-maroon-dark font-bold">MasterCard</span>
              </div>
              <div className="bg-white rounded px-3 py-1">
                <span className="text-maroon-dark font-bold">Paytm</span>
              </div>
              <div className="bg-white rounded px-3 py-1">
                <span className="text-maroon-dark font-bold">UPI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gold/20 pt-6 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} SRV JEWELLERS. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="text-gray-300 hover:text-gold-light transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-gold-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
