
import React from "react";
import ProductCard, { Product } from "./ProductCard";
import { useToast } from "@/hooks/use-toast";

// Sample product data
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Royal Kundan Necklace Set",
    price: 125000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "Necklaces",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Diamond Jhumka Earrings",
    price: 78500,
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Earrings",
    isFeatured: true,
  },
  {
    id: 3,
    name: "Gold Kada Bracelet",
    price: 58900,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Bracelets",
    isFeatured: true,
  },
  {
    id: 4,
    name: "Emerald Solitaire Ring",
    price: 45000,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Rings",
    isNew: true,
    isFeatured: true,
  },
];

const FeaturedProducts = () => {
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
