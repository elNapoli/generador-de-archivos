import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

class DocumentService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useSupabaseClient<Database>()
  }

  async fetchMyDocuments() {
    const response = await this.supabase.functions.invoke('document', { method: 'GET' })
    return JSON.parse(response.data)
  }

  async getPublicUrl(path) {
    const { data } = this.supabase
      .storage
      .from('documents')
      .getPublicUrl(path)

    return data
  }

  async generatePdf(documentId) {
    const { data, error } = await this.supabase.functions.invoke('generate-document', {
      body: JSON.stringify({ documentId: documentId }),
    })
    return data
  }

  async deleteDocument(documentId) {
    const response = await this.supabase.functions.invoke(
      `document/${documentId}`,
      {
        method: 'DELETE',
      })
    return JSON.parse(response.data)
  }

  async updateDocument(id: string, templateId: number, attributesValue: string) {
    console.log('adsfadfasdf')
    return await this.supabase.functions.invoke(`document/${id}`, {
      body: JSON.stringify({ templateId: templateId, attributesValue: attributesValue }),
      method: 'PATCH',
    })
  }

  async createDocument(name: string, templateId: number, attributesValue: string) {
    return await this.supabase.functions.invoke('document', {
      body: JSON.stringify({ name: name, templateId: templateId, attributesValue: attributesValue }),
      method: 'POST',
    })
  }
}

export default DocumentService
