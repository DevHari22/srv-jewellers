import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GoldRateSection = () => {
  const [goldRates, setGoldRates] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchGoldRates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gold_rates')
        .select('*')
        .single();
      
      if (error) {
        console.error("Error fetching gold rates:", error);
        toast.error("Failed to fetch gold rates");
        return;
      }

      if (data) {
        setGoldRates({
          "24k": { 
            price: data['24k_rate'], 
            change: data['24k_change'], 
            trend: data['24k_trend'] 
          },
          "22k": { 
            price: data['22k_rate'], 
            change: data['22k_change'], 
            trend: data['22k_trend'] 
          },
          "18k": { 
            price: data['18k_rate'], 
            change: data['18k_change'], 
            trend: data['18k_trend'] 
          }
        });
        setLastUpdated(new Date(data.updated_at).toLocaleTimeString());
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error fetching gold rates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldRates();

    const channel = supabase
      .channel('gold_rates_changes')
      .on(
        'postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'gold_rates' 
        },
        (payload) => {
          fetchGoldRates();
        }
      )
      .subscribe();

    const intervalId = setInterval(fetchGoldRates, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
      supabase.removeChannel(channel);
    };
  }, []);

  const calculateTola = (pricePerGram: number) => {
    return (pricePerGram * 11.664).toFixed(0);
  };

  if (loading && !goldRates) {
    return (
      <section className="py-12 bg-maroon text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-2">
              <span className="text-gold">Today's Gold Rates</span>
            </h2>
            <p className="text-gray-200">Loading latest gold rates...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-maroon text-white">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">
            <span className="text-gold">Today's Gold Rates</span>
          </h2>
          <p className="text-gray-200">
            Updated live gold rates to help you make informed purchasing decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-maroon-dark rounded-lg p-6 shadow-md border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-medium">24 Karat Gold</h3>
              <div className="flex items-center text-green-400">
                {goldRates["24k"].trend === "up" ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                <span className="text-sm">
                  {goldRates["24k"].trend === "up" ? "+" : "-"}
                  {goldRates["24k"].change}%
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Price Per Gram</p>
                <p className="text-3xl font-bold text-gold">₹{goldRates["24k"].price}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm mb-1">Price Per Tola</p>
                <p className="text-xl font-semibold text-gold-light">
                  ₹{calculateTola(goldRates["24k"].price)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-maroon-dark rounded-lg p-6 shadow-md border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-medium">22 Karat Gold</h3>
              <div className="flex items-center text-green-400">
                {goldRates["22k"].trend === "up" ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                <span className="text-sm">
                  {goldRates["22k"].trend === "up" ? "+" : "-"}
                  {goldRates["22k"].change}%
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Price Per Gram</p>
                <p className="text-3xl font-bold text-gold">₹{goldRates["22k"].price}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm mb-1">Price Per Tola</p>
                <p className="text-xl font-semibold text-gold-light">
                  ₹{calculateTola(goldRates["22k"].price)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-maroon-dark rounded-lg p-6 shadow-md border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-medium">18 Karat Gold</h3>
              <div className="flex items-center text-green-400">
                {goldRates["18k"].trend === "up" ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                <span className="text-sm">
                  {goldRates["18k"].trend === "up" ? "+" : "-"}
                  {goldRates["18k"].change}%
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Price Per Gram</p>
                <p className="text-3xl font-bold text-gold">₹{goldRates["18k"].price}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm mb-1">Price Per Tola</p>
                <p className="text-xl font-semibold text-gold-light">
                  ₹{calculateTola(goldRates["18k"].price)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-300 flex items-center justify-center">
          <Clock size={16} className="mr-2" />
          <span>Last updated: Today at {lastUpdated} IST</span>
        </div>
      </div>
    </section>
  );
};

export default GoldRateSection;
