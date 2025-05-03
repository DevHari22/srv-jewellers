
import React, { useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;
    
    const container = containerRef.current;
    const image = imageRef.current;
    
    let isAnimating = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let requestId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isAnimating) return;
      
      const deltaX = (e.clientX - startX) / 15;
      const deltaY = (e.clientY - startY) / 15;
      
      currentX = deltaY;
      currentY = -deltaX;
      
      updateTransform();
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isAnimating || e.touches.length < 1) return;
      
      const deltaX = (e.touches[0].clientX - startX) / 15;
      const deltaY = (e.touches[0].clientY - startY) / 15;
      
      currentX = deltaY;
      currentY = -deltaX;
      
      updateTransform();
    };
    
    const updateTransform = () => {
      if (!imageRef.current) return;
      
      imageRef.current.style.transform = 
        `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      
      requestId = requestAnimationFrame(updateTransform);
    };
    
    const startAnimation = (clientX: number, clientY: number) => {
      if (!imageRef.current) return;
      
      startX = clientX;
      startY = clientY;
      isAnimating = true;
      
      imageRef.current.style.transition = 'none';
      requestId = requestAnimationFrame(updateTransform);
    };
    
    const stopAnimation = () => {
      if (!imageRef.current) return;
      
      isAnimating = false;
      cancelAnimationFrame(requestId);
      
      imageRef.current.style.transition = 'transform 0.5s ease-out';
      imageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    container.addEventListener('mousedown', (e) => startAnimation(e.clientX, e.clientY));
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', stopAnimation);
    container.addEventListener('mouseleave', stopAnimation);
    
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        startAnimation(e.touches[0].clientX, e.touches[0].clientY);
      }
    });
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', stopAnimation);
    
    return () => {
      container.removeEventListener('mousedown', (e) => startAnimation(e.clientX, e.clientY));
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', stopAnimation);
      container.removeEventListener('mouseleave', stopAnimation);
      
      container.removeEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          startAnimation(e.touches[0].clientX, e.touches[0].clientY);
        }
      });
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', stopAnimation);
      
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative select-none cursor-pointer ${className}`}
      aria-label="Interactive jewelry display - drag to rotate"
    >
      <div className="overflow-hidden rounded-lg relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-shimmer to-transparent opacity-50 animate-shimmer pointer-events-none"></div>
        <img 
          ref={imageRef} 
          src={imageSrc} 
          alt={title}
          className="w-full h-auto object-cover transform transition-transform duration-500 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
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
