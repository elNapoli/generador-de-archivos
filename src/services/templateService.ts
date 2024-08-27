import type { SupabaseClient } from '@supabase/supabase-js'
import type BaseDto from '~/models/dto/BaseDto'
import type { TemplateDto } from '~/models/dto/TemplateDto'

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
    const response: BaseDto<TemplateDto[]> = await this.supabase
      .from('document_templates')
      .select(`
          id,
          name,
          description,
          document_attributes(id, name, type, required, code_name),
          content
        `)
    const data: BaseDto<TemplateDto[]> = {
      ...response,
      data: response.data ?? [],
    }
    return data
  }

  // Eliminar una plantilla por ID
  async deleteTemplate(id: number) {
    return this.supabase
      .from('document_templates')
      .delete()
      .eq('id', id)
  }

  async createTemplate(template: Template) {
    const document_id = await this.saveOrUpdateTemplateRecord(template)
    if (!document_id) return

    const currentAttributes = await this.fetchCurrentAttributes(document_id)
    if (!currentAttributes) return

    await this.deleteRemovedAttributes(currentAttributes, template)
    return await this.upsertAttributes(document_id, template.document_attributes)
  }

  // Guardar o actualizar el registro de la plantilla
  private async saveOrUpdateTemplateRecord(template: Template): Promise<number | undefined> {
    let document_id = template.id

    if (document_id) {
      // Actualizar plantilla existente
      const { error } = await this.supabase
        .from('document_templates')
        .update({
          name: template.name,
          description: template.description,
        })
        .eq('id', document_id)

      if (error) {
        console.error('Error al actualizar la plantilla:', error)
        return
      }
    }
    else {
      // Crear nueva plantilla
      const { data, error } = await this.supabase
        .from('document_templates')
        .insert({
          name: template.name,
          description: template.description,
        })
        .select()

      if (error) {
        console.error('Error al crear la plantilla:', error)
        return
      }

      document_id = data[0].id
    }

    return document_id
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
