
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, User, Lock, CreditCard, MapPin, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserAccount = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Profile State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeDisabled, setPasswordChangeDisabled] = useState(true);
  
  // Address State
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [addressSaving, setAddressSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("name, email, phone, address")
        .eq("id", user.id)
        .single();
      if (!error && data) {
        setEmail(data.email || "");
        setPhone(data.phone || "");
        // Split name to first and last for display
        if (data.name) {
          const names = data.name.split(" ");
          setFirstName(names[0] || "");
          setLastName(names.slice(1).join(" ") || "");
        }
        // Separate address fields
        if (data.address) {
          // Assume address is comma separated: "line1,line2,city,state,pincode"
          const [line1, line2, c, s, pin] = data.address.split(",");
          setAddressLine1(line1 || "");
          setAddressLine2(line2 || "");
          setCity(c || "");
          setState(s || "");
          setPincode(pin || "");
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      let name = firstName + (lastName ? ` ${lastName}` : "");
      const { error } = await supabase
        .from("profiles")
        .update({ name, email, phone })
        .eq("id", user.id);
        
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Personal information updated successfully!",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your information.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);
    
    // Validation
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
        duration: 5000,
      });
      setPasswordSaving(false);
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
        duration: 5000,
      });
      setPasswordSaving(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Password updated!",
        description: "Your password has been successfully changed.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your password. Make sure your current password is correct.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setPasswordSaving(false);
      setPasswordChangeDisabled(true);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressSaving(true);
    
    try {
      const address = [addressLine1, addressLine2, city, state, pincode].join(",");
      const { error } = await supabase
        .from("profiles")
        .update({ address })
        .eq("id", user.id);
      
      if (error) throw error;
      
      toast({
        title: "Address updated!",
        description: "Your shipping address has been successfully updated.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating address:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your shipping address.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setAddressSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-gold">Home</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">My Account</span>
            </div>
          </div>
        </div>
        <div className="container py-12">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-maroon flex items-center justify-center text-white font-bold text-xl">
                      {firstName.charAt(0)}{lastName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h2 className="font-medium">{firstName} {lastName}</h2>
                      <p className="text-sm text-gray-500">{email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <ul>
                    <li>
                      <button
                        onClick={() => setActiveTab("personal")}
                        className={`w-full text-left px-4 py-3 rounded-md flex items-center ${
                          activeTab === "personal" ? "bg-gold-light text-maroon" : "hover:bg-gray-100"
                        }`}
                      >
                        <User size={18} className="mr-3" />
                        Personal Information
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("password")}
                        className={`w-full text-left px-4 py-3 rounded-md flex items-center ${
                          activeTab === "password" ? "bg-gold-light text-maroon" : "hover:bg-gray-100"
                        }`}
                      >
                        <Lock size={18} className="mr-3" />
                        Change Password
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("address")}
                        className={`w-full text-left px-4 py-3 rounded-md flex items-center ${
                          activeTab === "address" ? "bg-gold-light text-maroon" : "hover:bg-gray-100"
                        }`}
                      >
                        <MapPin size={18} className="mr-3" />
                        Shipping Address
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="w-full text-left px-4 py-3 rounded-md flex items-center hover:bg-gray-100"
                      >
                        <CreditCard size={18} className="mr-3" />
                        My Orders
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {loading ? (
                  <div className="py-20 text-center text-lg text-gray-500">Loading account...</div>
                ) : (
                  <>
                  {/* Personal Information */}
                  {activeTab === "personal" && (
                    <div className="p-6">
                      <h2 className="text-xl font-medium mb-6">Personal Information</h2>
                      <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            className="bg-maroon hover:bg-maroon-dark text-white"
                            disabled={saving}
                          >
                            {saving ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save size={18} className="mr-2" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Change Password */}
                  {activeTab === "password" && (
                    <div className="p-6">
                      <h2 className="text-xl font-medium mb-6">Change Password</h2>
                      {passwordChangeDisabled ? (
                        <div className="rounded-md bg-gray-50 border border-gray-200 p-4 mb-4">
                          <p className="text-gray-700 mb-4">For security reasons, your password is protected. Click the button below to enable password changing.</p>
                          <Button 
                            type="button" 
                            onClick={() => setPasswordChangeDisabled(false)}
                            variant="outline"
                          >
                            Enable Password Change
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="w-full"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full"
                              required
                              minLength={6}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full"
                              required
                            />
                          </div>
                          
                          <div className="pt-4 flex space-x-3">
                            <Button 
                              type="submit" 
                              className="bg-maroon hover:bg-maroon-dark text-white"
                              disabled={passwordSaving}
                            >
                              {passwordSaving ? (
                                <>
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <Lock size={18} className="mr-2" />
                                  Update Password
                                </>
                              )}
                            </Button>
                            
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                setPasswordChangeDisabled(true);
                                setCurrentPassword('');
                                setNewPassword('');
                                setConfirmPassword('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Address */}
                  {activeTab === "address" && (
                    <div className="p-6">
                      <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="addressLine1">Address Line 1</Label>
                          <Input
                            id="addressLine1"
                            type="text"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            className="w-full"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                          <Input
                            id="addressLine2"
                            type="text"
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="w-full"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              type="text"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              className="w-full"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="pincode">PIN Code</Label>
                            <Input
                              id="pincode"
                              type="text"
                              value={pincode}
                              onChange={(e) => setPincode(e.target.value)}
                              className="w-full"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            className="bg-maroon hover:bg-maroon-dark text-white"
                            disabled={addressSaving}
                          >
                            {addressSaving ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <MapPin size={18} className="mr-2" />
                                Update Address
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserAccount;
