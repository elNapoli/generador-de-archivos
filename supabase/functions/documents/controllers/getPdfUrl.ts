import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const getPdfUrl = async (authHeader, id) => {
  const supabase = supabaseClient(authHeader)
  const query = await supabase
    .from('user_documents')
    .select()
    .eq('id', id).single()
  if (query.data) {
    return supabase
      .storage
      .from('documents')
      .getPublicUrl(query.data.path)
  }
  else return query
}
