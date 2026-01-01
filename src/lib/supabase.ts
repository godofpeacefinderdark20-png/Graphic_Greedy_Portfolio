import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  tagline: string;
  description: string;
  story: string;
  colors: string[];
  typography: {
    primary?: string;
    secondary?: string;
  };
  mockup_images: string[];
  order_index: number;
  created_at: string;
}

export interface Poster {
  id: string;
  title: string;
  image_url: string;
  description: string;
  order_index: number;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string;
  description: string;
  order_index: number;
  created_at: string;
}
