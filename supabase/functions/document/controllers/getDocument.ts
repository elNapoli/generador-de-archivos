import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const getDocument = async (authHeader, id) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('user_documents')
    .select(`
    template_id,path, 
    status_id, 
    name, 
    id, 
    generated_at, 
    attributes, 
    document_templates(content)`)
    .eq('id', id).single()
}
