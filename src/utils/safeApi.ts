export async function safeApi<T>(
  apiCall: Promise<T>,
  initialData?: T,
): Promise<BaseDto<T>> {
  try {
    const data = await apiCall
    return {
      ...data,
      data: data.data !== null ? data.data : initialData,
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
    }
  }
}
