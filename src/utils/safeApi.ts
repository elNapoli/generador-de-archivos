import type BaseDto from '~/models/dto/BaseDto'
import { BaseInitializer } from '~/models/dto/BaseDto'

export async function safeApi<T>(
  apiCall: Promise<T>,
  initialData?: T,
): Promise<BaseDto<T>> {
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
    } as BaseDto<T>
  }
}
