import { defineStore } from 'pinia'
import type { DocumentAttribute } from '../types/DocumentAttribute'
import type { apiResponse } from '../utils/handleAsyncOperation'
import { handleAsyncOperation } from '../utils/handleAsyncOperation'
import { useNuxtApp } from '#app'

export const useTemplateStore = defineStore('templateStore', {
  state: () => ({
    templates: [],
    loading: false,
    apiResponse: {
      success: false,
      data: false,
      message: '',
    } as unknown as apiResponse<boolean> | null,
    currentTemplate: {
      name: null,
      id: null,
      document_attributes: [],
    },
    currentAttribute: {},
  }),
  actions: {
    async saveOrUpdateTemplate() {
      const { $templateService } = useNuxtApp()
      this.apiResponse = await handleAsyncOperation(
        () => $templateService.saveOrUpdateTemplate(this.currentTemplate),
        loading => this.loading = loading,
        error => this.apiResponse = { success: false, data: false, message: error },
        message => this.apiResponse = { success: true, data: true, message: message },
      )
      return this.apiResponse
    },
    async savePdfContent() {
      const { $templateService } = useNuxtApp()
      this.apiResponse = await handleAsyncOperation(
        () => $templateService.savePdfContent(this.currentTemplate.id, this.currentTemplate.content),
        loading => this.loading = loading,
        error => this.apiResponse = { success: false, data: false, message: error },
        message => this.apiResponse = { success: true, data: true, message: message },
      )
      return this.apiResponse
    },
    async fetchMyTemplates() {
      const { $templateService } = useNuxtApp()
      return await handleAsyncOperation(
        async () => {
          const data = await $templateService.fetchMyTemplates()
          this.templates = data.data
          return data
        },
        loading => this.loading = loading,
        (_) => {},
        (_) => {},
      )
    },
    async deleteTemplate() {
      const { $templateService } = useNuxtApp()
      return await handleAsyncOperation(
        () => $templateService.deleteTemplate(this.currentTemplate.id),
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
    setCurrentTemplateById(templateId: number) {
      this.currentTemplate = this.templates.find(t => t.id === templateId)
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
        name: null,
        id: null,
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
