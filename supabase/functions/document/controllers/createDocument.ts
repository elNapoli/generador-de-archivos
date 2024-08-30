import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const createDocument = async (authHeader, data) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('user_documents')
    .insert({
      template_id: data.templateId,
      name: data.name,
      attributes: data.attributesValue,
    })
}
