
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/Layout";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

type DashboardStats = {
  totalRevenue: number;
  totalOrders: number;
  newUsers: number;
  avgOrderValue: number;
  revenueChange: number;
  ordersChange: number;
  usersChange: number;
  avgValueChange: number;
};

type Order = {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
};

type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  sold: number;
  image_url?: string;
};

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

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    newUsers: 0,
    avgOrderValue: 0,
    revenueChange: 0,
    ordersChange: 0,
    usersChange: 0,
    avgValueChange: 0
  });

  // Fetch dashboard statistics
  const fetchDashboardStats = async (): Promise<DashboardStats> => {
    // Fetch total orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total_amount, created_at');
    
    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
      throw ordersError;
    }

    // Fetch users
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, created_at');
    
    if (usersError) {
      console.error("Error fetching users:", usersError);
      throw usersError;
    }

    // Calculate stats
    const totalOrders = orders?.length || 0;
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Get new users in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUsers = users?.filter(user => 
      new Date(user.created_at) > thirtyDaysAgo
    ).length || 0;

    // Mock changes for now (in a real app, you would compare to previous period)
    return {
      totalRevenue,
      totalOrders,
      newUsers,
      avgOrderValue,
      revenueChange: 12.5, // Mock data - would calculate from previous period
      ordersChange: 8.2,
      usersChange: 5.7,
      avgValueChange: 3.2
    };
  };

  // Fetch recent orders
  const fetchRecentOrders = async (): Promise<Order[]> => {
    // First fetch orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        id,
        total_amount,
        status,
        created_at,
        user_id
      `)
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (ordersError) {
      console.error("Error fetching recent orders:", ordersError);
      throw ordersError;
    }
    
    if (!orders || orders.length === 0) {
      return [];
    }
    
    // Then fetch user details separately for each order
    const ordersWithCustomers = await Promise.all(
      orders.map(async (order) => {
        const { data: userProfile, error: userError } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', order.user_id)
          .single();
          
        if (userError) {
          console.error(`Error fetching user for order ${order.id}:`, userError);
          return {
            id: order.id,
            customer: 'Unknown',
            date: formatDate(order.created_at),
            amount: order.total_amount,
            status: order.status
          };
        }
        
        return {
          id: order.id,
          customer: userProfile?.name || userProfile?.email || 'Unknown',
          date: formatDate(order.created_at),
          amount: order.total_amount,
          status: order.status
        };
      })
    );
    
    return ordersWithCustomers;
  };

  // Fetch top selling products
  const fetchTopSellingProducts = async (): Promise<Product[]> => {
    const { data: orderItems, error } = await supabase
      .from('order_items')
      .select(`
        product_id,
        quantity,
        price_at_time,
        products(name, image_url)
      `)
      .limit(50);
    
    if (error) {
      console.error("Error fetching order items:", error);
      throw error;
    }
    
    // Group by product and calculate total sold
    const productMap = new Map<string, Product>();
    
    orderItems?.forEach(item => {
      const productId = item.product_id;
      if (!productId) return;
      
      if (!productMap.has(productId)) {
        productMap.set(productId, {
          id: productId,
          name: item.products?.name || 'Unknown Product',
          sku: `JWL-${1000 + Math.floor(Math.random() * 1000)}`,
          price: item.price_at_time || 0,
          sold: item.quantity || 0,
          image_url: item.products?.image_url
        });
      } else {
        const existing = productMap.get(productId)!;
        existing.sold += item.quantity || 0;
        productMap.set(productId, existing);
      }
    });
    
    // Sort by most sold
    return Array.from(productMap.values())
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  };
  
  // Use React Query to fetch data
  const { data: stats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const { data: recentOrders = [] } = useQuery({
    queryKey: ['recentOrders'],
    queryFn: fetchRecentOrders,
    staleTime: 60 * 1000, // 1 minute
  });
  
  const { data: topProducts = [] } = useQuery({
    queryKey: ['topProducts'],
    queryFn: fetchTopSellingProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Update dashboard stats when data changes
  useEffect(() => {
    if (stats) {
      setDashboardStats(stats);
    }
  }, [stats]);
  
  // Prepare stat cards data
  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(dashboardStats.totalRevenue),
      icon: DollarSign,
      change: dashboardStats.revenueChange.toFixed(1),
      color: "text-green-500",
    },
    {
      title: "Total Orders",
      value: dashboardStats.totalOrders.toString(),
      icon: ShoppingBag,
      change: dashboardStats.ordersChange.toFixed(1),
      color: "text-blue-500",
    },
    {
      title: "New Users",
      value: dashboardStats.newUsers.toString(),
      icon: Users,
      change: dashboardStats.usersChange.toFixed(1),
      color: "text-orange-500",
    },
    {
      title: "Avg. Order Value",
      value: formatCurrency(dashboardStats.avgOrderValue),
      icon: TrendingUp,
      change: dashboardStats.avgValueChange.toFixed(1),
      color: "text-purple-500",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
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
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4">{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{formatCurrency(order.amount)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === "delivered" ? "bg-green-100 text-green-800" : 
                          order.status === "processing" ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      No recent orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-full">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(product.price)}</p>
                    <p className="text-sm text-gray-500">{product.sold} sold</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-gray-500">
                No product data available
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
