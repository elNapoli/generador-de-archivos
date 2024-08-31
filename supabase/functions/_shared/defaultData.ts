export const defaultData = (defaultValue, response) => {
  return {
    ...response,
    data: response.data || defaultValue,
  }
}
