import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import { type TemplateAttributeDto, TemplateAttributeInitializer } from '~/models/dto/TemplateAttributeDto'

const initialState = () => ({
  currentAttribute: TemplateAttributeInitializer.initState(),
})

export const useAttributeTemplateStore = defineStore('attributeTemplateStore', {
  state: initialState,
  getters: {},
  actions: {
    async assignAttributesToTemplate(templateId, attributes: TemplateAttributeDto[]) {
      const { $templateService } = useNuxtApp()
      return await $templateService.assignAttributesToTemplate(templateId, attributes)
    },

    setCurrentAttribute(attribute: TemplateAttributeDto) {
      this.currentAttribute.data = attribute
    },

    async updateAttribute() {
      const { $templateService } = useNuxtApp()
      this.currentAttribute = await $templateService.updateAttribute(this.currentAttribute.data)
    },
    async deleteAttribute(attribute: TemplateAttributeDto) {
      const { $templateService } = useNuxtApp()
      if (attribute.id) {
        await $templateService.removeAttributesFromTemplate(attribute.id)
      }
      this.resetCurrentAttribute()
      return attribute.name
    },
    resetCurrentAttribute() {
      this.currentAttribute = TemplateAttributeInitializer.initState()
    },

  },
})
