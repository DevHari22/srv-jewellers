
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/services/productService";

export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    }
  });
}

export function useFeaturedProductsQuery() {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    }
  });
}

export function useProductsByCategoryQuery(category: string) {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    }
  });
}
