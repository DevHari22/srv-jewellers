
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  
  // Sample products data
  const products = [
    {
      id: 1,
      name: "22K Gold Traditional Necklace",
      price: 72999,
      image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "necklaces"
    },
    {
      id: 2,
      name: "Diamond Stud Earrings",
      price: 25999,
      image: "https://images.unsplash.com/photo-1588444650733-d636f6927858?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "earrings"
    },
    {
      id: 3,
      name: "Gold Bangle Set",
      price: 54999,
      image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "bangles"
    },
    {
      id: 4,
      name: "Diamond Wedding Ring",
      price: 42999,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "rings"
    },
    {
      id: 5,
      name: "Emerald Pendant",
      price: 23999,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "pendants"
    },
    {
      id: 6,
      name: "Pearl Bracelet",
      price: 15999,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "bracelets"
    }
  ];
  
  // Filter products based on category
  const filteredProducts = category 
    ? products.filter(product => product.category === category.toLowerCase())
    : products;
  
  // Format category name for display
  const formatCategoryName = (cat: string | undefined) => {
    if (!cat) return "All Jewelry";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
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
              <Link to="/categories" className="hover:text-gold">Categories</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">{formatCategoryName(category)}</span>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4 md:mb-0">
              {formatCategoryName(category)}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="appearance-none pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold bg-white">
                  <option>Sort by featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest first</option>
                </select>
                <SlidersHorizontal size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <Button variant="outline" className="border-gray-300 flex items-center" size="sm">
                <Filter size={18} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Link to={`/product/${product.id}`}>
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h2 className="text-lg font-medium text-gray-900 hover:text-gold transition-colors">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-xl font-bold text-maroon mt-2">₹{product.price.toLocaleString()}</p>
                    <div className="mt-4 flex space-x-2">
                      <Button className="flex-1 bg-maroon hover:bg-maroon-dark text-white text-sm">
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon" className="border-gray-300">
                        <Link to={`/product/${product.id}`}>
                          <ChevronRight size={18} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any products in this category. Please check back later or browse other categories.
              </p>
              <Link to="/categories">
                <Button className="bg-maroon hover:bg-maroon-dark text-white">
                  Browse All Categories
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

export default ProductCategory;
