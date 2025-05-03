
import * as React from "react";

// Tailwind breakpoints for reference
const BREAKPOINTS = {
  sm: 640,   // Small screens
  md: 768,   // Medium screens
  lg: 1024,  // Large screens
  xl: 1280,  // Extra large screens
  '2xl': 1536 // 2XL screens
};

export function useIsMobile(breakpoint: keyof typeof BREAKPOINTS = 'sm') {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS[breakpoint]);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return !!isMobile;
}

export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isBelow, setIsBelow] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkBreakpoint = () => {
      setIsBelow(window.innerWidth < BREAKPOINTS[breakpoint]);
    };
    
    // Initial check
    checkBreakpoint();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkBreakpoint);
    
    // Clean up
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoint]);

  return !!isBelow;
}
