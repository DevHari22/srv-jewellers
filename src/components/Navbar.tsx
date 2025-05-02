
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X,
  ChevronDown,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/context/CartContext";
import { fetchSiteSettings, SiteSettings } from "@/services/settingsService";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const cartItemCount = cartItems.length;
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [goldRates, setGoldRates] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getSettings = async () => {
      const siteSettings = await fetchSiteSettings();
      if (siteSettings) {
        setSettings(siteSettings);
      }
    };
    
    getSettings();
  }, []);

  useEffect(() => {
    const fetchGoldRates = async () => {
      try {
        const { data, error } = await supabase
          .from('gold_rates')
          .select('*')
          .single();
        
        if (error) {
          console.error("Error fetching gold rates:", error);
          return;
        }

        if (data) {
          setGoldRates(data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldRates();

    const channel = supabase
      .channel('gold_rates_changes')
      .on(
        'postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'gold_rates' 
        },
        () => {
          fetchGoldRates();
        }
      )
      .subscribe();

    const intervalId = setInterval(fetchGoldRates, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
      supabase.removeChannel(channel);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="relative z-50">
      {/* Top bar with gold rates */}
      <div className="bg-maroon text-white py-2 text-sm">
        
        <div className="container flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-x-4 items-center">
            <span>
              <span className="font-medium">Gold Rate:</span>{" "}
              <span className="text-gold-light">
                ₹{settings?.gold_rate?.toLocaleString() || "5,487"}/gram
              </span>
            </span>
            <span>
              <span className="font-medium">Silver Rate:</span>{" "}
              <span className="text-gold-light">
                ₹{settings?.silver_rate?.toLocaleString() || "72"}/gram
              </span>
            </span>
          </div>
          <div className="hidden md:block">
            <span>Call Us: {settings?.phone || "+91 98765 43210"}</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-maroon via-gold to-maroon bg-clip-text text-transparent">
            {settings?.company_name || "SRV JEWELLERS"}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="space-x-6 font-medium">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <div className="relative inline-block group">
                <Link to="/categories" className="flex items-center hover:text-gold transition-colors">
                  Categories <ChevronDown size={16} className="ml-1" />
                </Link>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 hidden group-hover:block">
                  <Link to="/categories/necklaces" className="block px-4 py-2 hover:bg-gold-light transition-colors">Necklaces</Link>
                  <Link to="/categories/earrings" className="block px-4 py-2 hover:bg-gold-light transition-colors">Earrings</Link>
                  <Link to="/categories/bracelets" className="block px-4 py-2 hover:bg-gold-light transition-colors">Bracelets</Link>
                  <Link to="/categories/rings" className="block px-4 py-2 hover:bg-gold-light transition-colors">Rings</Link>
                </div>
              </div>
              <Link to="/collections" className="hover:text-gold transition-colors">Collections</Link>
              <Link to="/about" className="hover:text-gold transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 pl-10 border rounded-full w-40 lg:w-64 focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <button type="submit" className="sr-only">Search</button>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              <Link to="/wishlist" className="hover:text-gold">
                <Heart size={24} />
              </Link>
              <Link to="/cart" className="relative">
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-maroon text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {/* User profile icon and menu */}
              {user ? (
                <div className="relative group hidden md:block">
                  <button className="hover:text-gold">
                    <User size={24} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 hidden group-hover:block">
                    <Link to="/account" className="block px-4 py-2 hover:bg-gold-light transition-colors">My Account</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gold-light transition-colors">My Orders</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 hover:bg-gold-light transition-colors">Admin Dashboard</Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 hover:bg-gold-light transition-colors text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hover:text-gold hidden md:block">
                  <User size={24} />
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-xl font-bold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X size={24} />
              </Button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <button type="submit" className="sr-only">Search</button>
              </div>
            </form>

            {/* Mobile Nav Links */}
            <div className="space-y-4 text-lg">
              <Link to="/" className="block hover:text-gold" onClick={toggleMenu}>
                Home
              </Link>
              <div className="block">
                <p className="font-medium mb-2">Categories</p>
                <div className="pl-4 space-y-2">
                  <Link to="/categories/necklaces" className="block hover:text-gold" onClick={toggleMenu}>
                    Necklaces
                  </Link>
                  <Link to="/categories/earrings" className="block hover:text-gold" onClick={toggleMenu}>
                    Earrings
                  </Link>
                  <Link to="/categories/bracelets" className="block hover:text-gold" onClick={toggleMenu}>
                    Bracelets
                  </Link>
                  <Link to="/categories/rings" className="block hover:text-gold" onClick={toggleMenu}>
                    Rings
                  </Link>
                </div>
              </div>
              <Link to="/collections" className="block hover:text-gold" onClick={toggleMenu}>
                Collections
              </Link>
              <Link to="/about" className="block hover:text-gold" onClick={toggleMenu}>
                About Us
              </Link>
              <Link to="/contact" className="block hover:text-gold" onClick={toggleMenu}>
                Contact
              </Link>
              <hr className="my-4" />
              
              {/* User menu items */}
              {user ? (
                <>
                  <Link to="/account" className="block hover:text-gold" onClick={toggleMenu}>
                    My Account
                  </Link>
                  <Link to="/orders" className="block hover:text-gold" onClick={toggleMenu}>
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="block hover:text-gold" onClick={toggleMenu}>
                    My Wishlist
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block hover:text-gold" onClick={toggleMenu}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left text-red-600 hover:text-red-800"
                  >
                    <LogOut size={18} className="inline mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block hover:text-gold" onClick={toggleMenu}>
                    Login / Register
                  </Link>
                  <Link to="/wishlist" className="block hover:text-gold" onClick={toggleMenu}>
                    My Wishlist
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
