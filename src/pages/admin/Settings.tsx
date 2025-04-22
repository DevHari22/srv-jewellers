import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/Layout";
import { Save, Globe, DollarSign, Truck, Bell, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { fetchSiteSettings, SiteSettings } from "@/services/settingsService";

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    id: '1',
    company_name: 'SRV JEWELLERS',
    email: 'info@srvjewellers.com',
    phone: '+91 98765 43210',
    address: '229 A, Bazzar Street, Namakkal, Tamil Nadu - 637001',
    gold_rate: 5487,
    silver_rate: 72
  });

  const { toast } = useToast();

  useEffect(() => {
    const loadSettings = async () => {
      const siteSettings = await fetchSiteSettings();
      if (siteSettings) {
        setSettings(siteSettings);
      }
    };
    loadSettings();
  }, []);
  
  const handleSaveSettings = async (section: string) => {
    try {
      if (section === 'General') {
        const { error } = await supabase
          .from('site_settings')
          .update({
            company_name: settings.company_name,
            address: settings.address,
            phone: settings.phone,
            email: settings.email
          })
          .eq('id', '1');

        if (error) throw error;

        toast({
          title: "Success",
          description: "Store information updated successfully",
        });
      } else if (section === 'Currency') {
        const { error } = await supabase
          .from('site_settings')
          .update({
            gold_rate: settings.gold_rate,
            silver_rate: settings.silver_rate
          })
          .eq('id', '1');

        if (error) throw error;

        toast({
          title: "Success",
          description: "Gold and silver rates updated successfully",
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
                    value={settings.company_name}
                    onChange={(e) => setSettings({...settings, company_name: e.target.value})}
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
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
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
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
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
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
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
                      value="INR"
                      disabled
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      <option value="INR">Indian Rupee (INR)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="currencySymbol" className="block text-sm font-medium text-gray-700 mb-1">
                      Currency Symbol
                    </label>
                    <Input
                      id="currencySymbol"
                      type="text"
                      value="₹"
                      disabled
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
                        ₹
                      </span>
                      <Input
                        id="goldRate"
                        type="text"
                        value={settings.gold_rate.toString()}
                        onChange={(e) => setSettings({...settings, gold_rate: parseFloat(e.target.value)})}
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
                        ₹
                      </span>
                      <Input
                        id="silverRate"
                        type="text"
                        value={settings.silver_rate.toString()}
                        onChange={(e) => setSettings({...settings, silver_rate: parseFloat(e.target.value)})}
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
                      ₹
                    </span>
                    <Input
                      id="freeShippingMinimum"
                      type="text"
                      value="10000"
                      disabled
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
                        ₹
                      </span>
                      <Input
                        id="standardShippingRate"
                        type="text"
                        value="250"
                        disabled
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
                        ₹
                      </span>
                      <Input
                        id="expressShippingRate"
                        type="text"
                        value="500"
                        disabled
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
                    checked={true}
                    disabled
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
                    checked={true}
                    disabled
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
                    checked={false}
                    disabled
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
                    checked={false}
                    disabled
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
