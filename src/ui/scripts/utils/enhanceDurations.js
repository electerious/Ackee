export default (durations) => {

	// Extract and enhance the data from the API
	return durations.map((duration) => ({
		duration: duration.data.id,
		count: duration.data.count
	}))

}