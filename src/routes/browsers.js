'use strict'

const { createError } = require('micro')

const browsers = require('../database/browsers')
const constants = require('../constants/browsers')
const { ALL_TIME, LAST_7_DAYS, LAST_30_DAYS } = require('../constants/dateRange')

const response = (entry) => ({
	type: 'browser',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'browsers',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting, type, dateRange = LAST_7_DAYS.value } = req.query

	const sortings = [
		constants.BROWSERS_SORTING_TOP,
		constants.BROWSERS_SORTING_RECENT
	]

	const types = [ constants.BROWSERS_WITH_VERSION, constants.BROWSERS_NO_VERSION ]

	const dateRanges = [ ALL_TIME.value, LAST_7_DAYS.value, LAST_30_DAYS.value ]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (dateRanges.includes(dateRange) === false) throw createError(400, 'Unknown date range')

	const entries = await browsers.get(domainId, sorting, type, dateRange)

	return responses(entries)

}

module.exports = {
	get
}