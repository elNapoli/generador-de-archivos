import type Error from '~/models/dto/Error'

export default interface BaseResponse<T> {
  status: number
  data: T
  error?: Error
  description?: string
  loading: boolean
}
export const BaseInitializer = {
  initState(data: never = {}): BaseResponse {
    return {
      status: 0,
      data: data,
      error: null,
      loading: false,
    }
  },
}
