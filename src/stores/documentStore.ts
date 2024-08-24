import { defineStore } from 'pinia'
import type { DocumentAttribute } from '../types/DocumentAttribute'
import type { OperationResult } from '../utils/handleAsyncOperation'
import { handleAsyncOperation } from '../utils/handleAsyncOperation'
import { useNuxtApp } from '#app'

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    templates: [],
    loading: false,
    operationCreateResult: {
      success: false,
      data: false,
      message: '',
    } as unknown as OperationResult<boolean> | null,
    operationDeleteResult: {
      success: false,
      data: false,
      message: '',
    } as unknown as OperationResult<boolean> | null,
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
      this.operationCreateResult = await handleAsyncOperation(
        () => $documentService.saveOrUpdateTemplate(this.currentTemplate),
        loading => this.loading = loading,
        error => this.operationCreateResult = { success: false, data: false, message: error },
        message => this.operationCreateResult = { success: true, data: true, message: message },
      )
      return this.operationResult
    },
    async fetchMyTemplates() {
      const { $documentService } = useNuxtApp()
      this.operationResult = await handleAsyncOperation(
        async () => {
          const data = await $documentService.fetchMyTemplates()
          this.templates = data.data
          return data
        },
        loading => this.loading = loading,
        error => this.operationResult = { success: false, data: null, message: error },
        message => this.operationResult = { success: true, data: null, message: message },
      )
      return this.operationResult
    },
    async deleteTemplate() {
      const { $documentService } = useNuxtApp()
      this.operationDeleteResult = await handleAsyncOperation(
        () => $documentService.deleteTemplate(this.currentTemplate.id),
        loading => this.loading = loading,
        error => this.operationDeleteResult = { success: false, data: null, message: error },
        (message) => {
          this.operationDeleteResult = { success: true, data: null, message: message }
          this.templates = this.templates.filter(t => t.id !== this.currentTemplate.id)
        },
      )
      return this.operationResult
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
    resetOperationCreateResult() {
      this.operationCreateResult = {
        success: false,
        data: false,
        message: '',
      } as unknown as OperationResult<boolean>
    },
  },
})
