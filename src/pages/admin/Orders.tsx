
import React, { useState } from "react";
import AdminLayout from "@/components/admin/Layout";
import { Search, Filter, Eye, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sample orders data
  const orders = [
    { id: "ORD-4253", customer: "Rahul Sharma", date: "Apr 15, 2025", items: 2, amount: 12450, status: "Delivered" },
    { id: "ORD-4252", customer: "Priya Patel", date: "Apr 14, 2025", items: 1, amount: 54999, status: "Processing" },
    { id: "ORD-4251", customer: "Amit Kumar", date: "Apr 14, 2025", items: 3, amount: 22870, status: "Pending" },
    { id: "ORD-4250", customer: "Neha Singh", date: "Apr 13, 2025", items: 2, amount: 18500, status: "Shipped" },
    { id: "ORD-4249", customer: "Vikram Reddy", date: "Apr 12, 2025", items: 1, amount: 34760, status: "Delivered" },
    { id: "ORD-4248", customer: "Meera Joshi", date: "Apr 12, 2025", items: 4, amount: 47250, status: "Processing" },
    { id: "ORD-4247", customer: "Ananya Gupta", date: "Apr 11, 2025", items: 1, amount: 76500, status: "Cancelled" },
    { id: "ORD-4246", customer: "Rohit Malhotra", date: "Apr 10, 2025", items: 2, amount: 28900, status: "Delivered" },
  ];
  
  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && order.status.toLowerCase() === statusFilter.toLowerCase();
  });
  
  // Status color mappings
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout title="Orders">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold bg-white"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <Button className="bg-gold hover:bg-gold-dark text-white">
            <Download size={18} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Items</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.items}</td>
                  <td className="py-3 px-4 font-medium">₹{order.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Eye size={18} className="text-blue-500" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Printer size={18} className="text-green-500" />
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
              Showing {filteredOrders.length} of {orders.length} orders
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

export default AdminOrders;
