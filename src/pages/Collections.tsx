
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Box, Grid2x2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type CategoryInfo = {
  name: string;
  display: string;
  color: string;
  image: string;
  count: number;
};

const CATEGORY_COLORS: Record<string, string> = {
  necklaces: "bg-[#9b87f5]",
  earrings: "bg-[#6E59A5]",
  bracelets: "bg-[#D6BCFA]",
  rings: "bg-[#1A1F2C] text-white",
};

const CATEGORY_IMAGES: Record<string, string> = {
  necklaces: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  bracelets: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  rings: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
};

const CATEGORY_DISPLAY: Record<string, string> = {
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  rings: "Rings",
};

const Collections = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch category counts from database
  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("category", { count: "exact" });

    // Group products by category for counts
    const grouped: Record<string, number> = {};
    (data || []).forEach((item: any) => {
      if (item.category) {
        grouped[item.category] = (grouped[item.category] || 0) + 1;
      }
    });

    const cats: CategoryInfo[] = Object.keys(CATEGORY_DISPLAY).map((cat) => ({
      name: cat,
      display: CATEGORY_DISPLAY[cat] || cat,
      color: CATEGORY_COLORS[cat] || "bg-gray-200",
      image: CATEGORY_IMAGES[cat] || "",
      count: grouped[cat] || 0,
    }));

    setCategories(cats);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700">Collections</span>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center">
            <Box className="mr-2 text-maroon" /> Our Collections
          </h1>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {loading
                ? Array(4)
                    .fill(null)
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-gray-200 animate-pulse aspect-square"
                      />
                    ))
                : categories.map((c) => (
                    <Link
                      key={c.name}
                      to={`/categories/${c.name}`}
                      className={`rounded-xl overflow-hidden border shadow group hover:scale-105 transition-transform duration-200`}
                    >
                      <div
                        className={`aspect-square ${c.color} flex items-center justify-center relative`}
                      >
                        {/* category image */}
                        <img
                          src={c.image}
                          alt={c.display}
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                          draggable={false}
                        />
                        <span className="relative z-10 text-xl font-bold drop-shadow text-white">
                          {c.display}
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-medium text-gray-900">
                            {c.display}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {c.count} items
                        </span>
                      </div>
                    </Link>
                  ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild className="bg-maroon hover:bg-maroon-dark text-white px-6 py-2 text-lg">
                <Link to="/categories">
                  <Grid2x2 size={20} className="inline-block mr-2" />
                  Shop All Categories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
