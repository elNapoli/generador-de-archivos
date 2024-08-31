import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const getPdfUrl = async (authHeader, id) => {
  const supabase = supabaseClient(authHeader)
  const query = await supabase
    .from('user_documents')
    .select()
    .eq('id', id).single()
  if (query.data) {
    const response = supabase
      .storage
      .from('documents')
      .getPublicUrl(query.data.path)
    return {
      data: response.data,
      status: 200,
      error: null,
    }
  }
  else return query
}
