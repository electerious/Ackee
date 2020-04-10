const getText = ({ id }) => {

	const isWithVersion = id.osVersion != null

	if (isWithVersion === true) return `${ id.osName } ${ id.osVersion }`

	return id

}

export default (os) => {

	// Extract and enhance the data from the API
	return os.map((singleOs) => ({
		text: getText(singleOs.data),
		count: singleOs.data.count,
		date: singleOs.data.created == null ? null : new Date(singleOs.data.created)
	}))

}