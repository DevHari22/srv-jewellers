
import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image load error for:", product.name);
    e.currentTarget.src = "/placeholder.svg";
    setImageError(true);
  };

  // Use image from product.image_url or product.image (for backward compatibility)
  const imageUrl = product.image || "/placeholder.svg";

  return (
    <div className="product-card group relative shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden bg-white h-full flex flex-col">
      {/* Product badges */}
      <div className="absolute top-0 left-0 z-10 flex flex-col gap-2 p-2">
        {product.isNew && (
          <span className="bg-[#8B4513] text-white text-xs font-medium px-2 py-1 rounded">
            NEW
          </span>
        )}
        {product.isFeatured && (
          <span className="bg-[#D4AF37] text-white text-xs font-medium px-2 py-1 rounded">
            FEATURED
          </span>
        )}
      </div>
      
      {/* Product image with hover effect */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Quick actions overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 p-4">
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-white text-[#8B4513] hover:bg-[#D4AF37] hover:text-white rounded-full h-10 w-10 shadow-md" 
              onClick={(e) => {
                e.preventDefault();
                onAddToCart && onAddToCart(product);
              }}
            >
              <ShoppingCart size={16} />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-white text-[#8B4513] hover:bg-[#D4AF37] hover:text-white rounded-full h-10 w-10 shadow-md" 
              onClick={(e) => {
                e.preventDefault();
                onAddToWishlist && onAddToWishlist(product);
              }}
            >
              <Heart size={16} />
            </Button>
          </div>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/product/${product.id}`} className="flex-grow">
          <h3 className="font-medium text-base md:text-lg mb-1 hover:text-[#D4AF37] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2 capitalize">{product.category}</p>
        <div className="inline-block font-semibold text-[#8B4513] text-sm md:text-base bg-[#F9F5E7] px-3 py-1 rounded">
          ₹{product.price.toLocaleString('en-IN')}
        </div>
      </div>
      
      {/* Add to cart button */}
      <div className="px-4 pb-4 mt-auto">
        <Button 
          className="w-full bg-[#8B4513] hover:bg-[#6B3612] text-white text-sm py-2"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
