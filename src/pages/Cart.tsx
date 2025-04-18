
import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const CartItem = ({ item, updateQuantity, removeItem }: any) => {
  return (
    <div className="flex py-6 border-b">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between">
            <h3 className="text-base font-medium text-gray-900">
              <Link to={`/product/${item.id}`}>{item.name}</Link>
            </h3>
            <p className="ml-4 text-base font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.weight}</p>
        </div>
        <div className="flex-1 flex items-end justify-between">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 border-x">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.03); // 3% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-gold">Home</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">Shopping Cart</span>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="px-6">
                    {cartItems.map(item => (
                      <CartItem
                        key={item.id}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeItem={removeFromCart}
                      />
                    ))}
                  </div>

                  <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <Link to="/categories" className="text-maroon font-medium flex items-center">
                      <ChevronRight size={16} className="mr-1 rotate-180" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="px-6 py-4 bg-gray-50 border-b">
                    <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                  </div>
                  <div className="px-6 py-4 space-y-4">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium">₹{subtotal.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Shipping</p>
                      <p className="font-medium">Free</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Tax (3%)</p>
                      <p className="font-medium">₹{tax.toLocaleString()}</p>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <p className="font-medium text-gray-900">Total</p>
                      <p className="font-bold text-xl text-maroon">₹{total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <Link to="/checkout">
                      <Button className="w-full bg-maroon hover:bg-maroon-dark text-white">
                        <ShoppingBag size={18} className="mr-2" />
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Add items to your cart to see them here.
              </p>
              <Link to="/categories">
                <Button className="bg-maroon hover:bg-maroon-dark text-white">
                  Start Shopping
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

export default Cart;
