import { defineStore } from 'pinia'
import { BaseInitializer } from '~/models/dto/BaseResponse'
import { DocumentInitializer } from '~/models/dto/Document'
import DocumentService from '~/services/documentService'

const initialState = () => ({
  documents: BaseInitializer.initState([]),
  currentDocument: BaseInitializer.initState(DocumentInitializer.initState()),
  publicUrl: null,
})

export const useDocumentStore = defineStore('documentStore', {
  state: initialState,
  getters: {
    editMode: state => state.currentDocument.data.id != null,
  },
  actions: {
    setCurrentDocument(item) {
      this.currentDocument = BaseInitializer.initState(item)
    },
    resetAttributesValue() {
      this.currentDocument.data.attributes = BaseInitializer.initState({})
    },
    async createDocument(templateId) {
      const service = new DocumentService()
      const attributesValueJson = JSON.stringify(this.currentDocument.data.attributes)
      this.currentDocument = await service.createDocument(this.currentDocument.data.name, templateId, attributesValueJson)
    },
    async getPublicUrl(path) {
      const service = new DocumentService()
      this.publicUrl = await service.getPublicUrl(path)
    },
    async updateDocument(templateId) {
      const service = new DocumentService()
      const attributesValueJson = JSON.stringify(this.currentDocument.data.attributes)
      this.currentDocument = await service.updateDocument(this.currentDocument.data.id, templateId, attributesValueJson)
    },
    async fetchMyDocuments() {
      const service = new DocumentService()
      const response = await service.fetchMyDocuments()
      console.log(response.data)
      this.documents = {
        ...response,
        data: response.data.map(item => ({
          ...item,
          attributes: JSON.parse(item.attributes),
        })),
      }
    },
    async generatePdf(documentId) {
      const service = new DocumentService()
      const response = await service.generatePdf(documentId)
      console.log(response)
      await this.fetchMyDocuments()
    },
    async deleteDocument() {
      const service = new DocumentService()
      this.currentDocument = await service.deleteDocument(this.currentDocument.data.id)
      await this.fetchMyDocuments()
    },
  },
})
