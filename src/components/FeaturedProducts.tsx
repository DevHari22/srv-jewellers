
import React from "react";
import ProductCard from "./ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useFeaturedProductsQuery } from "@/hooks/useProductsQuery";
import { useCart } from "@/context/CartContext";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
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
    <section className="py-16 bg-gray-50 indian-pattern">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            <span className="text-gold-gradient">Featured Products</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular and exclusive jewelry pieces, chosen for their exquisite
            craftsmanship and timeless designs.
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(featuredProducts || []).slice(0, 4).map((product) => (
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
            
            <div className="flex justify-center mt-12">
              <Button className="bg-maroon hover:bg-maroon/90 text-white px-8 py-6 text-lg" asChild>
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
