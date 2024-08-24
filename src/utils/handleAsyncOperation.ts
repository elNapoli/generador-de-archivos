export interface OperationResult<T> {
  success: boolean
  data: T | null
  message?: string
}

export async function handleAsyncOperation<T>(
  operation: () => Promise<T>,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSuccessMessage?: (message: string) => void,
): Promise<OperationResult<T>> {
  setLoading(true)
  try {
    const result = await operation()
    setSuccessMessage?.('Operación exitosa') // Notifica éxito si se proporciona
    return { success: true, data: result }
  }
  catch (e) {
    if (e.status === 401) {
      setError('No está autenticado')
    }
    else {
      console.log(e)
      setError('Ha ocurrido un error, intente nuevamente')
    }
    return { success: false, data: null }
  }
  finally {
    setLoading(false)
  }
}
