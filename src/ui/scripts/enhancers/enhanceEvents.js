const getText = ({ id }) => {
	return id.category && id.action ? `${ id.category } - ${ id.action }` : id
}

export default (events) => {

	// Extract and enhance the data from the API
	return events.map((event) => ({
		text: getText(event.data),
		count: event.data.count,
		date: event.data.created == null ? null : new Date(event.data.created)
	}))

}