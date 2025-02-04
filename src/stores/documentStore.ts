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

    async createDocument(templateId) {
      await handleAsyncAction(
        this,
        async () => {
          const service = new DocumentService()
          return await service.createDocument(this.currentDocument.name, templateId, this.currentDocument.attributes)
        },
        (response) => {
          this.resetCurrentDocument()
        },
      )
    },
    async getPublicUrl(docId) {
      const service = new DocumentService()
      return await service.getPublicUrl(docId)
    },
    async updateDocument(templateId) {
      await handleAsyncAction(
        this,
        async () => {
          const service = new DocumentService()
          return await service.updateDocument(this.currentDocument.id, templateId, this.currentDocument.attributes)
        },
        (response) => {
          this.currentDocument = response.data
        },
      )
    },
    async fetchMyDocuments() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new DocumentService()
          return await service.fetchMyDocuments()
        },
        (response) => {
          this.documents = response.data
        },
      )
    },
    async generatePdf(documentId) {
      await handleAsyncAction(
        this,
        async () => {
          const service = new DocumentService()
          await service.generatePdf(documentId)
          await this.fetchMyDocuments()
        },
      )
    },
    async deleteDocument() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new DocumentService()
          return await service.deleteDocument(this.currentDocument.id)
        },
        async () => {
          await this.fetchMyDocuments()
          await this.resetCurrentDocument()
        },
      )
    },
    setCurrentDocument(item) {
      this.currentDocument = item
    },
    resetCurrentDocument() {
      this.currentDocument = DocumentInitializer.initState()
    },
    resetAttributesValue() {
      this.currentDocument.attributes = {}
    },
  },
})
