
import { supabase } from "@/integrations/supabase/client";

export interface SiteSettings {
  id: string;
  company_name: string;
  address: string;
  phone: string;
  email: string;
  gold_rate: number;
  silver_rate: number;
  instagram_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  youtube_url?: string;
}

export const fetchSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<{ success: boolean; error?: any }> => {
  try {
    console.log("Updating site settings:", settings);
    const { error } = await supabase
      .from('site_settings')
      .update(settings)
      .eq('id', '1');
    
    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error updating site settings:", error);
    return { success: false, error };
  }
};
