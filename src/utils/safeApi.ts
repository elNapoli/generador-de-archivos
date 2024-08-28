import type BaseResponse from '~/models/dto/BaseResponse'
import { BaseInitializer } from '~/models/dto/BaseResponse'

export async function safeApi<T>(
  apiCall: Promise<T>,
  initialData?: T,
): Promise<BaseResponse<T>> {
  try {
    const data = await apiCall
    return {
      ...data,
      data: data.data !== null ? BaseInitializer.initState(data.data).data : BaseInitializer.initState(initialData).data,
      loading: false,
    }
  }
  catch (error) {
    console.error('API call error:', error)
    return {
      status: 500,
      data: initialData,
      error: {
        code: '-1',
        hint: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      loading: false,
    } as BaseResponse<T>
  }
}
