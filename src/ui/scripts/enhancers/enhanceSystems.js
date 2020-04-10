const getText = ({ id }) => {

	const isWithVersion = id.osVersion != null

	if (isWithVersion === true) return `${ id.osName } ${ id.osVersion }`

	return id

}

export default (systems) => {

	// Extract and enhance the data from the API
	return systems.map((system) => ({
		text: getText(system.data),
		count: system.data.count,
		date: system.data.created == null ? null : new Date(system.data.created)
	}))

}