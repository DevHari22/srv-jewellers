
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchProductById, Product } from "@/services/productService";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      if (id) {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
      }
      setLoading(false);
    };
    
    loadProduct();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image_url,
      weight: product.weight
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  const handleAddToWishlist = () => {
    if (!product) return;
    
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
      duration: 3000,
    });
  };
  
  // Create dummy image array if there's only one image
  const productImages = product?.image_url ? 
    [product.image_url, ...Array(3).fill(product.image_url)] : 
    [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 size={48} className="animate-spin text-maroon mb-4" />
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/categories">
              <Button className="bg-maroon hover:bg-maroon-dark text-white">
                Browse Our Collection
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <Link to="/categories" className="hover:text-gold">Jewelry</Link>
              <ChevronRight size={14} className="mx-2" />
              <Link to={`/categories/${product.category}`} className="hover:text-gold">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
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
                    src={productImages[selectedImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
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
                          className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      4.0 (24 reviews)
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-3xl font-bold text-maroon">₹{product.price.toLocaleString()}</p>
                  {product.stock > 0 ? (
                    <p className="text-green-600 text-sm mt-1">In Stock ({product.stock} available)</p>
                  ) : (
                    <p className="text-red-600 text-sm mt-1">Out of Stock</p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    {product.weight && (
                      <div>
                        <h3 className="text-sm text-gray-500">Weight</h3>
                        <p className="font-medium">{product.weight}</p>
                      </div>
                    )}
                    {product.purity && (
                      <div>
                        <h3 className="text-sm text-gray-500">Purity</h3>
                        <p className="font-medium">{product.purity}</p>
                      </div>
                    )}
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
                      {product.stock > 0 ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex space-x-4">
                  <Button 
                    className="flex-1 bg-maroon hover:bg-maroon-dark text-white"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-maroon text-maroon hover:bg-maroon/10"
                    onClick={handleAddToWishlist}
                  >
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
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-gray-600">Handcrafted by skilled artisans</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-gray-600">BIS Hallmarked for guaranteed purity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-gray-600">Comes with authenticity certificate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-gray-600">Includes complimentary jewelry box</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-gray-600">Free shipping and insurance</span>
                    </li>
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
