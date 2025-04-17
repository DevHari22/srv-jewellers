
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CartItem } from "@/context/CartContext";

export type Order = {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  created_at: string;
  items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
  product?: {
    name: string;
    image_url: string;
  };
};

export type OrderInput = {
  shipping_address: string;
  items: CartItem[];
  total_amount: number;
};

// Function to create a new order
export const createOrder = async (orderData: OrderInput): Promise<Order | null> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('You need to be logged in to place an order');
      return null;
    }
    
    // First, create the order with user_id
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        shipping_address: orderData.shipping_address,
        total_amount: orderData.total_amount,
        user_id: user.id
      })
      .select()
      .single();
    
    if (orderError) {
      console.error('Error creating order:', orderError);
      toast.error('Failed to create order');
      return null;
    }
    
    // Then, create order items for each product
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_time: item.price,
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      toast.error('Failed to create order items');
      
      // Clean up the order if we failed to create items
      await supabase.from('orders').delete().eq('id', order.id);
      return null;
    }
    
    toast.success('Order placed successfully!');
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    toast.error('Failed to place order');
    return null;
  }
};

// Function to fetch user orders
export const fetchUserOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    toast.error('Failed to load orders');
    return [];
  }
};

// Function to fetch a single order with items
export const fetchOrderById = async (id: string): Promise<Order | null> => {
  try {
    // Get the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (orderError) {
      console.error('Error fetching order:', orderError);
      toast.error('Failed to load order details');
      return null;
    }
    
    // Get the order items
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        *,
        product:product_id (
          name,
          image_url
        )
      `)
      .eq('order_id', id);
    
    if (itemsError) {
      console.error('Error fetching order items:', itemsError);
      toast.error('Failed to load order items');
      return order;
    }
    
    return { ...order, items: items || [] };
  } catch (error) {
    console.error('Error fetching order:', error);
    toast.error('Failed to load order details');
    return null;
  }
};

// Admin function to fetch all orders
export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profile:user_id (
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all orders:', error);
      toast.error('Failed to load orders');
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all orders:', error);
    toast.error('Failed to load orders');
    return [];
  }
};

// Admin function to update order status
export const updateOrderStatus = async (id: string, status: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
      return false;
    }
    
    toast.success(`Order status updated to ${status}`);
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    toast.error('Failed to update order status');
    return false;
  }
};
