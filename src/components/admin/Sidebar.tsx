
import React, { useState, useEffect } from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  // Automatically collapse sidebar on medium screens
  useEffect(() => {
    const handleResize = () => {
      // Check if screen width is between mobile and larger screens (md breakpoint)
      const isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1024;
      if (isMediumScreen) {
        setCollapsed(true);
      } else if (!isMobile) {
        setCollapsed(false);
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);
  
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
    <div className={`${collapsed ? 'w-16 sm:w-16' : 'w-64'} h-screen bg-[#1E293B] text-white fixed left-0 top-0 overflow-y-auto transition-all duration-300`}>
      <div className="p-4 relative">
        <button 
          onClick={toggleSidebar}
          className="absolute top-2 right-1 p-1 rounded-full bg-[#2D3D50]/50 hover:bg-[#2D3D50] text-[#F9A602]"
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        
        <h1 className={`${collapsed ? 'text-xl text-center' : 'text-2xl'} font-bold text-[#F9A602] mb-6 text-center transition-all duration-300`}>
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
                  className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-2 rounded-md transition-colors
                    ${isActive(item.path)
                      ? "bg-[#2D3D50] text-[#F9A602]"
                      : "hover:bg-[#2D3D50] hover:text-[#F9A602]"}
                  `}
                >
                  <item.icon size={18} className={collapsed ? '' : 'mr-3'} />
                  {!collapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4">
        <button
          onClick={handleSignOut}
          className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-2 w-full text-left text-gray-400 hover:text-[#F9A602] transition-colors`}
          aria-label="Logout"
        >
          <LogOut size={18} className={collapsed ? '' : 'mr-3'} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
