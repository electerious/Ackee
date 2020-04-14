export default (events) => {

	// Extract and enhance the data from the API
	return events.map((event) => ({
		category: event.data.category,
		action: event.data.action,
		label: event.data.label,
		value: event.data.value,
		date: event.data.created == null ? null : new Date(event.data.created)
	}))

}