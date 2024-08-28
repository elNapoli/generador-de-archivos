import type { TemplateAttributeDto } from '~/models/dto/TemplateAttributeDto'

export interface TemplateDto {
  id?: number
  name?: string
  document_attributes: TemplateAttributeDto[]
  description: string
  content?: object
}

export const TemplateInitializer = {
  initState(): TemplateDto {
    return {
      id: null,
      name: null,
      description: null,
      document_attributes: [],
    }
  },
}
