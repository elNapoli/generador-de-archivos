export const convertToUpperAndUnderscore = (input: string): string => {
  return input.toUpperCase().replace(/\s+/g, '_')
}
