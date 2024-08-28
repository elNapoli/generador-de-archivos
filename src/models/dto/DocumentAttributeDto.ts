export interface DocumentAttributeDto {
  id: number
  name: string
  code_name: string
  required: boolean
  type: string
}

export const DocumentAttributeInitializer = {
  initState(): DocumentAttributeDto {
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
