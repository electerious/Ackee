'use strict'

const { createError } = require('micro')

const os = require('../database/os')
const constants = require('../constants/os')

const response = (entry) => ({
	type: 'os',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'os',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting, type } = req.query

	const sortings = [
		constants.OS_SORTING_TOP,
		constants.OS_SORTING_RECENT
	]

	const types = [ constants.OS_WITH_VERSION, constants.OS_NO_VERSION ]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (types.includes(type) === false) throw createError(400, 'Unknown type')

	const entries = await os.get(domainId, sorting, type)

	return responses(entries)

}

module.exports = {
	get
}