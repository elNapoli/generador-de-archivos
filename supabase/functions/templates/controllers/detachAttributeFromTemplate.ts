import { supabaseClient } from '../../_shared/supabaseClient.ts'

export const detachAttributeFromTemplate = async (authHeader, attributeId, templateId) => {
  const supabase = supabaseClient(authHeader)
  return await supabase
    .from('document_attributes')
    .delete()
    .match({ id: attributeId, template_id: templateId })
}
