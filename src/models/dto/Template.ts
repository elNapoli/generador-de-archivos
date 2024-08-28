import type { TemplateAttribute } from '~/models/dto/TemplateAttribute'

export interface Template {
  id?: number
  name?: string
  document_attributes: TemplateAttribute[]
  description: string
  content?: object
}

export const TemplateInitializer = {
  initState(): Template {
    return {
      id: null,
      name: null,
      description: null,
      document_attributes: [],
    }
  },
}
