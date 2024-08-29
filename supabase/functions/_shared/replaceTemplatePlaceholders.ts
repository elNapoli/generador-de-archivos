export const replaceTemplatePlaceholders = (delta, attributes) => {
  return delta.ops.map((op) => {
    if (typeof op.insert === 'string') {
      return {
        ...op,
        insert: op.insert.replace(/{{(\w+)}}/g, (_, key) => attributes[key] || ''),
      }
    }
    return op
  })
}
