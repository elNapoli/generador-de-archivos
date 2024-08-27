import type { DocumentAttributeUI } from '~/models/domain /DocumentAttributeUI'

export interface TemplateUI {
  id: number
  name: string
  documentAttributes: DocumentAttributeUI[]
  description: string
  content?: object
}
