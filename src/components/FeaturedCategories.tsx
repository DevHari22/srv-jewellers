
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
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
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            <span className="text-gold-gradient">Shop By Category</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of traditional and contemporary Indian jewelry,
            crafted by master artisans with the finest materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group overflow-hidden rounded-lg shadow-md relative"
            >
              {/* Category image */}
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Category info overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-serif font-bold mb-1 group-hover:text-gold-light transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-sm">{category.count} Products</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button className="bg-gold hover:bg-gold/90 text-maroon-dark text-base px-8 py-6 md:py-3 rounded-md" asChild>
            <Link to="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
