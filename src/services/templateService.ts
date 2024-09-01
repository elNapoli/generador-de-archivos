import type { SupabaseClient } from '@supabase/supabase-js'
import type { Template } from '~/models/dto/Template'
import type { TemplateAttribute } from '~/models/dto/TemplateAttribute'
import type { Database } from '~/types/database.types'

class TemplateService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useSupabaseClient<Database>()
  }

  async savePdfContent(tempalteId: number, jsonObject: JSON) {
    return this.supabase
      .from('document_templates')
      .update({
        content: jsonObject,
      })
      .eq('id', tempalteId)
  }

  async transformDocxToHtmlAndSaveIntoTable(file: number, templateId: number) {
    const formData = new FormData()
    formData.append('file', file)
    const response = await this.supabase.functions.invoke(
      `templates/${templateId}/transform-doc-to-html`,
      {
        method: 'POST',
        body: formData,
      },
    )
    return JSON.parse(response.data)
  }

  async fetchMyTemplates() {
    const response = await this.supabase.functions.invoke(
      'templates',
      { method: 'GET' },
    )
    return JSON.parse(response.data)
  }

  async getTemplate(id: string) {
    const response = await this.supabase.functions.invoke(
      `templates/${id}`,
      { method: 'GET' },
    )
    return JSON.parse(response.data)
  }

  async deleteTemplate(id: number) {
    const response = await this.supabase.functions.invoke(
      `templates/${id}`,
      {
        method: 'DELETE',
      })
    return JSON.parse(response.data)
  }

  async detachAttributeFromTemplate(attributeId: number, templateId: number) {
    const response = await this.supabase.functions.invoke(
      `templates/${templateId}/attributes/${attributeId}`,
      {
        method: 'DELETE',
      })
    return JSON.parse(response.data)
  }

  async updateTemplate(template: Template) {
    return await this.supabase.functions.invoke(
      `templates/${template.id}`,
      {
        body: JSON.stringify({ name: template.name, description: template.description }),
        method: 'PATCH',
      })
  }

  async attachAttributeToTemplate(templateId: number, attribute: TemplateAttribute) {
    const response = await this.supabase.functions.invoke(
      `templates/${templateId}/attributes`,
      {
        body: JSON.stringify(attribute),
        method: 'POST',
      })
    return JSON.parse(response.data)
  }

  async createTemplate(template: Template) {
    const response = await this.supabase.functions.invoke(
      'templates',
      {
        body: JSON.stringify({
          name: template.name,
          description: template.description,
          attributes: template.document_attributes,
        }),
        method: 'POST',
      },
    )
    return JSON.parse(response.data)
  }
}

export default TemplateService
