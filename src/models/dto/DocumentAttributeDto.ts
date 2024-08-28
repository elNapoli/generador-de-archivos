export interface DocumentAttributeDto {
  id: number
  name: string
  code_name: string
  required: boolean
  type: string
}

export class DocumentAttributeInitializer {
  static initState(): DocumentAttributeDto {
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
  }
}
