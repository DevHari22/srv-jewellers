
import React, { useState, useEffect } from "react";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Close sidebar on mobile by default
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile overlay when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full transition-all duration-300 z-30
        ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full sm:translate-x-0 sm:w-0 md:w-16'}`}
      >
        <AdminSidebar />
      </div>
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-0 sm:ml-64' : 'ml-0 md:ml-16'}`}>
        <AdminHeader />
        <div className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleSidebar} 
              className="mr-3 sm:mr-4"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{title}</h1>
          </div>
          <div className="overflow-x-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
