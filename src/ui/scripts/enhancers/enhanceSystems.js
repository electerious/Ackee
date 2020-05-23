import bestMatch from '../utils/bestMatch'

const getText = ({ id }) => {

	return bestMatch([
		[ `${ id.osName } ${ id.osVersion }`, [ id.osName, id.osVersion ]],
		[ `${ id.osName }`, [ id.osName ]]
	])

}

export default (systems) => {

	// Extract and enhance the data from the API
	return systems.map((system) => ({
		text: getText(system.data),
		count: system.data.count,
		date: system.data.created == null ? null : new Date(system.data.created)
	}))

}