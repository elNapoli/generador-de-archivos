import { defineStore } from 'pinia'
import { TemplateInitializer } from '~/models/dto/Template'
import { type TemplateAttribute, TemplateAttributeInitializer } from '~/models/dto/TemplateAttribute'
import TemplateService from '~/services/templateService'

const initialState = () => ({
  templates: [],
  currentTemplate: TemplateInitializer.initState(),
  currentAttribute: TemplateAttributeInitializer.initState(),
  loading: false,
  status: 0,
  error: null,
})

export const useTemplateStore = defineStore('templateStore', {
  state: initialState,
  getters: {
    editMode: state => state.currentTemplate.id !== null,
  },
  actions: {
    setCurrentAttribute(attribute: TemplateAttribute) {
      this.currentAttribute = attribute
    },
    async savePdfContent() {
      const service = new TemplateService()
      await service.savePdfContent(this.currentTemplate.id, this.currentTemplate.content)
    },
    async attachAttributesFromTemplate(attribute: DocumentAttribute) {
      this.currentTemplate.document_attributes.push(attribute)
      this.resetCurrentAttribute()
    },

    async detachAttributesFromTemplate() {
      const service = new TemplateService()
      if (this.currentAttribute.id) {
        await service.detachAttributeFromTemplate(this.currentAttribute.id, this.currentTemplate.id)
      }
      this.currentTemplate.document_attributes = this.currentTemplate.document_attributes.filter(
        attr =>
          attr.name !== this.currentAttribute.name,
      )
      this.resetCurrentAttribute()
    },
    async attachAttributeToTemplate() {
      const service = new TemplateService()
      this.loading = true
      const response = await service.attachAttributeToTemplate(this.currentTemplate.id, this.currentAttribute)
      this.error = response.error
      this.status = response.status
      this.resetCurrentAttribute()
      await this.getTemplate(this.currentTemplate.id)
      this.loading = false
    },
    resetCurrentAttribute() {
      this.currentAttribute = TemplateAttributeInitializer.initState()
    },
    async createTemplate() {
      this.loading = true
      const service = new TemplateService()
      const response = await service.createTemplate(this.currentTemplate)
      this.error = response.error
      this.status = response.status
      this.loading = false
    },
    async updateTemplate() {
      this.loading = true
      const service = new TemplateService()
      const response = await service.updateTemplate(this.currentTemplate)
      this.error = response.error
      this.status = response.status
      this.loading = false
    },
    async fetchMyTemplates() {
      this.loading = true
      const service = new TemplateService()
      const response = await service.fetchMyTemplates()
      this.templates = response.data
      this.error = response.error
      this.status = response.status
      this.loading = false
    },

    async getTemplate(id: string) {
      this.loading = true
      const service = new TemplateService()
      const response = await service.getTemplate(id)
      this.currentTemplate = response.data
      this.error = response.error
      this.status = response.status
      this.loading = false
    },
    async deleteTemplate() {
      this.loading = true
      const service = new TemplateService()
      const response = await service.deleteTemplate(this.currentTemplate.id)
      this.loading = false
      this.error = response.error
      if (!this.error) {
        await this.fetchMyTemplates()
      }
    },

    setCurrentTemplate(template: object) {
      this.currentTemplate = template
    },
    setCurrentTemplateById(templateId: number) {
      this.currentTemplate = this.templates.find(t => t.id === templateId)
    },
    resetCurrentTemplate() {
      this.currentTemplate = TemplateInitializer.initState()
    },
    resetFeedback() {
      this.status = 0
      this.error = null
    },
  },
})
