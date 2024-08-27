import { defineStore } from 'pinia'
import type { DocumentAttribute } from '../types/DocumentAttribute'
import { useNuxtApp } from '#app'
import type BaseDto from '~/models/dto/BaseDto'
import type { TemplateDto } from '~/models/dto/TemplateDto'

const initialTemplate = {
  data: {
    id: null,
    name: '',
    description: '',
    document_attributes: [],
  },
}
const initialDocumentAttribute = {
  data: {
    name: '',
    required: 'false',
    type: 'String',
  },
}
const initialState = () => ({
  templates: [] as BaseDto<TemplateDto>,
  currentTemplate: initialTemplate as BaseDto<TemplateDto>,
  currentAttribute: initialDocumentAttribute as DocumentAttribute,
})

export const useTemplateStore = defineStore('templateStore', {
  state: initialState,
  actions: {

    async savePdfContent() {
      const { $templateService } = useNuxtApp()
      await $templateService.savePdfContent(this.currentTemplate.data.id, this.currentTemplate.data.content)
    },
    async createOrUpdateTemplate() {
      const { $templateService } = useNuxtApp()
      console.log(this.currentTemplate.data)
      const response = await $templateService.createTemplate(this.currentTemplate.data)
      console.log(response)
      this.currentTemplate = {
        ...response,
        data: response.data ?? initialTemplate,
      }
    },
    async fetchMyTemplates() {
      const { $templateService } = useNuxtApp()
      this.templates = await $templateService.fetchMyTemplates()
    },
    async deleteTemplate() {
      const { $templateService } = useNuxtApp()
      const response = await $templateService.deleteTemplate(this.currentTemplate.data.id)
      this.currentTemplate = {
        ...response,
        data: response.data ?? initialTemplate,
      }
      this.templates.data = this.templates.data.filter(t => t.id !== this.currentTemplate.id)
    },
    createOrEditAttribute(attribute: DocumentAttribute) {
      const index = this.currentTemplate.data.document_attributes.findIndex(attr => attr.name === attribute.name)

      if (index !== -1) {
        this.currentTemplate.data.document_attributes[index] = attribute
      }
      else {
        this.currentTemplate.data.document_attributes.push(attribute)
      }
      this.resetCurrentAttribute()
    },
    setCurrentAttribute(attribute: DocumentAttribute) {
      this.currentAttribute.data = attribute
    },
    setCurrentTemplate(template: object) {
      this.currentTemplate.data = template
    },
    setCurrentAttribute(attribute: object) {
      this.currentAttribute.data = attribute
    },
    setCurrentTemplateById(templateId: number) {
      this.currentTemplate.data = this.templates.find(t => t.id === templateId)
    },
    deleteAttribute() {
      console.log('hola')
      this.currentTemplate.data.document_attributes = this.currentTemplate.data.document_attributes.filter(attr => attr.name !== this.currentAttribute.data.name)
      this.resetCurrentAttribute()
    },
    resetCurrentAttribute() {
      this.currentAttribute = initialDocumentAttribute
    },
    resetCurrentTemplate() {
      this.currentTemplate = initialTemplate
    },
  },
})
