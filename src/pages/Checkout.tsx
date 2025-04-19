import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, subtotal } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to proceed to checkout.",
      });
      navigate("/login");
    }

    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add items to your cart to continue.",
      });
      navigate("/");
    }
  }, [user, cartItems, navigate, toast]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleAddressChange = (
    addressType: "shipping" | "billing",
    field: string,
    value: string
  ) => {
    if (addressType === "shipping") {
      setShippingAddress({ ...shippingAddress, [field]: value });
    } else {
      setBillingAddress({ ...billingAddress, [field]: value });
    }
  };

  const toggleSameAsShipping = () => {
    setSameAsShipping(!sameAsShipping);
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
    } else {
      setBillingAddress({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
      });
    }
  };

  const applyDiscount = () => {
    // Placeholder for discount logic
    setDiscount(subtotal * 0.1); // 10% discount
    toast({
      title: "Discount Applied",
      description: "A 10% discount has been applied to your order.",
    });
  };

  const placeOrder = () => {
    // Placeholder for order placement logic
    toast({
      title: "Order Placed",
      description: "Your order has been successfully placed!",
    });
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {step === 1 && (
            <ShippingInfo
              shippingAddress={shippingAddress}
              handleAddressChange={handleAddressChange}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <BillingInfo
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
              handleAddressChange={handleAddressChange}
              sameAsShipping={sameAsShipping}
              toggleSameAsShipping={toggleSameAsShipping}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {step === 3 && (
            <PaymentInfo
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {step === 4 && (
            <Confirmation
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
              paymentMethod={paymentMethod}
              applyDiscount={applyDiscount}
              placeOrder={placeOrder}
              prevStep={prevStep}
            />
          )}
        </div>
        <div className="lg:w-1/3">
          <CartSummary cartItems={cartItems} subtotal={subtotal} discount={discount} />
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({ shippingAddress, handleAddressChange, nextStep }) => {
  const isFormFilled = Object.values(shippingAddress).every(Boolean);

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Enter your shipping address</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="John Doe"
            value={shippingAddress.name}
            onChange={(e) =>
              handleAddressChange("shipping", "name", e.target.value)
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="123 Main St"
            value={shippingAddress.address}
            onChange={(e) =>
              handleAddressChange("shipping", "address", e.target.value)
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              placeholder="New York"
              value={shippingAddress.city}
              onChange={(e) =>
                handleAddressChange("shipping", "city", e.target.value)
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input
              type="text"
              id="state"
              placeholder="NY"
              value={shippingAddress.state}
              onChange={(e) =>
                handleAddressChange("shipping", "state", e.target.value)
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              type="text"
              id="zip"
              placeholder="10001"
              value={shippingAddress.zip}
              onChange={(e) =>
                handleAddressChange("shipping", "zip", e.target.value)
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={nextStep} disabled={!isFormFilled}>
          Next <ArrowRight className="ml-2" size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

const BillingInfo = ({
  shippingAddress,
  billingAddress,
  handleAddressChange,
  sameAsShipping,
  toggleSameAsShipping,
  prevStep,
  nextStep,
}) => {
  const isFormFilled = Object.values(billingAddress).every(Boolean);

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>Enter your billing address</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameAsShipping"
            checked={sameAsShipping}
            onCheckedChange={toggleSameAsShipping}
          />
          <Label htmlFor="sameAsShipping">Same as shipping address</Label>
        </div>
        {!sameAsShipping && (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="John Doe"
                value={billingAddress.name}
                onChange={(e) =>
                  handleAddressChange("billing", "name", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                placeholder="123 Main St"
                value={billingAddress.address}
                onChange={(e) =>
                  handleAddressChange("billing", "address", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  placeholder="New York"
                  value={billingAddress.city}
                  onChange={(e) =>
                    handleAddressChange("billing", "city", e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  type="text"
                  id="state"
                  placeholder="NY"
                  value={billingAddress.state}
                  onChange={(e) =>
                    handleAddressChange("billing", "state", e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  type="text"
                  id="zip"
                  placeholder="10001"
                  value={billingAddress.zip}
                  onChange={(e) =>
                    handleAddressChange("billing", "zip", e.target.value)
                  }
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2" size={16} /> Previous
        </Button>
        <Button onClick={nextStep} disabled={!sameAsShipping && !isFormFilled}>
          Next <ArrowRight className="ml-2" size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

const PaymentInfo = ({ paymentMethod, setPaymentMethod, prevStep, nextStep }) => {
  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>Choose your payment method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
            className="h-4 w-4"
            checked={paymentMethod === "creditCard"}
            onChange={() => setPaymentMethod("creditCard")}
          />
          <Label htmlFor="creditCard">Credit Card</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            className="h-4 w-4"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2" size={16} /> Previous
        </Button>
        <Button onClick={nextStep}>
          Next <ArrowRight className="ml-2" size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Confirmation = ({
  shippingAddress,
  billingAddress,
  paymentMethod,
  applyDiscount,
  placeOrder,
  prevStep,
}) => {
  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>Confirmation</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h4 className="text-sm font-medium">Shipping Address</h4>
          <p className="text-gray-600">
            {shippingAddress.name}
            <br />
            {shippingAddress.address}
            <br />
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Billing Address</h4>
          <p className="text-gray-600">
            {billingAddress.name}
            <br />
            {billingAddress.address}
            <br />
            {billingAddress.city}, {billingAddress.state} {billingAddress.zip}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Payment Method</h4>
          <p className="text-gray-600">{paymentMethod}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2" size={16} /> Previous
        </Button>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={applyDiscount}>
            Apply Discount
          </Button>
          <Button onClick={placeOrder}>Place Order</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const CartSummary = ({ cartItems, subtotal, discount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
      <div className="max-h-80 overflow-y-auto mb-4">
        {cartItems.map(item => {
          // Make sure price is a number before calling toLocaleString
          const safePrice = typeof item.price === 'number' ? item.price : 0;
          
          return (
            <div key={item.id} className="flex py-3 border-b last:border-0">
              <div className="h-16 w-16 rounded border overflow-hidden flex-shrink-0">
                <img 
                  src={item.image_url || '/placeholder.svg'} 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  ₹{safePrice.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary line items */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">-₹{discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes</span>
          <span className="font-medium">Calculated at next step</span>
        </div>
        <div className="border-t my-4"></div>
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold text-lg">₹{(subtotal - discount).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
