export const generateUniqueName = (prefix = '') => {
  const timestamp = new Date().getTime()
  const randomString = Math.random().toString(36).substring(2, 10)
  return `${prefix}${timestamp}-${randomString}`
}
