import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const fetchDocuments = async (authHeader) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('user_documents')
    .select('template_id,path, status_id, name, id, generated_at, attributes, document_templates(content)').returns()
}
