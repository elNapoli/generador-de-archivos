import type ErrorDto from '~/models/dto/ErrorDto'
import type { DocumentDto } from '~/models/dto/DocumentDto'

export default interface BaseDto<T> {
  status: number
  data: T
  error?: ErrorDto
  description?: string
  loading: boolean
}
export const BaseInitializer = {
  initState(data: never = {}): DocumentDto {
    return {
      status: 0,
      data: data,
      error: null,
      loading: false,
    }
  },
}
