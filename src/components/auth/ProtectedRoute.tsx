
import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

export const ProtectedRoute = ({ 
  children,
  adminOnly = false 
}: { 
  children: React.ReactNode;
  adminOnly?: boolean;
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
