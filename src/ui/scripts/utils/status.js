export default (data, loading) => {
  // Loads data
  const isLoading = loading === true

  // Has no data
  const isEmpty = data == null || data.length === 0

  // Has no data, but loads data
  const isInitializing = isEmpty && loading === true

  // Has data and loads new data
  const isUpdating = !isEmpty && loading === true

  return {
    isLoading,
    isEmpty,
    isInitializing,
    isUpdating,
  }
}
