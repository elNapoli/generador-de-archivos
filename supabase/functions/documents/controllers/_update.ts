import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const _update = async (authHeader, id, data) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('user_documents')
    .update({
      name: data.name,
      description: data.description,
    })
    .eq('id', id)
    .select()
    .single()
}
