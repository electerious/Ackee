export default (durations) => {

	// Extract and enhance the data from the API
	return durations.map((duration) => ({
		duration: duration.data.id,
		average: duration.data.average,
		count: duration.data.count
	}))

}