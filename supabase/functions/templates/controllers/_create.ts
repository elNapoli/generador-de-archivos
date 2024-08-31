import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { convertToUpperAndUnderscore } from '../../_shared/convertToUpperAndUnderscore.ts'

export const _create = async (authHeader, data) => {
  const supabase = supabaseClient(authHeader)
  const result = await supabase
    .from('document_templates')
    .insert({
      name: data.name,
      description: data.description,
    })
    .select()
    .single()

  for (const attribute of data.attributes) {
    await supabase
      .from('document_attributes')
      .insert({
        template_id: result.data.id,
        code_name: convertToUpperAndUnderscore(attribute.name),
        name: attribute.name,
        required: attribute.required,
        type: attribute.type,
      })
  }
  return result
}
