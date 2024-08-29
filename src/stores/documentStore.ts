import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import { BaseInitializer } from '~/models/dto/BaseResponse'
import { DocumentInitializer } from '~/models/dto/Document'

const initialState = () => ({
  documents: BaseInitializer.initState([]),
  currentDocument: BaseInitializer.initState(DocumentInitializer.initState()),
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
      const { $documentService } = useNuxtApp()
      const attributesValueJson = JSON.stringify(this.currentDocument.data.attributes)
      this.currentDocument = await $documentService.createDocument(this.currentDocument.data.name, templateId, attributesValueJson)
    },
    async updateDocument(templateId) {
      const { $documentService } = useNuxtApp()
      const attributesValueJson = JSON.stringify(this.currentDocument.data.attributes)
      this.currentDocument = await $documentService.updateDocument(this.currentDocument.data.id, templateId, attributesValueJson)
    },
    async fetchMyDocuments() {
      const { $documentService } = useNuxtApp()
      const response = await $documentService.fetchMyDocuments()
      this.documents = {
        ...response,
        data: response.data.map(item => ({
          ...item,
          attributes: JSON.parse(item.attributes),
        })),
      }
    },
    async generatePdf(documentId) {
      const { $documentService } = useNuxtApp()
      const response = await $documentService.generatePdf(documentId)
      console.log(response)
    },
    async deleteDocument() {
      const { $documentService } = useNuxtApp()
      this.currentDocument = await $documentService.deleteDocument(this.currentDocument.data.id)
      await this.fetchMyDocuments()
    },
  },
})
