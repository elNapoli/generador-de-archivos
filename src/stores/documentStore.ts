// stores/authStore.ts
import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    currentDocument: {
      attributes: {},
    },
    documents: [],

  }),
  actions: {
    setCurrentDocument(item) {
      console.log('item')
      console.log(item)
      this.currentDocument = item
    },
    async saveOrUpdateDocument(templateId) {
      const { $documentService } = useNuxtApp()
      const attributesValueJson = JSON.stringify(this.currentDocument.attributes)

      try {
        return await $documentService.saveOrUpdateDocument(this.currentDocument.name, templateId, attributesValueJson)
      }
      catch (e) {
        return null
      }
    },
    async fetchMyDocuments() {
      const { $documentService } = useNuxtApp()

      try {
        const documents = await $documentService.fetchMyDocuments()
        this.documents = documents.map((doc) => {
          return {
            ...doc,
            attributes: JSON.parse(doc.attributes),
          }
        })
      }
      catch (e) {
        return null
      }
    },
    async deleteDocument() {
      const { $documentService } = useNuxtApp()

      try {
        await $documentService.deleteDocument(this.currentDocument.id)
        this.documents = this.documents.filter(t => t.id !== this.currentDocument.id)
      }
      catch (e) {
        return null
      }
    },
  },
})
