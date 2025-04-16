
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, ShoppingCart, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  // Sample wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "22K Gold Traditional Necklace",
      price: 72999,
      image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      inStock: true
    },
    {
      id: 2,
      name: "Diamond Stud Earrings",
      price: 25999,
      image: "https://images.unsplash.com/photo-1588444650733-d636f6927858?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      inStock: true
    },
    {
      id: 3,
      name: "Gold Bangle Set",
      price: 54999,
      image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      inStock: false
    }
  ]);
  
  const removeItem = (id: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
  };

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
              <span className="text-gray-700">Wishlist</span>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Your Wishlist</h1>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {wishlistItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-6 border rounded-lg">
                  <Link to={`/product/${item.id}`} className="w-28 h-28 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </Link>

                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-gold">
                      {item.name}
                    </Link>
                    <p className="text-xl font-bold text-maroon mt-2">₹{item.price.toLocaleString()}</p>
                    <p className="text-sm mt-1">
                      {item.inStock ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end mt-4 sm:mt-0 space-y-3">
                    <Button 
                      className="bg-maroon hover:bg-maroon-dark text-white w-full sm:w-auto"
                      disabled={!item.inStock}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </Button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="flex items-center text-red-600 hover:text-red-800 font-medium"
                    >
                      <Trash2 size={18} className="mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart size={32} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Discover our collection and add your favorite pieces to your wishlist.
              </p>
              <Link to="/categories">
                <Button className="bg-maroon hover:bg-maroon-dark text-white">
                  Explore Collection
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
