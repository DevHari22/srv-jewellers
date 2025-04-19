
import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ size = 24, className = "", fullScreen = false }: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
        <Loader size={size} className={`animate-spin text-maroon ${className}`} />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader size={size} className={`animate-spin text-maroon ${className}`} />
    </div>
  );
};

export default LoadingSpinner;
