
import React from "react";
import { Bell, User, Search } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-md h-16 flex items-center px-6">
      <div className="flex-1">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={18} className="text-gray-600" />
          </div>
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
