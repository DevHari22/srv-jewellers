import { supabase } from "../integrations/supabase/client";

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  created_at: string;
  status: string;
  shipping_address: string;
  items?: OrderItem[]; // Adding items as optional property
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
  product?: {
    name: string;
    image_url?: string;
  };
}

export const fetchUserOrders = async (): Promise<Order[]> => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return [];

  const userId = session.session.user.id;

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data || [];
};

export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const userId = session.session.user.id;

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data;
};

export const fetchOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  if (error) {
    console.error('Error fetching order items:', error);
    return [];
  }

  return data || [];
};

export const createOrder = async (
  shippingAddress: string,
  cartItems: any[],
  totalAmount: number
): Promise<string | null> => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const userId = session.session.user.id;

  // Insert the order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      shipping_address: shippingAddress,
      total_amount: totalAmount,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError || !orderData) {
    console.error('Error creating order:', orderError);
    return null;
  }

  const orderId = orderData.id;

  // Insert order items
  const orderItems = cartItems.map(item => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    price_at_time: item.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    return null;
  }

  return orderId;
};

export const cancelOrder = async (orderId: string): Promise<boolean> => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) throw new Error('User not authenticated');

  const userId = session.session.user.id;

  // First check if the order belongs to the user
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('user_id', userId)
    .single();

  if (orderError || !orderData) {
    throw new Error('Order not found or does not belong to user');
  }

  // Check if the order status allows cancellation
  if (!['pending', 'processing'].includes(orderData.status.toLowerCase())) {
    throw new Error(`Cannot cancel order in ${orderData.status} status`);
  }

  // Update order status to cancelled
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId);

  if (updateError) {
    console.error('Error cancelling order:', updateError);
    throw new Error('Failed to cancel order');
  }

  return true;
};

// Add the missing functions for admin order management

export const fetchAllOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }

  return data || [];
};

export const updateOrderStatus = async (orderId: string, newStatus: string): Promise<boolean> => {
  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    console.error('Error updating order status:', error);
    return false;
  }

  return true;
};

// Function to fetch order with its items
export const fetchOrderWithItems = async (orderId: string): Promise<Order | null> => {
  // First, get the order
  const order = await fetchOrderById(orderId);
  if (!order) return null;

  // Then, get the order items
  const items = await fetchOrderItems(orderId);
  
  // For each item, fetch the product details
  const itemsWithProducts = await Promise.all(
    items.map(async (item) => {
      const { data: product } = await supabase
        .from('products')
        .select('name, image_url')
        .eq('id', item.product_id)
        .single();
      
      return {
        ...item,
        product: product || { name: 'Unknown Product' }
      };
    })
  );

  // Return the order with items
  return {
    ...order,
    items: itemsWithProducts
  };
};
