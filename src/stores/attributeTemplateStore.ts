import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import { type TemplateAttribute, TemplateAttributeInitializer } from '~/models/dto/TemplateAttribute'
import { BaseInitializer } from '~/models/dto/BaseResponse'

const initialState = () => ({
  currentAttribute: BaseInitializer.initState(TemplateAttributeInitializer.initState()),
})

export const useAttributeTemplateStore = defineStore('attributeTemplateStore', {
  state: initialState,
  getters: {},
  actions: {
    async assignAttributesToTemplate(templateId, attributes: TemplateAttribute[]) {
      const { $templateService } = useNuxtApp()
      return await $templateService.assignAttributesToTemplate(templateId, attributes)
    },

    setCurrentAttribute(attribute: TemplateAttribute) {
      this.currentAttribute = BaseInitializer.initState(attribute)
    },

    async updateAttribute() {
      const { $templateService } = useNuxtApp()
      this.currentAttribute = await $templateService.updateAttribute(this.currentAttribute.data)
    },
    async deleteAttribute(attribute: TemplateAttribute) {
      const { $templateService } = useNuxtApp()
      if (attribute.id) {
        await $templateService.removeAttributesFromTemplate(attribute.id)
      }
      this.resetCurrentAttribute()
      return attribute.name
    },
    resetCurrentAttribute() {
      this.currentAttribute = BaseInitializer.initState(TemplateAttributeInitializer.initState())
    },

  },
})
