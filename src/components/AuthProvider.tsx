
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

export type AuthUser = {
  id: string;
  email?: string;
  role?: string;
};

export type AuthContextType = {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to fetch user role from profiles table
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, name')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching user role:", error);
        return { role: 'customer', name: null }; // Default role if fetch fails
      }
      
      return { role: data?.role || 'customer', name: data?.name || null };
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
      return { role: 'customer', name: null };
    }
  };

  const updateUserState = async (session: Session | null) => {
    try {
      if (session) {
        const { role, name } = await fetchUserRole(session.user.id);
        
        setUser({
          id: session.user.id,
          email: session.user.email,
          role: role
        });
        
        setSession(session);
        
        // If user has no name yet but provided one during signup, update the profile
        if (!name && session.user.user_metadata?.name) {
          await supabase
            .from('profiles')
            .update({ name: session.user.user_metadata.name })
            .eq('id', session.user.id);
        }
      } else {
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error("Error updating user state:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change event:", event);
        
        // Use setTimeout to prevent potential deadlocks with Supabase auth
        setTimeout(async () => {
          await updateUserState(session);
          
          if (event === 'SIGNED_IN') {
            sonnerToast.success('Signed in successfully!');
          } else if (event === 'SIGNED_OUT') {
            sonnerToast.success('Signed out successfully!');
          }
        }, 0);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Initial session check:", session ? "Session exists" : "No session");
      await updateUserState(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }

      console.log("Sign in successful");
      // No need to manually redirect here, the onAuthStateChange handler will take care of it

    } catch (error: any) {
      console.error("Sign in exception:", error);
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      // Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          },
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (authError) throw authError;

      toast({
        title: "Success!",
        description: "Please check your email to verify your account.",
      });
      
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
