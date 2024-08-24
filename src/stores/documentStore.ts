import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    attributes: [] as DocumentAttribute[],
    currentAttribute: {
      name: null,
      type: null,
      required: false,
    } as DocumentAttribute,
  }),
  actions: {
    addAttribute(name: string, type: string, required: boolean) {
      const newAttribute: DocumentAttribute = {
        name,
        type,
        required,
      }
      this.attributes.push(newAttribute)
    },

    resetCurrentAttribute() {
      this.currentAttribute = {
        name: null,
        type: null,
        required: false,
      } as DocumentAttribute
    },
  },
})
