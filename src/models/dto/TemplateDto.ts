import type { DocumentAttributeDto } from '~/models/dto/DocumentAttributeDto'

export interface TemplateDto {
  id?: number
  name?: string
  document_attributes: DocumentAttributeDto[]
  description: string
  content?: object
}

export class TemplateInitializer {
  static initState(): TemplateDto {
    return {
      status: 0,
      data: {
        id: null,
        name: null,
        description: null,
        document_attributes: [],
      },
      error: null,
      loading: false,
    }
  }
}
