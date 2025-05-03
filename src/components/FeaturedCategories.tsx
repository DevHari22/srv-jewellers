
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    count: 32,
    link: "/categories/necklaces",
  },
  {
    id: 2,
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1588444650733-d636f6927858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: 45,
    link: "/categories/earrings",
  },
  {
    id: 3,
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: 28,
    link: "/categories/bracelets",
  },
  {
    id: 4,
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: 50,
    link: "/categories/rings",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 sm:mb-5">
            <span className="text-[#8B4513] relative">
              Shop By Category
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F9A602]"></span>
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Browse our extensive collection of traditional and contemporary Indian jewelry,
            crafted by master artisans with the finest materials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Category image */}
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Category info overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-serif font-bold mb-1 sm:mb-2 group-hover:text-[#F9A602] transition-colors">
                  {category.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-200 text-sm sm:text-base">{category.count} Products</p>
                  <ArrowRight size={18} className="text-[#F9A602] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all"/>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-10 sm:mt-14">
          <Button className="bg-[#F9A602] hover:bg-[#B8860B] text-white text-sm sm:text-base px-8 py-6 rounded-md font-medium" asChild>
            <Link to="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
