import { defineStore } from 'pinia'
import type { DocumentAttribute } from '../types/DocumentAttribute'
import type { apiResponse } from '../utils/handleAsyncOperation'
import { handleAsyncOperation } from '../utils/handleAsyncOperation'
import { useNuxtApp } from '#app'

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    templates: [],
    loading: false,
    apiResponse: {
      success: false,
      data: false,
      message: '',
    } as unknown as apiResponse<boolean> | null,
    currentTemplate: {
      name: '',
      description: '',
      document_attributes: [],
    },
    currentAttribute: {
      name: null,
      type: null,
      required: false,
    } as unknown as DocumentAttribute,
  }),
  actions: {
    async saveOrUpdateTemplate() {
      const { $documentService } = useNuxtApp()
      this.apiResponse = await handleAsyncOperation(
        () => $documentService.saveOrUpdateTemplate(this.currentTemplate),
        loading => this.loading = loading,
        error => this.apiResponse = { success: false, data: false, message: error },
        message => this.apiResponse = { success: true, data: true, message: message },
      )
      return this.apiResponse
    },
    async savePdfContent(jsonObject: JSON) {
      const { $documentService } = useNuxtApp()
      this.apiResponse = await handleAsyncOperation(
        () => $documentService.savePdfContent(this.currentTemplate.id, jsonObject),
        loading => this.loading = loading,
        error => this.apiResponse = { success: false, data: false, message: error },
        message => this.apiResponse = { success: true, data: true, message: message },
      )
      return this.apiResponse
    },
    async fetchMyTemplates() {
      const { $documentService } = useNuxtApp()
      return await handleAsyncOperation(
        async () => {
          const data = await $documentService.fetchMyTemplates()
          this.templates = data.data
          return data
        },
        loading => this.loading = loading,
        (_) => {},
        (_) => {},
      )
    },
    async deleteTemplate() {
      const { $documentService } = useNuxtApp()
      return await handleAsyncOperation(
        () => $documentService.deleteTemplate(this.currentTemplate.id),
        loading => this.loading = loading,
        (_) => {},
        (_) => {
          this.templates = this.templates.filter(t => t.id !== this.currentTemplate.id)
        },
      )
    },
    createOrEditAttribute(attribute: DocumentAttribute) {
      const index = this.currentTemplate.document_attributes.findIndex(attr => attr.name === attribute.name)

      if (index !== -1) {
        this.currentTemplate.document_attributes[index] = attribute
      }
      else {
        this.currentTemplate.document_attributes.push(attribute)
      }
      this.resetCurrentAttribute()
    },
    setCurrentAttribute(attribuete: DocumentAttribute) {
      this.currentAttribute = attribuete
    },
    setCurrentTemplate(template: object) {
      this.currentTemplate = template
    },
    deleteAttribute() {
      this.currentTemplate.document_attributes = this.currentTemplate.document_attributes.filter(attr => attr.name !== this.currentAttribute.name)
      this.resetCurrentAttribute()
    },
    resetCurrentAttribute() {
      this.currentAttribute = {
        name: null,
        type: null,
        required: false,
      } as unknown as DocumentAttribute
    },
    resetCurrentTemplate() {
      this.currentTemplate = {
        name: '',
        description: '',
        document_attributes: [],
      }
    },
    resetapiResponse() {
      this.apiResponse = {
        success: false,
        data: false,
        message: '',
      } as unknown as apiResponse<boolean>
    },
  },
})
