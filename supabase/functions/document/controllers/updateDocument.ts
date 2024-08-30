import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const updateDocument = async (authHeader, id, data) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('user_documents')
    .update({
      template_id: data.templateId,
      attributes: data.attributesValue,
    })
    .eq('id', id)
}
