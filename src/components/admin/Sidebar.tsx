
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  
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

  return (
    <div className="w-64 h-screen bg-maroon-dark text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gold mb-8">SRV JEWELLERS</h1>
        <h2 className="uppercase text-xs text-gray-400 tracking-wider mb-4">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-maroon text-gold-light"
                      : "hover:bg-maroon hover:text-gold-light"
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6">
        <Link
          to="/logout"
          className="flex items-center px-4 py-3 text-gray-300 hover:text-gold-light transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
