
import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner = ({ size = 24, className = "" }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader size={size} className={`animate-spin text-maroon ${className}`} />
    </div>
  );
};

export default LoadingSpinner;
