export const replaceTemplatePlaceholders = (delta, attributes) => {
  // Recorre todos los objetos en el array "ops"
  return delta.ops.map((op) => {
    if (typeof op.insert === 'string') {
      // Si "insert" es un string, realiza el reemplazo
      return {
        ...op,
        insert: op.insert.replace(/{{(\w+)}}/g, (_, key) => attributes[key] || ''),
      }
    }
    // Si "insert" no es un string, lo dejamos como está
    return op
  })
}
