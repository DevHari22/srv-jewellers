
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PromotionalBannerProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  textColor?: string;
  dismissable?: boolean;
  imageUrl?: string;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  title,
  description,
  buttonText = "Shop Now",
  buttonLink = "/collections",
  backgroundColor = "bg-rich-gold-gradient",
  textColor = "text-maroon-dark",
  dismissable = true,
  imageUrl,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className={`w-full ${backgroundColor} relative overflow-hidden`}>
      <div className="container mx-auto py-3 sm:py-4 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            {imageUrl && (
              <div className="hidden sm:block mr-4">
                <img src={imageUrl} alt="Promotion" className="h-12 w-12 object-cover rounded-full border-2 border-white" />
              </div>
            )}
            <div className="text-center sm:text-left">
              <h3 className={`text-sm sm:text-base font-bold font-serif ${textColor}`}>{title}</h3>
              {description && <p className={`text-xs sm:text-sm ${textColor} opacity-90`}>{description}</p>}
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              className="bg-white text-maroon-dark hover:bg-gray-100 text-xs sm:text-sm px-3 py-1 h-auto font-medium"
              asChild
            >
              <Link to={buttonLink}>{buttonText}</Link>
            </Button>
            
            {dismissable && (
              <button 
                className={`ml-3 p-1 rounded-full ${textColor} opacity-70 hover:opacity-100 transition-opacity`}
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer opacity-30 pointer-events-none"></div>
    </div>
  );
};

export default PromotionalBanner;
