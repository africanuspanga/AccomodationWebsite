import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.');
}

// Validate URL format
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  throw new Error(
    `Invalid VITE_SUPABASE_URL format. ` +
    `Expected a URL starting with https://, but got: ${supabaseUrl.substring(0, 50)}... ` +
    `\n\nPlease check your Replit Secrets - you may have swapped VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY values.`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
