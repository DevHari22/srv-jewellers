
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Search, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserOrders = () => {
  // Sample orders data
  const orders = [
    {
      id: "ORD-4253",
      date: "Apr 15, 2025",
      status: "Delivered",
      items: 2,
      total: 12450,
      tracking: "IND8765432109",
    },
    {
      id: "ORD-4210",
      date: "Mar 28, 2025",
      status: "Processing",
      items: 1,
      total: 54999,
      tracking: "IND7654321098",
    },
    {
      id: "ORD-4185",
      date: "Mar 12, 2025",
      status: "Delivered",
      items: 3,
      total: 18750,
      tracking: "IND6543210987",
    },
    {
      id: "ORD-4142",
      date: "Feb 18, 2025",
      status: "Cancelled",
      items: 1,
      total: 8999,
      tracking: null,
    }
  ];
  
  // Status color mappings
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-gold">Home</Link>
              <ChevronRight size={14} className="mx-2" />
              <Link to="/account" className="hover:text-gold">My Account</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">Orders</span>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4 md:mb-0">My Orders</h1>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {orders.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Items</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Total</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{order.items}</td>
                        <td className="py-3 px-4 font-medium">₹{order.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm" className="border-gray-300" asChild>
                            <Link to={`/orders/${order.id}`}>
                              <Eye size={16} className="mr-1" />
                              View
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white shadow-md rounded-lg">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Package size={32} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to create your first order.
              </p>
              <Link to="/categories">
                <Button className="bg-maroon hover:bg-maroon-dark text-white">
                  Shop Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserOrders;
