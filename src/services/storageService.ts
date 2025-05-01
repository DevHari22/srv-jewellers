
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Function to upload a file to storage
export const uploadFile = async (
  bucket: string,
  file: File,
  path?: string
): Promise<string | null> => {
  try {
    // Create a unique file path if not provided
    const filePath = path || `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    // Check if bucket exists, create if it doesn't
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === bucket);
    
    if (!bucketExists) {
      console.log(`Creating new bucket: ${bucket}`);
      const { error: bucketError } = await supabase.storage.createBucket(bucket, {
        public: true
      });
      
      if (bucketError) {
        console.error(`Error creating bucket ${bucket}:`, bucketError);
        toast.error(`Failed to create storage bucket: ${bucketError.message}`);
        return null;
      }
    }
    
    // Upload the file
    console.log(`Uploading file to ${bucket}/${filePath}`);
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (uploadError) {
      console.error(`Error uploading file:`, uploadError);
      toast.error(`Upload failed: ${uploadError.message}`);
      return null;
    }
    
    // Get the public URL
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    console.log("File uploaded successfully, public URL:", data.publicUrl);
    return data.publicUrl;
  } catch (error: any) {
    console.error(`Error uploading file to ${bucket}:`, error);
    toast.error(`Failed to upload file: ${error.message || "Unknown error"}`);
    return null;
  }
};

// Function to delete a file from storage
export const deleteFile = async (
  bucket: string,
  path: string
): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting file from ${bucket}:`, error);
    toast.error("Failed to delete file");
    return false;
  }
};

// Extract filename from storage URL
export const getFileNameFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    // Return the last segment of the path which is typically the filename
    return pathParts[pathParts.length - 1];
  } catch (e) {
    console.error("Error parsing URL:", e);
    // If URL parsing fails, try a simple regex approach as fallback
    const match = url.match(/\/([^\/]+)$/);
    return match ? match[1] : url;
  }
};
