export default (entries, loading) => {

	const isEmpty = entries == null || entries.length === 0
	const isStale = isEmpty === false && loading === true
	const isLoading = isEmpty === true && loading === true

	return {
		isEmpty,
		isStale,
		isLoading
	}

}