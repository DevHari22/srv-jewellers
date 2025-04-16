
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, Heart, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // In a real app, this would be fetched from an API
  const product = {
    id,
    name: "22K Gold Traditional Necklace",
    description: "This exquisite 22K gold necklace features intricate traditional design with meticulous craftsmanship. The piece is adorned with delicate filigree work and small ruby accents, making it perfect for weddings and special occasions.",
    price: 78500,
    discountPrice: 72999,
    rating: 4.8,
    reviewCount: 24,
    weight: "25.4 grams",
    purity: "22K (91.6%)",
    images: [
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601821765780-754fa98637c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    inStock: true,
    features: [
      "Handcrafted by skilled artisans",
      "BIS Hallmarked for guaranteed purity",
      "Comes with authenticity certificate",
      "Includes complimentary jewelry box",
      "Free shipping and insurance",
    ],
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-gray-500">
              <a href="/" className="hover:text-gold">Home</a>
              <ChevronRight size={14} className="mx-2" />
              <a href="/categories" className="hover:text-gold">Jewelry</a>
              <ChevronRight size={14} className="mx-2" />
              <a href="/categories/necklaces" className="hover:text-gold">Necklaces</a>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product details */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product images */}
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`bg-gray-100 rounded-md overflow-hidden aspect-square ${
                        selectedImage === index ? "ring-2 ring-gold" : ""
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-gray-800">{product.name}</h1>
                  <div className="mt-2 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-500 line-through text-lg">₹{product.price.toLocaleString()}</p>
                  <p className="text-3xl font-bold text-maroon">₹{product.discountPrice.toLocaleString()}</p>
                  <p className="text-green-600 text-sm mt-1">
                    Save ₹{(product.price - product.discountPrice).toLocaleString()} ({Math.round((product.price - product.discountPrice) / product.price * 100)}% off)
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm text-gray-500">Weight</h3>
                      <p className="font-medium">{product.weight}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Purity</h3>
                      <p className="font-medium">{product.purity}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={decrementQuantity}
                        className="px-3 py-1 text-xl"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x">{quantity}</span>
                      <button 
                        onClick={incrementQuantity}
                        className="px-3 py-1 text-xl"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {product.inStock ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex space-x-4">
                  <Button className="flex-1 bg-maroon hover:bg-maroon-dark text-white">
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="border-maroon text-maroon hover:bg-maroon/10">
                    <Heart size={18} className="mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline" size="icon" className="border-gray-300">
                    <Share2 size={18} />
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Features</h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
