// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import Delta from 'npm:quill-delta@5.1.0'
import pdf from 'npm:quill-to-pdf'
import { corsHeaders } from '../_shared/cors.ts'
import { supabaseClient } from '../_shared/supabaseClient.ts'
import { generateUniqueName } from '../_shared/generateUniqueName.ts'
import { replaceTemplatePlaceholders } from '../_shared/replaceTemplatePlaceholders.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    })
  }
  const authHeader = req.headers.get('Authorization')!
  const supabase = supabaseClient(authHeader)
  const { documentId } = await req.json()
  const {
    data,
    error,
  } = await supabase.from('user_documents').select('template_id, status_id, name, id, generated_at, attributes, document_templates(content)').eq('id', documentId)
    .maybeSingle()
  if (data) {
    try {
      const temp = replaceTemplatePlaceholders(data.document_templates.content, JSON.parse(data.attributes))
      const deltaObject = new Delta(temp)
      const blob = await pdf.pdfExporter.generatePdf(deltaObject)
      const response = await supabase
        .storage
        .from('documents')
        .upload(`${data.id}/${generateUniqueName('doc-')}.pdf`, blob)
      console.log(response)

      const hola = await supabase
        .from('user_documents')
        .update({
          path: response.data.path,
        })
        .eq('id', data.id)
      console.log(hola)
      return new Response(JSON.stringify({ data: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },

        status: 200,
      })
    }
    catch (e) {
      return new Response(JSON.stringify({ error: error ? error : e.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }
  }
})
