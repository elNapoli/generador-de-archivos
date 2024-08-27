import type ErrorDto from '~/models/dto/ErrorDto'

export default interface BaseDto<T> {
  status: number
  data: T
  error?: ErrorDto
  description?: string
}
