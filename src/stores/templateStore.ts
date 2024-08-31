import { defineStore } from 'pinia'
import { TemplateInitializer } from '~/models/dto/Template'
import type { TemplateAttribute } from '~/models/dto/TemplateAttribute'
import { TemplateAttributeInitializer } from '~/models/dto/TemplateAttribute'
import TemplateService from '~/services/templateService'
import { handleAsyncAction } from '~/utils/asyncHelpers'

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
    async savePdfContent() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new TemplateService()
          await service.savePdfContent(this.currentTemplate.id, this.currentTemplate.content)
        },
      )
    },
    async attachAttributesFromTemplate(attribute: DocumentAttribute) {
      this.currentTemplate.document_attributes.push(attribute)
      this.resetCurrentAttribute()
    },
    async detachAttributesFromTemplate() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new TemplateService()
          if (this.currentAttribute.id) {
            await service.detachAttributeFromTemplate(this.currentAttribute.id, this.currentTemplate.id)
          }
          this.currentTemplate.document_attributes = this.currentTemplate.document_attributes.filter(
            attr => attr.name !== this.currentAttribute.name,
          )
        },
        () => {
          this.resetCurrentAttribute()
        },
      )
    },
    async attachAttributeToTemplate() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new TemplateService()
          return await service.attachAttributeToTemplate(this.currentTemplate.id, this.currentAttribute)
        },
        async (_) => {
          this.resetCurrentAttribute()
          await this.getTemplate(this.currentTemplate.id)
        },
      )
    },
    async createTemplate() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new TemplateService()
          return await service.createTemplate(this.currentTemplate)
        },
      )
    },
    async updateTemplate() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new TemplateService()
          return await service.updateTemplate(this.currentTemplate)
        },
      )
    },
    async fetchMyTemplates() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new TemplateService()
          return await service.fetchMyTemplates()
        },
        (response) => {
          this.templates = response.data
        },
      )
    },
    async getTemplate(id: string) {
      await handleAsyncAction(
        this,
        async () => {
          const service = new TemplateService()
          return await service.getTemplate(id)
        },
        (response) => {
          this.currentTemplate = response.data
        },
      )
    },
    async deleteTemplate() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new TemplateService()
          return await service.deleteTemplate(this.currentTemplate.id)
        },
        async (_) => {
          if (!this.error) {
            await this.fetchMyTemplates()
          }
        },
      )
    },
    setCurrentAttribute(attribute: TemplateAttribute) {
      this.currentAttribute = attribute
    },
    resetCurrentAttribute() {
      this.currentAttribute = TemplateAttributeInitializer.initState()
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
