
import { useState, useEffect } from 'react';
import { 
  Product, 
  fetchProducts, 
  fetchFeaturedProducts, 
  fetchProductsByCategory, 
  seedInitialProducts 
} from '@/services/productService';

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        // Make sure we have initial data
        await seedInitialProducts();
        
        // Then fetch all products
        const products = await fetchProducts();
        setAllProducts(products);
        
        // And featured products
        const featured = await fetchFeaturedProducts();
        setFeaturedProducts(featured);
        
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error in useProducts hook:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  return {
    allProducts,
    featuredProducts,
    loading,
    error,
    refetch: async () => {
      setLoading(true);
      const products = await fetchProducts();
      setAllProducts(products);
      
      const featured = await fetchFeaturedProducts();
      setFeaturedProducts(featured);
      
      setLoading(false);
    }
  };
}

export function useProductsByCategory(category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const categoryProducts = await fetchProductsByCategory(category);
        setProducts(categoryProducts);
        setError(null);
      } catch (err) {
        setError(`Failed to load ${category} products. Please try again later.`);
        console.error(`Error loading ${category} products:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  return { products, loading, error };
}
