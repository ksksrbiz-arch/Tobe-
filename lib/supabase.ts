import { createClient } from "@supabase/supabase-js";

// Fallback placeholders prevent build-time errors when env vars are not yet set.
// Runtime calls will fail gracefully (network errors) until Supabase is configured.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface RecentArrival {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
  added_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number | null;
  created_at: string;
  notified: boolean;
}
