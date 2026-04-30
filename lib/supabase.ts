import { createClient } from "@supabase/supabase-js";

// Placeholder values allow `next build` (static export) to succeed without
// environment variables set in CI/CD. All runtime Supabase calls will fail with
// a network/auth error until NEXT_PUBLIC_SUPABASE_URL and
// NEXT_PUBLIC_SUPABASE_ANON_KEY are configured in the deployment environment.
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
