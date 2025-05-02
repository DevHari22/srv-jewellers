
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Filter, SlidersHorizontal, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProductsByCategoryQuery } from "@/hooks/useProductsQuery";
import { useCart } from "@/context/CartContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  const { data: products, isLoading } = useProductsByCategoryQuery(category || '');
  const [sortOrder, setSortOrder] = useState("featured");
  const { toast } = useToast();
  const { addToCart } = useCart();
  const isMobile = useIsMobile();
  
  // Sort products based on selected sort order
  const sortedProducts = [...(products || [])].sort((a, b) => {
    switch (sortOrder) {
      case "price-low-high":
        return (a.price || 0) - (b.price || 0);
      case "price-high-low":
        return (b.price || 0) - (a.price || 0);
      case "newest":
        const aCreatedAt = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bCreatedAt = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bCreatedAt - aCreatedAt;
      default: // featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });
  
  // Format category name for display
  const formatCategoryName = (cat: string | undefined) => {
    if (!cat) return "All Jewelry";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };
  
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image_url,
      weight: product.weight
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  const handleAddToWishlist = (product: any) => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-2 sm:py-3">
          <div className="container px-4 sm:px-6">
            <div className="flex items-center text-xs sm:text-sm text-gray-500">
              <Link to="/" className="hover:text-gold">Home</Link>
              <ChevronRight size={12} className="mx-1 sm:mx-2" />
              <Link to="/categories" className="hover:text-gold">Categories</Link>
              <ChevronRight size={12} className="mx-1 sm:mx-2" />
              <span className="text-gray-700">{formatCategoryName(category)}</span>
            </div>
          </div>
        </div>

        <div className="container py-6 sm:py-8 md:py-12 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4 md:mb-0">
              {formatCategoryName(category)}
            </h1>
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <div className="relative flex-1 sm:flex-none">
                <select 
                  className="appearance-none w-full sm:w-auto pl-8 sm:pl-10 pr-8 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gold bg-white"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="featured">Sort by featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest first</option>
                </select>
                <SlidersHorizontal size={16} className="absolute left-2 sm:left-3 top-2.5 text-gray-400" />
              </div>
              
              <Button variant="outline" className="border-gray-300 flex items-center justify-center" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Link to={`/product/${product.id}`}>
                    <div className="h-40 sm:h-48 md:h-56 overflow-hidden">
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="p-3 sm:p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 hover:text-gold transition-colors line-clamp-2">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-maroon mt-1 sm:mt-2">₹{product.price.toLocaleString()}</p>
                    <div className="mt-3 sm:mt-4 flex space-x-2">
                      <Button 
                        className="flex-1 bg-maroon hover:bg-maroon-dark text-white text-xs sm:text-sm py-1 sm:py-2"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag size={14} className="mr-1 sm:mr-2" />
                        <span className="whitespace-nowrap">Add to Cart</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="border-gray-300 h-7 w-7 sm:h-9 sm:w-9"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart size={14} className="sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                We couldn't find any products in this category. Please check back later or browse other categories.
              </p>
              <Link to="/categories">
                <Button className="bg-maroon hover:bg-maroon-dark text-white text-sm sm:text-base">
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
