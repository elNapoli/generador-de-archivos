// utils/safeExecute.ts
export async function safeExecute<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  }
  catch (error: never) {
    console.error('Error al ejecutar operación:', error.message)
    throw new Error('Error al ejecutar operación')
  }
}
