
import React from "react";

interface JewelryRotatorProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const JewelryRotator: React.FC<JewelryRotatorProps> = ({ 
  imageSrc, 
  title, 
  subtitle,
  className = "" 
}) => {
  return (
    <div 
      className={`relative ${className}`}
      aria-label="Jewelry display"
    >
      <div className="overflow-hidden rounded-lg relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-shimmer to-transparent opacity-50 pointer-events-none"></div>
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-105"
        />
      </div>
      
      {(title || subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm p-3 text-white">
          {title && <h3 className="font-serif font-medium text-lg text-gold-shimmer">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-200">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default JewelryRotator;
