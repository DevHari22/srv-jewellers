
import React, { useState } from "react";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <AdminSidebar />
      </div>
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <AdminHeader />
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleSidebar} 
              className="mr-4"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
