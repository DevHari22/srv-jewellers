
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
    }, 1000);
  };

  return (
    <section className="py-16 bg-gold-light">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-md border border-gold/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-3">
                <span className="text-gold-gradient">Stay Updated</span>
              </h2>
              <p className="text-gray-600">
                Subscribe to our newsletter to receive exclusive offers, new collection
                announcements, and updates on gold rates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
              <Button 
                type="submit" 
                className="btn-maroon px-6 py-3"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By subscribing, you agree to our Privacy Policy and consent to receive updates
              from Indian Gem Emporium.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
