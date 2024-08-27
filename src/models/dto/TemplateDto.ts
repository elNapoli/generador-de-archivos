import type { DocumentAttributeDto } from '~/models/dto/DocumentAttributeDto'

export interface TemplateDto {
  id: number
  name: string
  document_attributes: DocumentAttributeDto[]
  description: string
  content?: object
}
