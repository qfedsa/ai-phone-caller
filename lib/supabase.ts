import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TypeScript types for our database schema
export interface Lead {
  id: string;
  slug: string;
  company_name: string;
  first_name: string;
  email: string;
  vapi_agent_id: string;
  created_at: string;
}

/**
 * Fetch lead data by slug from Supabase
 * @param slug - The unique slug identifier for the lead
 * @returns Lead data or null if not found
 */
export async function getLeadBySlug(slug: string): Promise<Lead | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching lead:', error);
      return null;
    }

    return data as Lead;
  } catch (error) {
    console.error('Unexpected error fetching lead:', error);
    return null;
  }
}

/**
 * Check if Supabase is properly configured
 * @returns boolean indicating if configuration is valid
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
