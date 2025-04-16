
import React, { useState } from "react";
import AdminLayout from "@/components/admin/Layout";
import { Search, Filter, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  // Sample users data
  const users = [
    { id: 1, name: "Rahul Sharma", email: "rahul.sharma@example.com", role: "Customer", status: "Active", orders: 5, lastLogin: "Apr 15, 2025" },
    { id: 2, name: "Priya Patel", email: "priya.patel@example.com", role: "Customer", status: "Active", orders: 3, lastLogin: "Apr 14, 2025" },
    { id: 3, name: "Amit Kumar", email: "amit.kumar@example.com", role: "Customer", status: "Inactive", orders: 0, lastLogin: "Mar 20, 2025" },
    { id: 4, name: "Neha Singh", email: "neha.singh@example.com", role: "Customer", status: "Active", orders: 8, lastLogin: "Apr 12, 2025" },
    { id: 5, name: "Sunil Verma", email: "sunil.verma@example.com", role: "Admin", status: "Active", orders: 0, lastLogin: "Apr 16, 2025" },
    { id: 6, name: "Vikram Reddy", email: "vikram.reddy@example.com", role: "Customer", status: "Active", orders: 2, lastLogin: "Apr 10, 2025" },
    { id: 7, name: "Priya Sharma", email: "priya.sharma@example.com", role: "Admin", status: "Active", orders: 0, lastLogin: "Apr 16, 2025" },
    { id: 8, name: "Ananya Gupta", email: "ananya.gupta@example.com", role: "Customer", status: "Blocked", orders: 1, lastLogin: "Feb 28, 2025" },
  ];
  
  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (roleFilter === "all") return matchesSearch;
    return matchesSearch && user.role.toLowerCase() === roleFilter.toLowerCase();
  });
  
  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout title="Users">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative">
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold bg-white"
            >
              <option value="all">All Users</option>
              <option value="admin">Admins</option>
              <option value="customer">Customers</option>
            </select>
            <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <Button className="bg-gold hover:bg-gold-dark text-white">
            <Plus size={18} className="mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-500">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">#{user.id}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{user.orders}</td>
                  <td className="py-3 px-4">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Edit size={18} className="text-blue-500" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="py-3 px-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" className="border-gray-300" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 bg-gold/10">
                1
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                2
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
