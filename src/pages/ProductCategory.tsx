
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Filter, SlidersHorizontal, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Product, fetchProductsByCategory } from "@/services/productService";
import { useCart } from "@/context/CartContext";

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("featured");
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      if (category) {
        const fetchedProducts = await fetchProductsByCategory(category);
        setProducts(fetchedProducts);
      }
      setLoading(false);
    };
    
    loadProducts();
  }, [category]);
  
  // Sort products based on selected sort order
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOrder) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "newest":
        // Use timestamps or default to 0 if created_at doesn't exist
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
  
  const handleAddToCart = (product: Product) => {
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
  
  const handleAddToWishlist = (product: Product) => {
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
                <select 
                  className="appearance-none pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold bg-white"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="featured">Sort by featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest first</option>
                </select>
                <SlidersHorizontal size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <Button variant="outline" className="border-gray-300 flex items-center" size="sm">
                <Filter size={18} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Link to={`/product/${product.id}`}>
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={product.image_url} 
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
                      <Button 
                        className="flex-1 bg-maroon hover:bg-maroon-dark text-white text-sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag size={16} className="mr-2" />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="border-gray-300"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart size={18} />
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
