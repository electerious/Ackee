'use strict'

const { createError } = require('micro')

const os = require('../database/os')
const constants = require('../constants/os')
const { ALL_TIME, LAST_7_DAYS, LAST_30_DAYS } = require('../constants/dateRange')

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
	const { sorting, type, dateRange = LAST_7_DAYS.value } = req.query

	const sortings = [
		constants.OS_SORTING_TOP,
		constants.OS_SORTING_RECENT
	]

	const types = [
		constants.OS_WITH_VERSION,
		constants.OS_NO_VERSION
	]

	const dateRanges = [ ALL_TIME.value, LAST_7_DAYS.value, LAST_30_DAYS.value ]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (dateRanges.includes(Number(dateRange)) === false) throw createError(400, 'Unknown date range')

	const entries = await os.get(domainId, sorting, type, Number(dateRange))

	return responses(entries)

}

module.exports = {
	get
}