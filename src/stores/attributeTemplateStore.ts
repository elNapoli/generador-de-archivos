import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import { type DocumentAttributeDto, DocumentAttributeInitializer } from '~/models/dto/DocumentAttributeDto'

const initialState = () => ({
  currentAttribute: DocumentAttributeInitializer.initState(),
})

export const useAttributeTemplateStore = defineStore('attributeTemplateStore', {
  state: initialState,
  getters: {},
  actions: {
    async assignAttributesToTemplate(templateId, attributes: DocumentAttributeDto[]) {
      const { $templateService } = useNuxtApp()
      return await $templateService.assignAttributesToTemplate(templateId, attributes)
    },

    setCurrentAttribute(attribute: DocumentAttributeDto) {
      this.currentAttribute.data = attribute
    },

    async updateAttribute() {
      const { $templateService } = useNuxtApp()
      this.currentAttribute = await $templateService.updateAttribute(this.currentAttribute.data)
    },
    async deleteAttribute(attribute: DocumentAttributeDto) {
      const { $templateService } = useNuxtApp()
      if (attribute.id) {
        await $templateService.removeAttributesFromTemplate(attribute.id)
      }
      this.resetCurrentAttribute()
      return attribute.name
    },
    resetCurrentAttribute() {
      this.currentAttribute = DocumentAttributeInitializer.initState()
    },

  },
})
