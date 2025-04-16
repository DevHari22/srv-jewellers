
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, User, Lock, CreditCard, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserAccount = () => {
  // Personal Info State
  const [firstName, setFirstName] = useState("Rahul");
  const [lastName, setLastName] = useState("Sharma");
  const [email, setEmail] = useState("rahul.sharma@example.com");
  const [phone, setPhone] = useState("9876543210");
  
  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Address State
  const [addressLine1, setAddressLine1] = useState("42 Park Avenue");
  const [addressLine2, setAddressLine2] = useState("Near City Mall");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("400001");
  
  const [activeTab, setActiveTab] = useState("personal");
  
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Personal info updated:", { firstName, lastName, email, phone });
    // In a real app, this would submit to an API
    alert("Personal information updated successfully!");
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Password changed");
    // In a real app, this would submit to an API
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Address updated:", { addressLine1, addressLine2, city, state, pincode });
    // In a real app, this would submit to an API
    alert("Address updated successfully!");
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
                {/* Personal Information */}
                {activeTab === "personal" && (
                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-6">Personal Information</h2>
                    <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" className="bg-maroon hover:bg-maroon-dark text-white">
                          <Save size={18} className="mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Change Password */}
                {activeTab === "password" && (
                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-6">Change Password</h2>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          required
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" className="bg-maroon hover:bg-maroon-dark text-white">
                          <Lock size={18} className="mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Address */}
                {activeTab === "address" && (
                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 1
                        </label>
                        <input
                          id="addressLine1"
                          type="text"
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          id="addressLine2"
                          type="text"
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            id="state"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                            PIN Code
                          </label>
                          <input
                            id="pincode"
                            type="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" className="bg-maroon hover:bg-maroon-dark text-white">
                          <MapPin size={18} className="mr-2" />
                          Update Address
                        </Button>
                      </div>
                    </form>
                  </div>
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
