import React, { useState } from "react";
import AdminLayout from "@/components/admin/Layout";
import { Save, Globe, DollarSign, Truck, Bell, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const AdminSettings = () => {
  // General Settings
  const [storeName, setStoreName] = useState("SRV JEWELLERS");
  const [storeEmail, setStoreEmail] = useState("info@srvjewellers.com");
  const [storePhone, setStorePhone] = useState("+91 98765 43210");
  const [storeAddress, setStoreAddress] = useState("128, Jewelry Market, Chandni Chowk, Delhi, India - 110006");
  
  // Currency Settings
  const [currency, setCurrency] = useState("INR");
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [goldRate, setGoldRate] = useState("5487");
  const [silverRate, setSilverRate] = useState("72");
  
  // Shipping Settings
  const [freeShippingMinimum, setFreeShippingMinimum] = useState("10000");
  const [standardShippingRate, setStandardShippingRate] = useState("250");
  const [expressShippingRate, setExpressShippingRate] = useState("500");
  
  // Admin Notification Settings
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [lowStockNotifications, setLowStockNotifications] = useState(true);
  const [reviewNotifications, setReviewNotifications] = useState(false);
  const [customerSignupNotifications, setCustomerSignupNotifications] = useState(false);

  const { toast } = useToast();
  
  const handleSaveSettings = async (section: string) => {
    try {
      if (section === 'Currency') {
        // Parse string inputs to numbers for the database
        const goldRateNum = parseFloat(goldRate);
        const silverRateNum = parseFloat(silverRate);
        
        // Update gold rates
        const { error: ratesError } = await supabase
          .from('gold_rates')
          .update({
            '24k_rate': goldRateNum,
            '22k_rate': goldRateNum * 0.916, // 22k is 91.6% pure
            '18k_rate': goldRateNum * 0.75,  // 18k is 75% pure
            'silver_rate': silverRateNum
          })
          .eq('id', '1'); // Converting to string to match expected type
        
        if (ratesError) throw ratesError;

        toast({
          title: "Success",
          description: "Gold and silver rates updated successfully",
        });
      } else if (section === 'General') {
        // Update store profile - handle phone explicitly as string
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            phone: storePhone, // Already a string from state
            address: storeAddress,
          })
          .eq('role', 'admin');

        if (profileError) throw profileError;

        toast({
          title: "Success",
          description: "Store information updated successfully",
        });
      } else {
        // Success messages for other sections
        toast({
          title: "Success",
          description: `${section} settings saved successfully`,
        });
      }
    } catch (error: any) {
      console.error(`Error saving ${section} settings:`, error);
      toast({
        title: "Error",
        description: `Failed to save ${section} settings: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <nav className="p-1">
              <a href="#general" className="flex items-center px-4 py-3 rounded-md text-maroon bg-gold-light font-medium">
                <Globe size={18} className="mr-3" />
                General
              </a>
              <a href="#currency" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 transition-colors">
                <DollarSign size={18} className="mr-3" />
                Currency & Rates
              </a>
              <a href="#shipping" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 transition-colors">
                <Truck size={18} className="mr-3" />
                Shipping
              </a>
              <a href="#notifications" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 transition-colors">
                <Bell size={18} className="mr-3" />
                Notifications
              </a>
              <a href="#security" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 transition-colors">
                <Shield size={18} className="mr-3" />
                Security
              </a>
            </nav>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          <div id="general" className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="text-lg font-medium flex items-center">
                <Globe size={18} className="mr-2" />
                General Settings
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <Input
                    id="storeName"
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="focus:ring-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Store Email
                  </label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    className="focus:ring-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Store Phone
                  </label>
                  <Input
                    id="storePhone"
                    type="tel"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    className="focus:ring-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Store Address
                  </label>
                  <textarea
                    id="storeAddress"
                    rows={3}
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={() => handleSaveSettings('General')}
                    className="bg-maroon hover:bg-maroon-dark text-white"
                  >
                    <Save size={18} className="mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Currency Settings */}
          <div id="currency" className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="text-lg font-medium flex items-center">
                <DollarSign size={18} className="mr-2" />
                Currency & Rates
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      <option value="INR">Indian Rupee (INR)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="currencySymbol" className="block text-sm font-medium text-gray-700 mb-1">
                      Currency Symbol
                    </label>
                    <Input
                      id="currencySymbol"
                      type="text"
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      className="focus:ring-gold"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="goldRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Gold Rate (per gram)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        {currencySymbol}
                      </span>
                      <Input
                        id="goldRate"
                        type="text"
                        value={goldRate}
                        onChange={(e) => setGoldRate(e.target.value)}
                        className="pl-8 focus:ring-gold"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="silverRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Silver Rate (per gram)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        {currencySymbol}
                      </span>
                      <Input
                        id="silverRate"
                        type="text"
                        value={silverRate}
                        onChange={(e) => setSilverRate(e.target.value)}
                        className="pl-8 focus:ring-gold"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={() => handleSaveSettings('Currency')}
                    className="bg-maroon hover:bg-maroon-dark text-white"
                  >
                    <Save size={18} className="mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Settings */}
          <div id="shipping" className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="text-lg font-medium flex items-center">
                <Truck size={18} className="mr-2" />
                Shipping Settings
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="freeShippingMinimum" className="block text-sm font-medium text-gray-700 mb-1">
                    Free Shipping Minimum Order Value
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      {currencySymbol}
                    </span>
                    <Input
                      id="freeShippingMinimum"
                      type="text"
                      value={freeShippingMinimum}
                      onChange={(e) => setFreeShippingMinimum(e.target.value)}
                      className="pl-8 focus:ring-gold"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="standardShippingRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Standard Shipping Rate
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        {currencySymbol}
                      </span>
                      <Input
                        id="standardShippingRate"
                        type="text"
                        value={standardShippingRate}
                        onChange={(e) => setStandardShippingRate(e.target.value)}
                        className="pl-8 focus:ring-gold"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="expressShippingRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Express Shipping Rate
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        {currencySymbol}
                      </span>
                      <Input
                        id="expressShippingRate"
                        type="text"
                        value={expressShippingRate}
                        onChange={(e) => setExpressShippingRate(e.target.value)}
                        className="pl-8 focus:ring-gold"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={() => handleSaveSettings('Shipping')}
                    className="bg-maroon hover:bg-maroon-dark text-white"
                  >
                    <Save size={18} className="mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div id="notifications" className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="text-lg font-medium flex items-center">
                <Bell size={18} className="mr-2" />
                Admin Notifications
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="orderNotifications"
                    type="checkbox"
                    checked={orderNotifications}
                    onChange={(e) => setOrderNotifications(e.target.checked)}
                    className="h-4 w-4 text-maroon border-gray-300 rounded focus:ring-gold"
                  />
                  <label htmlFor="orderNotifications" className="ml-2 block text-sm text-gray-700">
                    Receive notifications for new orders
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="lowStockNotifications"
                    type="checkbox"
                    checked={lowStockNotifications}
                    onChange={(e) => setLowStockNotifications(e.target.checked)}
                    className="h-4 w-4 text-maroon border-gray-300 rounded focus:ring-gold"
                  />
                  <label htmlFor="lowStockNotifications" className="ml-2 block text-sm text-gray-700">
                    Receive notifications for low stock alerts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="reviewNotifications"
                    type="checkbox"
                    checked={reviewNotifications}
                    onChange={(e) => setReviewNotifications(e.target.checked)}
                    className="h-4 w-4 text-maroon border-gray-300 rounded focus:ring-gold"
                  />
                  <label htmlFor="reviewNotifications" className="ml-2 block text-sm text-gray-700">
                    Receive notifications for new product reviews
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="customerSignupNotifications"
                    type="checkbox"
                    checked={customerSignupNotifications}
                    onChange={(e) => setCustomerSignupNotifications(e.target.checked)}
                    className="h-4 w-4 text-maroon border-gray-300 rounded focus:ring-gold"
                  />
                  <label htmlFor="customerSignupNotifications" className="ml-2 block text-sm text-gray-700">
                    Receive notifications for new customer sign-ups
                  </label>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={() => handleSaveSettings('Notification')}
                    className="bg-maroon hover:bg-maroon-dark text-white"
                  >
                    <Save size={18} className="mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Settings */}
          <div id="security" className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="text-lg font-medium flex items-center">
                <Shield size={18} className="mr-2" />
                Security Settings
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Admin Password
                  </label>
                  <Input
                    id="current-password"
                    type="password"
                    className="focus:ring-gold"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Admin Password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    className="focus:ring-gold"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="focus:ring-gold"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={() => handleSaveSettings('Security')}
                    className="bg-maroon hover:bg-maroon-dark text-white"
                  >
                    <Lock size={18} className="mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
