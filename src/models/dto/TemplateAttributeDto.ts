export interface TemplateAttributeDto {
  id: number
  name: string
  code_name: string
  required: boolean
  type: string
}

export const TemplateAttributeInitializer = {
  initState(): TemplateAttributeDto {
    return {
      name: null,
      required: false,
      type: 'String',
    }
  },
}
