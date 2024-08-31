import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { convertToUpperAndUnderscore } from '../../_shared/convertToUpperAndUnderscore.ts'

export const attachAttributeToTemplate = async (authHeader, templateId, data) => {
  const supabase = supabaseClient(authHeader)
  if (data.id) {
    return await supabase
      .from('document_attributes')
      .update({
        template_id: templateId,
        code_name: convertToUpperAndUnderscore(data.name),
        name: data.name,
        required: data.required,
        type: data.type,
      }).match({ id: data.id, template_id: templateId })
      .select()
      .single()
  }
  else {
    return await supabase
      .from('document_attributes')
      .insert({
        template_id: templateId,
        code_name: convertToUpperAndUnderscore(data.name),
        name: data.name,
        required: data.required,
        type: data.type,
      }).select().single()
  }
}
