export const safeBaseDto = <T>(response: BaseDto<T>, defaultValue: T): BaseDto<T> => ({
  ...response,
  data: response.data ?? defaultValue,
})
