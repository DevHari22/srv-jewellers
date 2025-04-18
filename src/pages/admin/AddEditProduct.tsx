
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/Layout";
import { Upload, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createProduct, updateProduct, fetchProductById } from "@/services/productService";

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "necklaces", // Default category
    stock: 0,
    featured: false,
    weight: "",
    purity: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch product data if in edit mode
  React.useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      fetchProductById(id).then((data) => {
        if (data) {
          setProduct({
            name: data.name,
            description: data.description || "",
            price: data.price,
            category: data.category,
            stock: data.stock,
            featured: data.featured || false,
            weight: data.weight || "",
            purity: data.purity || "",
            image_url: data.image_url || "",
          });
          
          if (data.image_url) {
            setImagePreview(data.image_url);
          }
        }
        setLoading(false);
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setProduct({ ...product, [name]: Number(value) });
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return product.image_url; // If no new image, use existing
    
    setUploading(true);
    try {
      // Create a unique file path
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, imageFile);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Upload image if there's a new one
      const imageUrl = await uploadImage();
      if (uploading) return; // If still uploading, don't proceed
      
      const productData = {
        ...product,
        image_url: imageUrl || product.image_url,
      };
      
      let result;
      if (isEditMode && id) {
        result = await updateProduct(id, productData);
      } else {
        result = await createProduct(productData);
      }
      
      if (result) {
        toast({
          title: `Product ${isEditMode ? 'updated' : 'created'} successfully`,
          description: `${productData.name} has been ${isEditMode ? 'updated' : 'added'} to the inventory`,
        });
        navigate('/admin/products');
      } else {
        throw new Error("Operation failed");
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} product`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <AdminLayout title="Loading Product...">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? "Edit Product" : "Add New Product"}>
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/products')}
          className="flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Product Information</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name*
              </label>
              <Input
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                placeholder="Gold Traditional Necklace"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the product in detail..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)*
                </label>
                <Input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                  min={0}
                  step={0.01}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock*
                </label>
                <Input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                  min={0}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-maroon"
                >
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                  <option value="rings">Rings</option>
                  <option value="bracelets">Bracelets</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured
                </label>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={product.featured}
                    onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
                    className="h-4 w-4 text-maroon border-gray-300 rounded focus:ring-maroon mr-2"
                  />
                  <span className="text-sm text-gray-600">Display as featured product</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <Input
                  name="weight"
                  value={product.weight}
                  onChange={handleChange}
                  placeholder="e.g. 25.4 grams"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purity
                </label>
                <Input
                  name="purity"
                  value={product.purity}
                  onChange={handleChange}
                  placeholder="e.g. 22K (91.6%)"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Product Image</h3>
            
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center mb-4">
              {imagePreview ? (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="mx-auto h-48 object-contain"
                  />
                </div>
              ) : (
                <div className="text-gray-500 mb-4">
                  <Upload size={48} className="mx-auto mb-2" />
                  <p>No image selected</p>
                </div>
              )}
              
              <div>
                <label className="inline-flex items-center px-4 py-2 bg-maroon hover:bg-maroon-dark text-white rounded-md cursor-pointer">
                  <Upload size={16} className="mr-2" />
                  {imagePreview ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mb-8">
              <p>Recommended: Square images (1:1 ratio)</p>
              <p>Maximum size: 5MB</p>
              <p>Formats: JPG, PNG, WebP</p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 mt-6 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-maroon hover:bg-maroon-dark text-white"
            disabled={loading || uploading}
          >
            {(loading || uploading) ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {uploading ? "Uploading..." : "Saving..."}
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                {isEditMode ? "Update Product" : "Save Product"}
              </>
            )}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditProduct;
