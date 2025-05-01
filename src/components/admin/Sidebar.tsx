
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} h-screen bg-maroon-dark text-white fixed left-0 top-0 overflow-y-auto transition-all duration-300`}>
      <div className="p-6 relative">
        <button 
          onClick={toggleSidebar}
          className="absolute top-4 right-2 p-1 rounded-full bg-maroon-dark/50 hover:bg-maroon text-gold-light"
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        
        <h1 className={`${collapsed ? 'text-xl' : 'text-2xl'} font-bold text-gold mb-8 text-center transition-all duration-300`}>
          {collapsed ? 'SRV' : 'SRV JEWELLERS'}
        </h1>
        
        {!collapsed && (
          <h2 className="uppercase text-xs text-gray-400 tracking-wider mb-4">Admin Panel</h2>
        )}
        
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-maroon text-gold-light"
                      : "hover:bg-maroon hover:text-gold-light"
                  }`}
                >
                  <item.icon size={20} className={collapsed ? '' : 'mr-3'} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6">
        <button
          onClick={handleSignOut}
          className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 w-full text-left text-gray-300 hover:text-gold-light transition-colors`}
        >
          <LogOut size={20} className={collapsed ? '' : 'mr-3'} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
