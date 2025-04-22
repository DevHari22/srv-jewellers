
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, ShoppingCart, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  wishlistId: string;
}

const Wishlist = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchWishlistItems = async () => {
    if (!user) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data: wishlistData, error: wishlistError } = await supabase
        .from("wishlists")
        .select(
          `
            id,
            product_id,
            products:product_id (
              id,
              name,
              price,
              image_url,
              stock
            )
          `
        )
        .eq("user_id", user.id);

      if (wishlistError) throw wishlistError;

      // Ensure we only show items whose products are found
      const formattedItems: WishlistItem[] = (wishlistData || [])
        .filter((item: any) => item.products)
        .map((item: any) => ({
          id: item.products.id,
          name: item.products.name,
          price: Number(item.products.price),
          image: item.products.image_url || "",
          inStock: Number(item.products.stock) > 0,
          wishlistId: item.id,
        }));

      setWishlistItems(formattedItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to load your wishlist",
        variant: "destructive",
      });
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    if (!user) return;

    const itemToRemove = wishlistItems.find((item) => item.id === id);

    if (!itemToRemove) return;

    try {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", itemToRemove.wishlistId);

      if (error) throw error;

      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );

      toast({
        title: "Item Removed",
        description: "Item has been removed from your wishlist",
      });
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });

    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart`,
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
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">Wishlist</span>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            Your Wishlist
          </h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div>
            </div>
          ) : wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-6 border rounded-lg"
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="w-28 h-28 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </Link>

                  <div className="flex-1 text-center sm:text-left">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xl font-bold text-maroon mt-2">
                      ₹{item.price.toLocaleString()}
                    </p>
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
                      onClick={() => handleAddToCart(item)}
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
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Discover our collection and add your favorite pieces to your
                wishlist.
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
