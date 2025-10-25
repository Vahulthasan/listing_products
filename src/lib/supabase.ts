import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  tamil_name: string | null;
  category: string;
  subcategory: string | null;
  description: string | null;
  price: number;
  unit: string;
  stock_quantity: number;
  brand: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};
