
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, CreditCard, MapPin, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

// Define clear type for cart items to avoid type issues
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod" // cash on delivery by default
  });
  
  // Calculate totals - ensure proper typing for price
  const subtotal = cartItems.reduce(
    (total, item) => {
      // Safely handle item.price - ensure it's a number
      const price = typeof item.price === 'number' ? item.price : 0;
      return total + (price * item.quantity);
    },
    0
  );
  
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.03); // 3% tax
  const total = subtotal + shipping + tax;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive"
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please login to continue with checkout",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    setLoading(true);
    
    try {
      // Create shipping address string
      const shippingAddress = `${formData.name}, ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}, Phone: ${formData.phone}`;
      
      // Insert order into database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            shipping_address: shippingAddress,
            total_amount: total,
            status: 'pending'
          }
        ])
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Insert order items - ensure proper typing for price_at_time
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: typeof item.price === 'number' ? item.price : 0
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      // Clear cart and show success
      clearCart();
      setOrderId(orderData.id);
      setOrderSuccess(true);
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container py-16">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 mb-3">Order Confirmed!</h1>
                <p className="text-gray-600 mb-6">Your order #{orderId.substring(0, 8)} has been placed successfully.</p>
                
                <div className="flex justify-center space-x-4">
                  <Link to="/orders">
                    <Button variant="outline">View Orders</Button>
                  </Link>
                  <Link to="/">
                    <Button className="bg-maroon hover:bg-maroon-dark text-white">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {loading && <LoadingSpinner fullScreen />}
        
        <div className="bg-gray-50 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-gold">Home</Link>
              <ChevronRight size={14} className="mx-2" />
              <Link to="/cart" className="hover:text-gold">Cart</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">Checkout</span>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="font-medium text-lg flex items-center mb-4">
                  <MapPin size={18} className="mr-2 text-maroon" />
                  Shipping Information
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address*
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State*
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode*
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </form>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="font-medium text-lg flex items-center mb-4">
                  <Truck size={18} className="mr-2 text-maroon" />
                  Shipping Method
                </h2>
                
                <div className="border rounded-md p-3 flex items-center mb-4">
                  <input
                    type="radio"
                    id="standard"
                    name="shipping"
                    checked
                    readOnly
                    className="h-4 w-4 text-maroon focus:ring-maroon"
                  />
                  <label htmlFor="standard" className="ml-3 flex flex-1 justify-between">
                    <span className="font-medium">Standard Shipping</span>
                    <span className="font-medium text-gray-500">Free</span>
                  </label>
                </div>
                
                <p className="text-sm text-gray-500">Delivery within 5-7 business days</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-medium text-lg flex items-center mb-4">
                  <CreditCard size={18} className="mr-2 text-maroon" />
                  Payment Method
                </h2>
                
                <div className="border rounded-md p-3 flex items-center mb-2">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="h-4 w-4 text-maroon focus:ring-maroon"
                  />
                  <label htmlFor="cod" className="ml-3 font-medium">
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
                <h2 className="font-medium text-lg mb-4">Order Summary</h2>
                
                <div className="max-h-80 overflow-y-auto mb-4">
                  {cartItems.map(item => {
                    // Make sure price is a number before calling toLocaleString
                    const price = typeof item.price === 'number' ? item.price : 0;
                    
                    return (
                      <div key={item.id} className="flex py-3 border-b last:border-0">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            ₹{price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (3%)</span>
                    <span className="font-medium">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-bold text-xl text-maroon">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-maroon hover:bg-maroon-dark text-white"
                  disabled={loading || cartItems.length === 0}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    "Complete Order"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
