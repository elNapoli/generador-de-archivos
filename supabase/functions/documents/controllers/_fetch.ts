import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const _fetch = async (authHeader) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('user_documents')
    .select(`
          id,
          generated_at,
          attributes,
          name,
          path
        `).returns()
}
