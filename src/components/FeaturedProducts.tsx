
import React from "react";
import ProductCard from "./ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useFeaturedProductsQuery } from "@/hooks/useProductsQuery";
import { useCart } from "@/context/CartContext";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FeaturedProductsProps {
  displayCount?: number;
}

const FeaturedProducts = ({ displayCount = 4 }: FeaturedProductsProps) => {
  const { data: featuredProducts, isLoading } = useFeaturedProductsQuery();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image_url || product.image,
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
    <section className="py-16 sm:py-20 md:py-24 bg-[#FBF8F1]">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10 sm:mb-12">
          <div className="mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="text-[#8B4513] relative">
                Featured Products
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-[#F9A602]"></span>
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl text-sm sm:text-base">
              Explore our most popular and exclusive jewelry pieces, chosen for their exquisite
              craftsmanship and timeless designs.
            </p>
          </div>
          <Link to="/collections" className="hidden md:flex items-center text-[#8B4513] hover:text-[#F9A602] transition-colors">
            <span className="mr-2 font-medium">View all</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-80">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
              {(featuredProducts || []).slice(0, displayCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: Number(product.id),
                    name: product.name,
                    price: product.price,
                    image: product.image_url || "",
                    category: product.category,
                    isNew: false,
                    isFeatured: true,
                  }}
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToWishlist={() => handleAddToWishlist(product)}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-12 md:hidden">
              <Button className="bg-[#8B4513] hover:bg-[#6B3612] text-white px-8 py-6 text-base" asChild>
                <Link to="/collections">Shop Collections</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
