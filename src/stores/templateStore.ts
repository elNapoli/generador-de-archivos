import { defineStore } from 'pinia'
import type { DocumentAttribute } from '../types/DocumentAttribute'
import { useNuxtApp } from '#app'

export const useTemplateStore = defineStore('templateStore', {
  state: () => ({
    templates: [],
    currentTemplate: {
      name: null,
      id: null,
      document_attributes: [],
    },
    currentAttribute: {},
  }),
  actions: {

    async createTemplate() {
      const { $templateService } = useNuxtApp()
      const feedbackStore = useFeedbackStore()
      feedbackStore.setLoading()
      try {
         await $templateService.saveOrUpdateTemplate(this.currentTemplate)
         feedbackStore.setSuccess("Se guardó el template exitosamente")
      }
      catch (e) {
        feedbackStore.setError(e)
      }
    },
    async savePdfContent() {
      const { $templateService } = useNuxtApp()
      const feedbackStore = useFeedbackStore()
      feedbackStore.setLoading()
      try {
         await $templateService.savePdfContent(this.currentTemplate.id, this.currentTemplate.content)
         feedbackStore.setSuccess("Se guardó el contenido del pdf exitosamente")
      }
      catch (e) {
        feedbackStore.setError(e)
      }
    },
    async createOrUpdateTemplate() {
      const { $templateService } = useNuxtApp()
      const feedbackStore = useFeedbackStore()
      feedbackStore.setLoading()
      try {
         await $templateService.saveOrUpdateTemplate(this.currentTemplate)
         feedbackStore.setSuccess("Se guardó el contenido del pdf exitosamente")
      }
      catch (e) {
        feedbackStore.setError(e)
      }
    },
    async fetchMyTemplates() {
      const { $templateService } = useNuxtApp()
      const feedbackStore = useFeedbackStore()
      feedbackStore.setLoading()
      try {
        await $templateService.fetchMyTemplates()
         feedbackStore.setSuccess("Se guardó el contenido del pdf exitosamente")
      }
      catch (e) {
        feedbackStore.setError(e)
      }
    },
    async deleteTemplate() {
      const { $templateService } = useNuxtApp()
      const feedbackStore = useFeedbackStore()
      feedbackStore.setLoading()
      try {
        await $templateService.deleteTemplate(this.currentTemplate.id)
         feedbackStore.setSuccess("Se guardó el contenido del pdf exitosamente")
      }
      catch (e) {
        feedbackStore.setError(e)
      }
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
  },
})
