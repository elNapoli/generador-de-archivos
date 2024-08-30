import { Hono } from 'jsr:@hono/hono'
import { cors } from 'jsr:@hono/hono/cors'
import Delta from 'npm:quill-delta@5.1.0'
import pdf from 'npm:quill-to-pdf'
import { supabaseClient } from '../_shared/supabaseClient.ts'
import { generateUniqueName } from '../_shared/generateUniqueName.ts'
import { replaceTemplatePlaceholders } from '../_shared/replaceTemplatePlaceholders.ts'

const app = new Hono()

// Configurar CORS
app.use('*', cors({
  origin: '*',
  allowHeaders: ['authorization', 'x-client-info', 'apikey'],
}))

app.post('/generate-document', async (c) => {
  console.log('asdfasdf')
  const authHeader = c.req.header('Authorization')!
  console.log(authHeader)
  const supabase = supabaseClient(authHeader)
  const { documentId } = await c.req.json()
  const { data, error } = await supabase.from('user_documents')
    .select('template_id, status_id, name, id, generated_at, attributes, document_templates(content)')
    .eq('id', documentId)
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

      const updateResponse = await supabase
        .from('user_documents')
        .update({
          path: response.data.path,
        })
        .eq('id', data.id)

      console.log(updateResponse)

      return c.json({ data: true }, 200)
    }
    catch (e) {
      return c.json({ error: error ? error : e.message }, 400)
    }
  }
  else {
    return c.json({ error: 'Document not found' }, 404)
  }
})

// Inicia el servidor
Deno.serve(app.fetch)
