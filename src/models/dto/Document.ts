export interface Document {
  id: number
  name: string
  code_name: string
  required: boolean
  type: string
}

export const DocumentInitializer = {
  initState(): Document {
    return {
      template_id: null,
      status_id: false,
      name: null,
      id: null,
      generated_at: null,
      document_templates: {
        content: null,
      },
      attributes: {},
    }
  },
}
