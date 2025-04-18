
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
    const filePath = path || `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${file.name.split('.').pop()}`;
    
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Get the public URL
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error: any) {
    console.error(`Error uploading file to ${bucket}:`, error);
    toast.error("Failed to upload file");
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
