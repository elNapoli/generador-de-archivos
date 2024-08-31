// ~/utils/asyncHelpers.js

export const handleAsyncAction = async (context, action, onSuccess = () => {
}, onError = () => {
}) => {
  context.loading = true
  try {
    const response = await action()
    context.error = response.error
    context.status = response.status
    if (!response.error) {
      onSuccess(response)
    }
    else {
      onError(response)
    }
  }
  catch (err) {
    context.error = err.message || 'An unexpected error occurred'
    context.status = 500
  }
  finally {
    context.loading = false
  }
}
