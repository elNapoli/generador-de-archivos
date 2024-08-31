import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { defaultData } from '../../_shared/defaultData.ts'

export const _create = async (authHeader, data) => {
  const supabase = supabaseClient(authHeader)
  const response = await supabase
    .from('user_documents')
    .insert({
      template_id: data.templateId,
      name: data.name,
      attributes: data.attributesValue,
    })
  return defaultData({}, response)
}
