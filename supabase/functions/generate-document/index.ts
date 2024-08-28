// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  const { documentId } = await req.json()
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } },
  )
  // Database queries will have RLS policies enforced
  const {
    data,
    error,
  } = await supabaseClient.from('user_documents').select('template_id, status_id, name, id, generated_at, attributes, document_templates(content)').eq('id', documentId)
    .maybeSingle()
  console.log(documentId)
  return new Response(JSON.stringify({ data }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
