import Delta from 'npm:quill-delta@5.1.0'
import pdf from 'npm:quill-to-pdf'
import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { generateUniqueName } from '../../_shared/generateUniqueName.ts'
import { replaceTemplatePlaceholders } from '../../_shared/replaceTemplatePlaceholders.ts'

export const generatePdf = async (authHeader, id) => {
  const supabase = supabaseClient(authHeader)
  const query = await supabase.from('user_documents')
    .select(`template_id, 
    status_id, 
    name, 
    id, 
    generated_at,
    attributes, 
    document_templates(content)`,
    )
    .eq('id', id)
    .maybeSingle()
  if (query.error) {
    return query
  }
  try {
    const data = query.data

    const temp = replaceTemplatePlaceholders(JSON.parse(data.document_templates.content), data.attributes)
    const deltaObject = new Delta(temp)
    const blob = await pdf.pdfExporter.generatePdf(deltaObject)
    const response = await supabase
      .storage
      .from('documents')
      .upload(`${data.id}/${generateUniqueName('doc-')}.pdf`, blob)
    if (response.error) {
      return response
    }

    return await supabase
      .from('user_documents')
      .update({
        path: response.data.path,
      })
      .eq('id', data.id)
  }
  catch (e) {
    return c.json({ error: error ? error : e.message, data: null }, 400)
  }
}
