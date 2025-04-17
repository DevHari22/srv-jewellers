
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define a Product type based on our database schema
export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url: string;
  category: string;
  stock: number;
  featured?: boolean;
  weight?: string; // Additional metadata for jewelry
  purity?: string; // Additional metadata for jewelry
  created_at?: string; // Adding created_at property
  updated_at?: string; // Adding updated_at property
};

export type ProductInput = Omit<Product, 'id'>;

// Function to fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to load products');
    return [];
  }
};

// Function to fetch featured products
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching featured products:', error);
      toast.error('Failed to load featured products');
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Failed to load featured products');
    return [];
  }
};

// Function to fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching ${category} products:`, error);
      toast.error(`Failed to load ${category} products`);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    toast.error(`Failed to load ${category} products`);
    return [];
  }
};

// Function to fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    toast.error('Failed to load product details');
    return null;
  }
};

// Function to create a new product (admin only)
export const createProduct = async (product: ProductInput): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
      return null;
    }
    
    toast.success('Product created successfully');
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    toast.error('Failed to create product');
    return null;
  }
};

// Function to update a product (admin only)
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
      return null;
    }
    
    toast.success('Product updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    toast.error('Failed to update product');
    return null;
  }
};

// Function to delete a product (admin only)
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      return false;
    }
    
    toast.success('Product deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    toast.error('Failed to delete product');
    return false;
  }
};

// Function to seed initial products (for demo/development)
export const seedInitialProducts = async (): Promise<void> => {
  // Product data with realistic jewelry items
  const products = [
    // Necklaces
    {
      name: "22K Gold Traditional Necklace",
      description: "This exquisite 22K gold necklace features intricate traditional design with meticulous craftsmanship. The piece is adorned with delicate filigree work and small ruby accents, making it perfect for weddings and special occasions.",
      price: 72999,
      image_url: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "necklaces",
      stock: 5,
      featured: true,
      weight: "25.4 grams",
      purity: "22K (91.6%)"
    },
    {
      name: "Diamond Mangalsutra",
      description: "This modern mangalsutra combines tradition with contemporary design, featuring a delicate chain with a diamond pendant.",
      price: 45999,
      image_url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "necklaces",
      stock: 8,
      featured: false,
      weight: "12.3 grams",
      purity: "18K (75%)"
    },
    {
      name: "Pearl and Gold Choker",
      description: "A stunning choker necklace with freshwater pearls set in 18K gold, perfect for both traditional and western outfits.",
      price: 36999,
      image_url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "necklaces",
      stock: 10,
      featured: true,
      weight: "15.8 grams",
      purity: "18K (75%)"
    },
    
    // Earrings
    {
      name: "Diamond Stud Earrings",
      description: "Classic diamond studs in 18K white gold, featuring brilliant-cut diamonds of exceptional clarity and sparkle.",
      price: 25999,
      image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "earrings",
      stock: 15,
      featured: true,
      weight: "4.2 grams",
      purity: "18K (75%)"
    },
    {
      name: "Ruby Drop Earrings",
      description: "Elegant drop earrings with natural rubies surrounded by small diamonds in a floral design.",
      price: 34999,
      image_url: "https://images.unsplash.com/photo-1588444650733-d636f6927858?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "earrings",
      stock: 7,
      featured: false,
      weight: "6.5 grams",
      purity: "22K (91.6%)"
    },
    {
      name: "Emerald Jhumka Earrings",
      description: "Traditional jhumka earrings made with 22K gold, featuring emerald centers and pearl drops.",
      price: 42999,
      image_url: "https://images.unsplash.com/photo-1630020842874-a7f5358b8130?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "earrings",
      stock: 6,
      featured: true,
      weight: "8.7 grams",
      purity: "22K (91.6%)"
    },
    
    // Bracelets
    {
      name: "Gold Bangle Set",
      description: "Set of three 22K gold bangles with engraved traditional motifs, perfect for daily wear or special occasions.",
      price: 54999,
      image_url: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "bracelets",
      stock: 4,
      featured: false,
      weight: "28.3 grams",
      purity: "22K (91.6%)"
    },
    {
      name: "Diamond Tennis Bracelet",
      description: "Exquisite tennis bracelet with round brilliant diamonds set in 18K white gold, offering timeless elegance.",
      price: 89999,
      image_url: "https://images.unsplash.com/photo-1611592546144-85a763db01a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "bracelets",
      stock: 3,
      featured: true,
      weight: "12.1 grams",
      purity: "18K (75%)"
    },
    {
      name: "Sapphire Chain Bracelet",
      description: "Delicate gold chain bracelet with blue sapphire charms, adjustable length for perfect fit.",
      price: 21999,
      image_url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "bracelets",
      stock: 9,
      featured: false,
      weight: "5.4 grams",
      purity: "18K (75%)"
    },
    
    // Rings
    {
      name: "Diamond Solitaire Ring",
      description: "Classic solitaire ring featuring a brilliant-cut diamond of exceptional clarity in a platinum setting.",
      price: 62999,
      image_url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "rings",
      stock: 7,
      featured: true,
      weight: "4.8 grams",
      purity: "Platinum (95%)"
    },
    {
      name: "Ruby and Diamond Cocktail Ring",
      description: "Statement cocktail ring with a center ruby surrounded by a halo of diamonds in rose gold.",
      price: 38999,
      image_url: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "rings",
      stock: 5,
      featured: false,
      weight: "6.2 grams",
      purity: "18K Rose Gold (75%)"
    },
    {
      name: "Emerald Cut Engagement Ring",
      description: "Sophisticated engagement ring featuring an emerald-cut diamond flanked by baguette diamonds in white gold.",
      price: 78999,
      image_url: "https://images.unsplash.com/photo-1587861736250-d546c332e8ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "rings",
      stock: 4,
      featured: true,
      weight: "5.3 grams",
      purity: "18K White Gold (75%)"
    }
  ];
  
  try {
    // Check if products already exist to avoid duplicates
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('name')
      .limit(1);
      
    if (checkError) {
      console.error('Error checking existing products:', checkError);
      return;
    }
    
    // If we already have products, don't seed
    if (existingProducts && existingProducts.length > 0) {
      console.log('Products already seeded, skipping...');
      return;
    }
    
    // Insert products
    const { error } = await supabase
      .from('products')
      .insert(products);
      
    if (error) {
      console.error('Error seeding products:', error);
      toast.error('Failed to seed initial products');
      return;
    }
    
    console.log('Initial products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
