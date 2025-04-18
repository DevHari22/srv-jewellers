
import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define the type for the gold rates
type GoldRate = {
  id: string;
  "24k_rate": number;
  "24k_change": number;
  "24k_trend": string;
  "22k_rate": number;
  "22k_change": number;
  "22k_trend": string;
  "18k_rate": number;
  "18k_change": number;
  "18k_trend": string;
  updated_at: string;
};

const GoldRateSection = () => {
  const [goldRates, setGoldRates] = useState<GoldRate | null>(null);
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
        setGoldRates(data);
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

  // Add null check to prevent runtime error
  if (!goldRates) {
    return (
      <section className="py-12 bg-maroon text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-2">
              <span className="text-gold">Today's Gold Rates</span>
            </h2>
            <p className="text-gray-200">No gold rates available</p>
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
          {[
            { karat: '24k', rate: goldRates['24k_rate'], change: goldRates['24k_change'], trend: goldRates['24k_trend'] },
            { karat: '22k', rate: goldRates['22k_rate'], change: goldRates['22k_change'], trend: goldRates['22k_trend'] },
            { karat: '18k', rate: goldRates['18k_rate'], change: goldRates['18k_change'], trend: goldRates['18k_trend'] }
          ].map((gold) => (
            <div key={gold.karat} className="bg-maroon-dark rounded-lg p-6 shadow-md border border-gold/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-serif font-medium">{gold.karat.toUpperCase()} Karat Gold</h3>
                <div className={`flex items-center ${gold.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {gold.trend === 'up' ? (
                    <TrendingUp size={16} className="mr-1" />
                  ) : (
                    <TrendingDown size={16} className="mr-1" />
                  )}
                  <span className="text-sm">
                    {gold.trend === 'up' ? '+' : '-'}
                    {gold.change}%
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-300 text-sm mb-1">Price Per Gram</p>
                  <p className="text-3xl font-bold text-gold">₹{gold.rate}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm mb-1">Price Per Tola</p>
                  <p className="text-xl font-semibold text-gold-light">
                    ₹{calculateTola(gold.rate)}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
