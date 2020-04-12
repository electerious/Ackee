'use strict'

const { createError } = require('micro')

const systems = require('../database/systems')
const constants = require('../constants/systems')
const ranges = require('../constants/ranges')

const response = (entry) => ({
	type: 'systems',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'system',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting, type, range = ranges.RANGES_LAST_7_DAYS } = req.query

	const sortings = [
		constants.SYSTEMS_SORTING_TOP,
		constants.SYSTEMS_SORTING_RECENT
	]

	const types = [
		constants.SYSTEMS_TYPE_WITH_VERSION,
		constants.SYSTEMS_TYPE_NO_VERSION
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (ranges.toValues().includes(range) === false) throw createError(400, 'Unknown date range')

	const entries = await systems.get(domainId, sorting, type, range)

	return responses(entries)

}

module.exports = {
	get
}