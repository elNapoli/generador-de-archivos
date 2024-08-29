import { createClient } from 'https://esm.sh/@supabase/supabase-js'

export const supabaseClient = authHeader => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  { global: { headers: { Authorization: authHeader } } },
)
