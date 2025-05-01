
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
    <div className="product-card group relative shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden bg-white">
      {/* Product badges */}
      {product.isNew && (
        <div className="absolute top-2 left-2 z-10 bg-gold text-white text-xs font-medium px-2 py-1 rounded">
          NEW
        </div>
      )}
      
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
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 p-4">
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-white text-maroon hover:bg-gold hover:text-white rounded-full" 
              onClick={(e) => {
                e.preventDefault();
                onAddToCart && onAddToCart(product);
              }}
            >
              <ShoppingCart size={18} />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-white text-maroon hover:bg-gold hover:text-white rounded-full" 
              onClick={(e) => {
                e.preventDefault();
                onAddToWishlist && onAddToWishlist(product);
              }}
            >
              <Heart size={18} />
            </Button>
          </div>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-lg mb-1 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <div className="price-tag inline-block font-semibold text-maroon">
          ₹{product.price.toLocaleString('en-IN')}
        </div>
      </div>
      
      {/* Add to cart button */}
      <div className="px-4 pb-4">
        <Button 
          className="w-full bg-maroon hover:bg-maroon/90 text-white"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
