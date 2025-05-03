
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/Layout";
import { Plus, Edit, Trash2, Search, Filter, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProducts, deleteProduct, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
        toast({
          title: "Product Deleted",
          description: `${name} has been removed successfully.`,
          duration: 3000,
        });
      }
    }
  };

  return (
    <AdminLayout title="Products">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-maroon"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-maroon bg-white w-full"
              >
                <option value="all">All Products</option>
                <option value="featured">Featured</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <Button 
              className="bg-maroon hover:bg-maroon/90 text-white w-full sm:w-auto"
              onClick={() => navigate('/admin/products/new')}
            >
              <Plus size={18} className="mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-maroon" />
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Featured</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3 rounded overflow-hidden bg-gray-100">
                              {product.image_url && (
                                <img 
                                  src={product.image_url} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                                  }}
                                />
                              )}
                            </div>
                            <div className="truncate max-w-[120px] sm:max-w-xs">
                              <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                              <div className="text-xs text-gray-500 sm:hidden">{product.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm text-gray-900 capitalize">{product.category}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">₹{product.price.toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                          {product.featured ? (
                            <Check size={18} className="text-green-500" />
                          ) : (
                            <X size={18} className="text-gray-400" />
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <Link to={`/admin/products/edit/${product.id}`}>
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                <Edit size={16} />
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No products found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {filteredProducts.length > 0 && (
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredProducts.length}</span> products
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
