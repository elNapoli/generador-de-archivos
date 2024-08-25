import type { SupabaseClient } from '@supabase/supabase-js'

class DocumentService {
  private supabase: SupabaseClient

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase
  }

  async fetchMyDocuments() {
    try {
      // Crear nueva plantilla
      const { data, error } = await this.supabase
        .from('user_documents')
        .select('template_id, status_id, name, id, generated_at, attributes, document_templates(content)')
      if (error) {
        throw error
      }
      console.log(data)
      return data
    }
    catch (error) {
      console.error('Error al iniciar sesión:', error.message)
      throw new Error('Error al iniciar sesión')
    }
  }

  async deleteDocument(documentId) {
    try {
      const { error } = await this.supabase
        .from('user_documents')
        .delete()
        .eq('id', documentId)
      if (error) {
        throw error
      }
      return true
    }
    catch (error) {
      console.error('Error al iniciar sesión:', error.message)
      throw new Error('Error al iniciar sesión')
    }
  }

  async saveOrUpdateDocument(name: string, tempalteId: number, attributesValue: string) {
    try {
      const { data, error } = await this.supabase
        .from('user_documents')
        .upsert({
          template_id: tempalteId,
          name: name,
          attributes: attributesValue,
        }, { onConflict: ['template_id', 'name'] })

      if (error) {
        throw error
      }

      return data
    }
    catch (error) {
      console.error('Error al iniciar sesión:', error.message)
      throw new Error('Error al iniciar sesión')
    }
  }
}

export default DocumentService
