
import { supabase } from "@/integrations/supabase/client";

/**
 * Creates demo users (admin and customer) in Supabase
 * This is for demonstration purposes only
 * In a real application, you would handle user creation through a secure admin interface
 */
export const createDemoUsers = async () => {
  try {
    // 1. Create admin user
    const { data: adminData, error: adminError } = await supabase.auth.signUp({
      email: "admin@example.com",
      password: "password123",
      options: {
        data: {
          name: "Admin User"
        }
      }
    });

    if (adminError) {
      console.error("Error creating admin user:", adminError);
    } else {
      console.log("Admin user created with ID:", adminData.user?.id);
      
      // Update the admin role in the profiles table
      if (adminData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role: 'admin', name: 'Admin User' })
          .eq('id', adminData.user.id);
          
        if (profileError) {
          console.error("Error updating admin profile:", profileError);
        } else {
          console.log("Admin role assigned successfully");
        }
      }
    }

    // 2. Create customer user
    const { data: customerData, error: customerError } = await supabase.auth.signUp({
      email: "customer@example.com",
      password: "password123",
      options: {
        data: {
          name: "Customer User"
        }
      }
    });

    if (customerError) {
      console.error("Error creating customer user:", customerError);
    } else {
      console.log("Customer user created with ID:", customerData.user?.id);
      
      // The customer role is default, but let's explicitly set the name
      if (customerData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ name: 'Customer User' })
          .eq('id', customerData.user.id);
          
        if (profileError) {
          console.error("Error updating customer profile:", profileError);
        } else {
          console.log("Customer profile updated successfully");
        }
      }
    }

    return {
      admin: adminData.user,
      customer: customerData.user
    };
  } catch (error) {
    console.error("Error creating demo users:", error);
    return null;
  }
};
