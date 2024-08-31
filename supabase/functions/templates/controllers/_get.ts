import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { defaultData } from '../../_shared/defaultData.ts'

export const _get = async (authHeader, id) => {
  const supabase = supabaseClient(authHeader)
  const response = await supabase
    .from('document_templates')
    .select(`
      id,
      name,
      description,
      content,
      document_attributes(id, name, type, required, code_name)
    `)
    .eq('id', id).single()
  return defaultData({}, response)
}
