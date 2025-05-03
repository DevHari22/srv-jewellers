import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/Layout";
import { Search, Filter, Eye, Download, CheckCircle, Clock, Truck, PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchAllOrders, 
  updateOrderStatus,
  fetchOrderWithItems,
  type Order 
} from "@/services/orderService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await fetchAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle status change
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const success = await updateOrderStatus(orderId, newStatus);
      if (success) {
        // Update local state to reflect the change
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        
        toast({
          title: "Status Updated",
          description: `Order status changed to ${newStatus}`,
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  // View order details
  const handleViewOrder = async (order: Order) => {
    try {
      setViewLoading(true);
      setOpenDialog(true);
      
      // Fetch the order with items
      const orderWithItems = await fetchOrderWithItems(order.id);
      
      if (orderWithItems) {
        setSelectedOrder(orderWithItems);
      } else {
        setSelectedOrder(order);
        toast({
          title: "Warning",
          description: "Could not load order items",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast({
        title: "Error",
        description: "Failed to load order details",
        variant: "destructive"
      });
      setSelectedOrder(order);
    } finally {
      setViewLoading(false);
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.shipping_address && order.shipping_address.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && order.status.toLowerCase() === statusFilter.toLowerCase();
  });

  // Status color mappings
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case "processing":
        return <Clock className="w-4 h-4 mr-1" />;
      case "shipped":
        return <Truck className="w-4 h-4 mr-1" />;
      case "cancelled":
        return <PackageX className="w-4 h-4 mr-1" />;
      default:
        return <Clock className="w-4 h-4 mr-1" />;
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Orders">
        <div className="h-96">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

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
                <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.id.substring(0, 8)}</td>
                    <td className="py-3 px-4">{order.shipping_address?.split(',')[0] || 'N/A'}</td>
                    <td className="py-3 px-4">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-medium">₹{order.total_amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Pending")}>
                              <Clock className="w-4 h-4 mr-2" />
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Processing")}>
                              <Clock className="w-4 h-4 mr-2" />
                              Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Shipped")}>
                              <Truck className="w-4 h-4 mr-2" />
                              Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Delivered")}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Cancelled")}>
                              <PackageX className="w-4 h-4 mr-2" />
                              Cancelled
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye size={18} className="text-blue-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          
          {viewLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                  <p>{selectedOrder.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                  <p>₹{selectedOrder.total_amount.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
                <p className="whitespace-pre-line">{selectedOrder.shipping_address}</p>
              </div>
              
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Items</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Product</th>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Quantity</th>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Price</th>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id} className="border-b last:border-0">
                            <td className="py-2 px-3">{item.product?.name || 'Unknown Product'}</td>
                            <td className="py-2 px-3">{item.quantity}</td>
                            <td className="py-2 px-3">₹{item.price_at_time.toLocaleString()}</td>
                            <td className="py-2 px-3">₹{(item.price_at_time * item.quantity).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">No items available</div>
              )}
              
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Close
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>Update Status</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem 
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "Pending");
                        setSelectedOrder({...selectedOrder, status: "Pending"});
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "Processing");
                        setSelectedOrder({...selectedOrder, status: "Processing"});
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "Shipped");
                        setSelectedOrder({...selectedOrder, status: "Shipped"});
                      }}
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "Delivered");
                        setSelectedOrder({...selectedOrder, status: "Delivered"});
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "Cancelled");
                        setSelectedOrder({...selectedOrder, status: "Cancelled"});
                      }}
                    >
                      <PackageX className="w-4 h-4 mr-2" />
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
