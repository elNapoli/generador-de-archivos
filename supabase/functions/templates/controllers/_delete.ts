import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const _delete = async (authHeader, id) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('document_templates')
    .delete()
    .eq('id', id)
}
