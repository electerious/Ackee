export default (entries, loading) => {

	// Loads data
	const isLoading = loading === true

	// Has no data, but loads data
	const isInitializing = isEmpty === true && loading === true

	// Has data and loads new data
	const isUpdating = isEmpty === false && loading === true

	// Has no data
	const isEmpty = entries == null || entries.length === 0

	return {
		isLoading,
		isInitializing,
		isUpdating,
		isEmpty
	}

}