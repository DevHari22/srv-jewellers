import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // General Settings
  const [storeName, setStoreName] = useState("SRV Jewellers");
  const [storeEmail, setStoreEmail] = useState("contact@srvjewellers.com");
  const [phone, setPhone] = useState("9876543210");
  const [storeAddress, setStoreAddress] = useState("");
  
  // Gold Rates
  const [goldRate24k, setGoldRate24k] = useState(5487);
  const [goldRate22k, setGoldRate22k] = useState(5100);
  const [goldRate18k, setGoldRate18k] = useState(4200);
  const [goldRatesId, setGoldRatesId] = useState(1);
  
  // Email Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderConfirmation, setOrderConfirmation] = useState(true);
  const [shippingUpdates, setShippingUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Payment Settings
  const [razorpayEnabled, setRazorpayEnabled] = useState(true);
  const [razorpayKey, setRazorpayKey] = useState("");
  const [razorpaySecret, setRazorpaySecret] = useState("");
  const [codEnabled, setCodEnabled] = useState(true);
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch gold rates
        const { data: goldData, error: goldError } = await supabase
          .from('gold_rates')
          .select('*')
          .order('id', { ascending: true })
          .limit(1);
        
        if (goldError) throw goldError;
        
        if (goldData && goldData.length > 0) {
          setGoldRate24k(goldData[0]["24k_rate"]);
          setGoldRate22k(goldData[0]["22k_rate"]);
          setGoldRate18k(goldData[0]["18k_rate"]);
          setGoldRatesId(goldData[0].id);
        }
        
        // Fetch store profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', '1')
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }
        
        if (profileData) {
          setStoreName(profileData.name || "SRV Jewellers");
          setStoreEmail(profileData.email || "contact@srvjewellers.com");
          setPhone(profileData.phone || "9876543210");
          setStoreAddress(profileData.address || "");
        }
        
        // Fetch payment settings
        // This would be implemented when we have a settings table
        
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error",
          description: "Failed to load settings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, [toast]);
  
  const handleSave = async (section: string) => {
    setIsSaving(true);
    try {
      if (section === 'Gold Rates') {
        // Update gold rates
        const { error } = await supabase
          .from('gold_rates')
          .update({
            "24k_rate": goldRate24k,
            "22k_rate": goldRate22k,
            "18k_rate": goldRate18k,
          })
          .eq('id', goldRatesId);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Gold and silver rates updated successfully",
        });
      } else if (section === 'General') {
        // Update store profile - ensuring phone is stored as string
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            name: storeName,
            email: storeEmail,
            phone: phone.toString(), // Explicitly convert to string
            address: storeAddress
          })
          .eq('id', '1');

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
        description: error.message || `Failed to save ${section} settings.`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-maroon" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Store Settings</h1>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="gold-rates">Gold Rates</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Update your store's basic information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input 
                      id="store-name" 
                      value={storeName} 
                      onChange={(e) => setStoreName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email Address</Label>
                    <Input 
                      id="store-email" 
                      type="email" 
                      value={storeEmail} 
                      onChange={(e) => setStoreEmail(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Phone Number</Label>
                    <Input 
                      id="store-phone" 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-address">Store Address</Label>
                  <Textarea 
                    id="store-address" 
                    value={storeAddress} 
                    onChange={(e) => setStoreAddress(e.target.value)} 
                    rows={3} 
                  />
                </div>
                
                <Button 
                  onClick={() => handleSave('General')} 
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Gold Rates */}
          <TabsContent value="gold-rates">
            <Card>
              <CardHeader>
                <CardTitle>Gold Rates</CardTitle>
                <CardDescription>
                  Update the current gold rates displayed on your store.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gold-24k">24K Gold (per gram)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">₹</span>
                      <Input 
                        id="gold-24k" 
                        type="number" 
                        className="pl-8" 
                        value={goldRate24k} 
                        onChange={(e) => setGoldRate24k(Number(e.target.value))} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gold-22k">22K Gold (per gram)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">₹</span>
                      <Input 
                        id="gold-22k" 
                        type="number" 
                        className="pl-8" 
                        value={goldRate22k} 
                        onChange={(e) => setGoldRate22k(Number(e.target.value))} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gold-18k">18K Gold (per gram)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">₹</span>
                      <Input 
                        id="gold-18k" 
                        type="number" 
                        className="pl-8" 
                        value={goldRate18k} 
                        onChange={(e) => setGoldRate18k(Number(e.target.value))} 
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSave('Gold Rates')} 
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Update Rates"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure which emails are sent to customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Enable or disable all email notifications</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-confirmation" className="text-base">Order Confirmation</Label>
                      <p className="text-sm text-gray-500">Send email when an order is placed</p>
                    </div>
                    <Switch 
                      id="order-confirmation" 
                      checked={orderConfirmation} 
                      onCheckedChange={setOrderConfirmation} 
                      disabled={!emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shipping-updates" className="text-base">Shipping Updates</Label>
                      <p className="text-sm text-gray-500">Send email when an order ships</p>
                    </div>
                    <Switch 
                      id="shipping-updates" 
                      checked={shippingUpdates} 
                      onCheckedChange={setShippingUpdates} 
                      disabled={!emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails" className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Send promotional emails and newsletters</p>
                    </div>
                    <Switch 
                      id="marketing-emails" 
                      checked={marketingEmails} 
                      onCheckedChange={setMarketingEmails} 
                      disabled={!emailNotifications}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSave('Email')} 
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Email Settings"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Configure the payment methods available to customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="razorpay-enabled" className="text-base">Razorpay</Label>
                      <p className="text-sm text-gray-500">Accept credit/debit cards and UPI</p>
                    </div>
                    <Switch 
                      id="razorpay-enabled" 
                      checked={razorpayEnabled} 
                      onCheckedChange={setRazorpayEnabled} 
                    />
                  </div>
                  
                  {razorpayEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-gray-100">
                      <div className="space-y-2">
                        <Label htmlFor="razorpay-key">API Key</Label>
                        <Input 
                          id="razorpay-key" 
                          value={razorpayKey} 
                          onChange={(e) => setRazorpayKey(e.target.value)} 
                          placeholder="rzp_test_..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="razorpay-secret">API Secret</Label>
                        <Input 
                          id="razorpay-secret" 
                          type="password" 
                          value={razorpaySecret} 
                          onChange={(e) => setRazorpaySecret(e.target.value)} 
                          placeholder="••••••••••••••••"
                        />
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="cod-enabled" className="text-base">Cash on Delivery</Label>
                      <p className="text-sm text-gray-500">Allow customers to pay when they receive their order</p>
                    </div>
                    <Switch 
                      id="cod-enabled" 
                      checked={codEnabled} 
                      onCheckedChange={setCodEnabled} 
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSave('Payment')} 
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Payment Settings"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
