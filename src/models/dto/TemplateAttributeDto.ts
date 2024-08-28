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
      status: 0,
      data: {
        name: null,
        required: false,
        type: 'String',
      },
      error: null,
      loading: false,
    }
  },
}
