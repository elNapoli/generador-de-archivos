export interface TemplateAttribute {
  id: number
  name: string
  code_name: string
  required: boolean
  type: string
}

export const TemplateAttributeInitializer = {
  initState(): TemplateAttribute {
    return {
      id: null,
      name: null,
      required: false,
      type: 'Texto',
    }
  },
}
