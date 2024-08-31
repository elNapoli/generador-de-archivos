import { defineStore } from 'pinia'
import { DocumentInitializer } from '~/models/dto/Document'
import DocumentService from '~/services/documentService'

const initialState = () => ({
  documents: [],
  currentDocument: DocumentInitializer.initState(),
  loading: false,
  status: 0,
  error: null,
})

export const useDocumentStore = defineStore('documentStore', {
  state: initialState,
  getters: {
    editMode: state => state.currentDocument.id != null,
  },
  actions: {
    setCurrentDocument(item) {
      this.currentDocument = item
    },
    resetAttributesValue() {
      this.currentDocument.attributes = {}
    },
    async createDocument(templateId) {
      this.loading = true
      const service = new DocumentService()
      const attributesValueJson = JSON.stringify(this.currentDocument.attributes)
      const response = await service.createDocument(this.currentDocument.name, templateId, attributesValueJson)
      this.error = response.error
      this.status = response.status
      this.currentDocument = response.data
      this.loading = false
    },
    async getPublicUrl(docId) {
      const service = new DocumentService()
      return await service.getPublicUrl(docId)
    },
    async updateDocument(templateId) {
      const service = new DocumentService()
      const attributesValueJson = JSON.stringify(this.currentDocument.attributes)
      this.currentDocument = await service.updateDocument(this.currentDocument.id, templateId, attributesValueJson)
    },
    async fetchMyDocuments() {
      this.loading = true
      const service = new DocumentService()
      const response = await service.fetchMyDocuments()
      this.documents = response.data
      this.error = response.error
      this.status = response.status
      this.loading = false
    },
    async generatePdf(documentId) {
      const service = new DocumentService()
      await service.generatePdf(documentId)
      await this.fetchMyDocuments()
    },
    async deleteDocument() {
      const service = new DocumentService()
      this.currentDocument = await service.deleteDocument(this.currentDocument.id)
      await this.fetchMyDocuments()
    },
  },
})
