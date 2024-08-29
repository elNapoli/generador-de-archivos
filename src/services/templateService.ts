import type { SupabaseClient } from '@supabase/supabase-js'
import { type Template, TemplateInitializer } from '~/models/dto/Template'
import type BaseResponse from '~/models/dto/BaseResponse'
import { type TemplateAttribute, TemplateAttributeInitializer } from '~/models/dto/TemplateAttribute'

class TemplateService {
  private supabase: SupabaseClient

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase
  }

  // Utilidad para convertir a mayúsculas y reemplazar espacios por guiones bajos
  private convertToUpperAndUnderscore(input: string): string {
    return input.toUpperCase().replace(/\s+/g, '_')
  }

  async savePdfContent(tempalteId: number, jsonObject: JSON) {
    return this.supabase
      .from('document_templates')
      .update({
        content: jsonObject,
      })
      .eq('id', tempalteId)
  }

  async fetchMyTemplates() {
    const query = this.supabase
      .from('document_templates')
      .select(`
          id,
          name,
          description,
          document_attributes(id, name, type, required, code_name),
          content
        `)
    return safeApi(query, TemplateInitializer.initState())
  }

  // Eliminar una plantilla por ID
  async deleteTemplate(id: number) {
    const query = this.supabase
      .from('document_templates')
      .delete()
      .eq('id', id)
    return safeApi(query, TemplateInitializer.initState())
  }

  async removeAttributesFromTemplate(id: number) {
    const query = this.supabase
      .from('document_attributes')
      .delete()
      .eq('id', id)
    return safeApi(query, TemplateAttributeInitializer.initState())
  }

  async updateAttribute(attribute: TemplateAttribute) {
    const query = this.supabase
      .from('document_attributes')
      .update({
        name: attribute.name,
        required: attribute.required,
        type: attribute.type,
      })
      .eq('id', attribute.id)

    return safeApi(query, TemplateAttributeInitializer.initState())
  }

  async updateTemplate(template: Template) {
    const query = this.supabase
      .from('document_templates')
      .update({
        name: template.name,
        description: template.description,
      })
      .eq('id', template.id)
      .select()
      .single()
    return safeApi(query, TemplateInitializer.initState())
  }

  async createTemplate(template: Template) {
    const query = this.supabase
      .from('document_templates')
      .insert({
        name: template.name,
        description: template.description,
      })
      .select()
      .single()
    return safeApi(query, TemplateInitializer.initState())
  }

  async assignAttributesToTemplate(templateId, attributes): Promise<BaseResponse<TemplateAttribute>> {
    let result = null
    for (const attribute of attributes) {
      const { id, ...attributeWithoutId } = attribute
      const query = this.supabase
        .from('document_attributes')
        .insert({
          template_id: templateId,
          code_name: this.convertToUpperAndUnderscore(attribute.name),
          ...attributeWithoutId,
        })

      result = await safeApi(query, TemplateInitializer.initState())

      if (result.error) {
        console.error(`Error al asignar atributo ${attribute.name}:`, result.error)
        return result
      }
    }
    return result
  }

  // Obtener los atributos actuales de la plantilla
  private async fetchCurrentAttributes(templateId: number): Promise<DocumentAttribute[] | undefined> {
    const { data, error } = await this.supabase
      .from('document_attributes')
      .select('id, name, code_name')
      .eq('template_id', templateId)

    if (error) {
      console.error('Error al obtener los atributos actuales:', error)
      return
    }

    return data
  }

  // Eliminar atributos que ya no están presentes en la nueva plantilla
  private async deleteRemovedAttributes(
    currentAttributes: DocumentAttribute[],
    template: Template,
  ) {
    const newAttributeNames = new Set(template.document_attributes.map(attr => attr.name))
    const attributesToDelete = currentAttributes.filter(attr => !newAttributeNames.has(attr.name))

    if (attributesToDelete.length > 0) {
      const attributeIdsToDelete = attributesToDelete.map(attr => attr.id)
      const { error } = await this.supabase
        .from('document_attributes')
        .delete()
        .in('id', attributeIdsToDelete)

      if (error) {
        console.error('Error al eliminar los atributos:', error)
      }
    }
  }

  // Insertar o actualizar los atributos restantes
  private async upsertAttributes(templateId: number, attributes: DocumentAttribute[]) {
    for (const attribute of attributes) {
      const response = await this.supabase
        .from('document_attributes')
        .upsert({
          template_id: templateId,
          code_name: this.convertToUpperAndUnderscore(attribute.name),
          ...attribute,
        }, { onConflict: ['template_id', 'code_name'] })

      return response
      if (reponse.error) {
        console.error('Error al insertar o actualizar un atributo:', error)
        return
      }
    }
  }
}

export default TemplateService
