
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, CreditCard, MapPin, Truck, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

interface PaymentMethod {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentMethod>({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
  });

  // Fix the subtotal calculation to avoid type error
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    return total + itemPrice * item.quantity;
  }, 0);
  
  const shippingCost = shippingMethod === "express" ? 500 : 250;
  const total = subtotal + shippingCost;
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };
  
  const handlePlaceOrder = async () => {
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to place an order",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }
      
      // Create order in database
      // Fix: Convert shippingAddress object to JSON string for database storage
      const shippingAddressString = JSON.stringify(shippingAddress);
      
      const { data, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: total,
          shipping_address: shippingAddressString,
          payment_method: paymentMethod,
          status: "pending",
          items: cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        })
        .select();
      
      if (error) throw error;
      
      // Clear cart and show success
      clearCart();
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed.",
      });
      
      // Navigate to order confirmation
      navigate(`/order-confirmation/${data[0].id}`);
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "There was a problem placing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-gold">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/cart" className="hover:text-gold">Cart</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-800">Checkout</span>
        </div>
      </div>
      
      {/* Checkout Steps */}
      <div className="flex justify-between mb-8 border-b pb-4">
        <div className={`flex flex-col items-center ${step >= 1 ? 'text-maroon' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 1 ? 'bg-maroon text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="text-sm">Shipping</span>
        </div>
        <div className={`flex flex-col items-center ${step >= 2 ? 'text-maroon' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 2 ? 'bg-maroon text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="text-sm">Payment</span>
        </div>
        <div className={`flex flex-col items-center ${step >= 3 ? 'text-maroon' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 3 ? 'bg-maroon text-white' : 'bg-gray-200'}`}>
            3
          </div>
          <span className="text-sm">Review</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin size={20} className="mr-2 text-maroon" />
                Shipping Information
              </h2>
              
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    required
                    value={shippingAddress.addressLine1}
                    onChange={(e) => setShippingAddress({...shippingAddress, addressLine1: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    value={shippingAddress.addressLine2}
                    onChange={(e) => setShippingAddress({...shippingAddress, addressLine2: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      required
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Truck size={18} className="mr-2 text-maroon" />
                    Shipping Method
                  </h3>
                  
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="standard" id="standard" />
                      <label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-gray-500">Delivery in 5-7 business days</div>
                      </label>
                      <div className="font-medium">₹250</div>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="express" id="express" />
                      <label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-gray-500">Delivery in 2-3 business days</div>
                      </label>
                      <div className="font-medium">₹500</div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="bg-maroon hover:bg-maroon-dark text-white">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard size={20} className="mr-2 text-maroon" />
                Payment Method
              </h2>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Secure payment with credit or debit card</div>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="upi" id="upi" />
                    <label htmlFor="upi" className="flex-1 cursor-pointer">
                      <div className="font-medium">UPI</div>
                      <div className="text-sm text-gray-500">Pay using UPI apps like Google Pay, PhonePe, etc.</div>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="cod" id="cod" />
                    <label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">Pay when you receive your order</div>
                    </label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        required
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        required
                        value={paymentDetails.nameOnCard}
                        onChange={(e) => setPaymentDetails({...paymentDetails, nameOnCard: e.target.value})}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          required
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          required
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 flex space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="bg-maroon hover:bg-maroon-dark text-white">
                    Continue to Review
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 3: Review */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle size={20} className="mr-2 text-maroon" />
                Review Your Order
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="text-sm">
                    <p className="font-medium">{shippingAddress.fullName}</p>
                    <p>{shippingAddress.addressLine1}</p>
                    {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                    <p>Phone: {shippingAddress.phone}</p>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-maroon p-0 h-auto mt-1"
                    onClick={() => setStep(1)}
                  >
                    Edit
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Shipping Method</h3>
                  <p className="text-sm">
                    {shippingMethod === "standard" ? "Standard Shipping (5-7 business days)" : "Express Shipping (2-3 business days)"}
                  </p>
                  <Button 
                    variant="link" 
                    className="text-maroon p-0 h-auto mt-1"
                    onClick={() => setStep(1)}
                  >
                    Edit
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-sm">
                    {paymentMethod === "card" && "Credit/Debit Card"}
                    {paymentMethod === "upi" && "UPI"}
                    {paymentMethod === "cod" && "Cash on Delivery"}
                  </p>
                  <Button 
                    variant="link" 
                    className="text-maroon p-0 h-auto mt-1"
                    onClick={() => setStep(2)}
                  >
                    Edit
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="font-medium">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-maroon hover:bg-maroon-dark text-white"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>₹{shippingCost.toLocaleString()}</span>
              </div>
              
              <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Need Help?</h3>
            <div className="space-y-2 text-sm">
              <p>
                <Link to="/contact" className="text-maroon hover:underline">Contact Customer Support</Link>
              </p>
              <p>
                <Link to="/shipping-policy" className="text-maroon hover:underline">Shipping Policy</Link>
              </p>
              <p>
                <Link to="/return-policy" className="text-maroon hover:underline">Return Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
