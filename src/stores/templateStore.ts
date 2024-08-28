import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import type BaseDto from '~/models/dto/BaseDto'
import { type TemplateDto, TemplateInitializer } from '~/models/dto/TemplateDto'
import { safeBaseDto } from '~/utils/safeBaseDto'
import { useAttributeTemplateStore } from '~/stores/attributeTemplateStore'
import type { TemplateAttributeDto } from '~/models/dto/TemplateAttributeDto'

const initialState = () => ({
  templates: [] as BaseDto<TemplateDto>,
  currentTemplate: TemplateInitializer.initState(),
})

export const useTemplateStore = defineStore('templateStore', {
  state: initialState,
  getters: {
    editMode: state => state.currentTemplate.data.id !== null,
  },
  actions: {
    async savePdfContent() {
      const { $templateService } = useNuxtApp()
      await $templateService.savePdfContent(this.currentTemplate.data.id, this.currentTemplate.data.content)
    },
    async attachAttributesFromTemplate(attribute: DocumentAttribute) {
      const attributeTemplateStore = useAttributeTemplateStore()
      await this.currentTemplate.data.document_attributes.push(attribute)
      attributeTemplateStore.resetCurrentAttribute()
    },

    async detachAttributesFromTemplate(attribute: TemplateAttributeDto) {
      const attributeTemplateStore = useAttributeTemplateStore()
      await attributeTemplateStore.deleteAttribute(attribute)
      this.currentTemplate.data.document_attributes = this.currentTemplate.data.document_attributes.filter(attr => attr.name !== attribute.name)
    },
    async createTemplate() {
      const { $templateService } = useNuxtApp()
      const attributeTemplateStore = useAttributeTemplateStore()

      const response = await $templateService.createTemplate(this.currentTemplate.data)
      if (response.error) {
        this.currentTemplate = response
        return
      }
      this.currentTemplate = await attributeTemplateStore.assignAttributesToTemplate(response.data.id, this.currentTemplate.data.document_attributes)
    },
    async updateTemplate() {
      const { $templateService } = useNuxtApp()
      this.currentTemplate = await $templateService.updateTemplate(this.currentTemplate.data)
    },
    async fetchMyTemplates() {
      const { $templateService } = useNuxtApp()
      const response = await $templateService.fetchMyTemplates()
      this.templates = safeBaseDto(response, [])
    },
    async deleteTemplate() {
      const { $templateService } = useNuxtApp()
      this.currentTemplate = await $templateService.deleteTemplate(this.currentTemplate.data.id)
      await this.fetchMyTemplates()
    },

    setCurrentTemplate(template: object) {
      this.currentTemplate.data = template
    },
    setCurrentTemplateById(templateId: number) {
      this.currentTemplate.data = this.templates.find(t => t.id === templateId)
    },
    resetCurrentTemplate() {
      this.currentTemplate = TemplateInitializer.initState()
    },
  },
})
