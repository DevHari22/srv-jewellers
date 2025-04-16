
import React from "react";
import { TrendingUp, Clock } from "lucide-react";

const GoldRateSection = () => {
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
          {/* 24 Karat Gold */}
          <div className="bg-maroon-dark rounded-lg p-6 shadow-md border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-medium">24 Karat Gold</h3>
              <div className="flex items-center text-green-400">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">+0.8%</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Price Per Gram</p>
                <p className="text-3xl font-bold text-gold">₹5,487</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm mb-1">Price Per Tola</p>
                <p className="text-xl font-semibold text-gold-light">₹63,957</p>
              </div>
            </div>
          </div>

          {/* 22 Karat Gold */}
          <div className="bg-maroon-dark rounded-lg p-6 shadow-md border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-medium">22 Karat Gold</h3>
              <div className="flex items-center text-green-400">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">+0.6%</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Price Per Gram</p>
                <p className="text-3xl font-bold text-gold">₹5,121</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm mb-1">Price Per Tola</p>
                <p className="text-xl font-semibold text-gold-light">₹59,760</p>
              </div>
            </div>
          </div>

          {/* 18 Karat Gold */}
          <div className="bg-maroon-dark rounded-lg p-6 shadow-md border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-medium">18 Karat Gold</h3>
              <div className="flex items-center text-green-400">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">+0.5%</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Price Per Gram</p>
                <p className="text-3xl font-bold text-gold">₹4,115</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm mb-1">Price Per Tola</p>
                <p className="text-xl font-semibold text-gold-light">₹48,007</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-300 flex items-center justify-center">
          <Clock size={16} className="mr-2" />
          <span>Last updated: Today at 11:30 AM IST</span>
        </div>
      </div>
    </section>
  );
};

export default GoldRateSection;
