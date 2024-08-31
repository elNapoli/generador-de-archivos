import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

class DocumentService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useSupabaseClient<Database>()
  }

  async fetchMyDocuments() {
    const response = await this.supabase.functions.invoke(
      'documents',
      { method: 'GET' },
    )
    return JSON.parse(response.data)
  }

  async getPublicUrl(documentId) {
    const response = await this.supabase.functions.invoke(
      `documents/${documentId}/pdf-url`,
      {
        method: 'GET',
      },
    )
    return JSON.parse(response.data)
  }

  async generatePdf(documentId) {
    const response = await this.supabase.functions.invoke(
      `documents/${documentId}/generate-pdf`,
      {
        method: 'POST',
      },
    )
    return JSON.parse(response.data)
  }

  async deleteDocument(documentId) {
    const response = await this.supabase.functions.invoke(
      `documents/${documentId}`,
      {
        method: 'DELETE',
      })
    return JSON.parse(response.data)
  }

  async updateDocument(id: string, templateId: number, attributesValue: string) {
    return await this.supabase.functions.invoke(
      `documents/${id}`,
      {
        body: JSON.stringify({ templateId: templateId, attributesValue: attributesValue }),
        method: 'PATCH',
      })
  }

  async createDocument(name: string, templateId: number, attributesValue: string) {
    return await this.supabase.functions.invoke(
      'documents',
      {
        body: JSON.stringify({ name: name, templateId: templateId, attributesValue: attributesValue }),
        method: 'POST',
      },
    )
  }
}

export default DocumentService
