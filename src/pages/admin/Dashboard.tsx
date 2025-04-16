
import React from "react";
import AdminLayout from "@/components/admin/Layout";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, change, color }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className={`text-sm ${color} flex items-center mt-2`}>
          <TrendingUp size={16} className="mr-1" />
          {change}% from last month
        </p>
      </div>
      <div className={`p-3 rounded-full ${color.includes("green") ? "bg-green-100" : color.includes("blue") ? "bg-blue-100" : color.includes("orange") ? "bg-orange-100" : "bg-purple-100"}`}>
        <Icon size={24} className={color.replace("text", "text")} />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,28,435",
      icon: DollarSign,
      change: "12.5",
      color: "text-green-500",
    },
    {
      title: "Total Orders",
      value: "243",
      icon: ShoppingBag,
      change: "8.2",
      color: "text-blue-500",
    },
    {
      title: "New Users",
      value: "45",
      icon: Users,
      change: "5.7",
      color: "text-orange-500",
    },
    {
      title: "Avg. Order Value",
      value: "₹5,285",
      icon: TrendingUp,
      change: "3.2",
      color: "text-purple-500",
    },
  ];

  const recentOrders = [
    { id: "ORD-4253", customer: "Rahul Sharma", date: "Apr 15, 2025", amount: "₹8,450", status: "Delivered" },
    { id: "ORD-4252", customer: "Priya Patel", date: "Apr 14, 2025", amount: "₹12,700", status: "Processing" },
    { id: "ORD-4251", customer: "Amit Kumar", date: "Apr 14, 2025", amount: "₹5,320", status: "Pending" },
    { id: "ORD-4250", customer: "Neha Singh", date: "Apr 13, 2025", amount: "₹9,875", status: "Delivered" },
    { id: "ORD-4249", customer: "Vikram Reddy", date: "Apr 12, 2025", amount: "₹4,250", status: "Delivered" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                        order.status === "Processing" ? "bg-blue-100 text-blue-800" : 
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-full">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                <div className="flex-1">
                  <h3 className="font-medium">Gold Pendant Necklace</h3>
                  <p className="text-sm text-gray-500">SKU: JWL-{1000 + item}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{(Math.floor(Math.random() * 10) + 5) * 1000}</p>
                  <p className="text-sm text-gray-500">{Math.floor(Math.random() * 10) + 5} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
