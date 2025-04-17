
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/Layout";
import { Plus, Edit, Trash2, Search, Filter, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProducts, deleteProduct, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    
    loadProducts();
  }, []);
  
  // Filter products based on search query and selected filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "featured") return matchesSearch && product.featured;
    if (filter === "out-of-stock") return matchesSearch && product.stock === 0;
    return matchesSearch;
  });

  const handleDeleteProduct = async (id: string, name: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    
    if (confirmed) {
      const success = await deleteProduct(id);
      
      if (success) {
        // Remove from local state
        setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      }
    }
  };

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
          
          <Link to="/admin/products/new">
            <Button className="bg-gold hover:bg-gold-dark text-white">
              <Plus size={18} className="mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-maroon" />
          </div>
        ) : (
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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">#{product.id.substring(0, 8)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded bg-gray-200 mr-3 overflow-hidden">
                            {product.image_url && (
                              <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
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
                        {product.featured ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <X size={18} className="text-gray-400" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Link to={`/admin/products/edit/${product.id}`}>
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <Edit size={18} className="text-blue-500" />
                            </button>
                          </Link>
                          <button 
                            className="p-1 rounded-full hover:bg-gray-100"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500">
                      No products found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
