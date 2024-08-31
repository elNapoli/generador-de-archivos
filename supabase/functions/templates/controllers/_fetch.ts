import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { defaultData } from '../../_shared/defaultData.ts'

export const _fetch = async (authHeader) => {
  const supabase = supabaseClient(authHeader)
  const response = await supabase
    .from('document_templates')
    .select()
    .returns()
  return defaultData([], response)
}
