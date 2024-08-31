import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const _fetch = async (authHeader) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('document_templates')
    .select(`
          id,
          name,
          description,
          document_attributes(id, name, type, required, code_name),
          content
        `).returns()
}
