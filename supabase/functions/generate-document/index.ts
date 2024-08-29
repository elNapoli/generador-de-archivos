// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import Delta from 'npm:quill-delta@5.1.0'
import pdf from 'npm:quill-to-pdf'
import { replaceTemplatePlaceholders } from '../_shared/replaceTemplatePlaceholders.ts'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 204,
    })
  }
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
  if (data) {
    try {
      const temp = replaceTemplatePlaceholders(data.document_templates.content, JSON.parse(data.attributes))
      const deltaObject = new Delta(temp)
      const blob = await pdf.pdfExporter.generatePdf(deltaObject)

      return new Response(blob, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${data.name}.pdf"`,
        },
        status: 200,
      })
    }
    catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }
  }
  else {
    return new Response(JSON.stringify({}), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  }
})
