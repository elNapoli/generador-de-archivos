import type { SupabaseClient } from '@supabase/supabase-js'
import { DocumentInitializer } from '~/models/dto/DocumentDto'

class DocumentService {
  private supabase: SupabaseClient

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase
  }

  async fetchMyDocuments() {
    const query = this.supabase
      .from('user_documents')
      .select('template_id, status_id, name, id, generated_at, attributes, document_templates(content)')
    return safeApi(query, DocumentInitializer.initState())
  }

  async deleteDocument(documentId) {
    const query = await this.supabase
      .from('user_documents')
      .delete()
      .eq('id', documentId)
    return safeApi(query, DocumentInitializer.initState())
  }

  async updateDocument(id: string, templateId: number, attributesValue: string) {
    const query = this.supabase
      .from('user_documents')
      .update({
        template_id: templateId,
        attributes: attributesValue,
      })
      .eq('id', id)

    return safeApi(query, DocumentInitializer.initState())
  }

  async createDocument(name: string, templateId: number, attributesValue: string) {
    const query = this.supabase
      .from('user_documents')
      .insert({
        template_id: templateId,
        name: name,
        attributes: attributesValue,
      })
    return safeApi(query, DocumentInitializer.initState())
  }
}

export default DocumentService
