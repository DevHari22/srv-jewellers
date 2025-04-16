
import React, { useState } from "react";
import AdminLayout from "@/components/admin/Layout";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Sample products data
  const products = [
    { id: 1, name: "22K Gold Necklace", category: "Necklaces", price: 45000, stock: 12, featured: true },
    { id: 2, name: "Diamond Earrings", category: "Earrings", price: 28500, stock: 8, featured: false },
    { id: 3, name: "Ruby Pendant", category: "Pendants", price: 16800, stock: 5, featured: true },
    { id: 4, name: "Pearl Bracelet", category: "Bracelets", price: 12400, stock: 15, featured: false },
    { id: 5, name: "Gold Ring with Diamond", category: "Rings", price: 33700, stock: 7, featured: true },
    { id: 6, name: "Silver Anklet", category: "Anklets", price: 5800, stock: 20, featured: false },
    { id: 7, name: "Gold Bangles Set", category: "Bangles", price: 52000, stock: 4, featured: true },
    { id: 8, name: "Diamond Nose Pin", category: "Nose Pins", price: 8900, stock: 10, featured: false },
  ];
  
  // Filter products based on search query and selected filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "featured") return matchesSearch && product.featured;
    if (filter === "out-of-stock") return matchesSearch && product.stock === 0;
    return matchesSearch;
  });

  return (
    <AdminLayout title="Products">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold bg-white"
            >
              <option value="all">All Products</option>
              <option value="featured">Featured</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <Button className="bg-gold hover:bg-gold-dark text-white">
            <Plus size={18} className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-500">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Featured</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">#{product.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-gray-200 mr-3"></div>
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">₹{product.price.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block w-4 h-4 rounded-full ${product.featured ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Edit size={18} className="text-blue-500" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
