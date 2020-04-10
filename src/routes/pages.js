'use strict'

const { createError } = require('micro')

const pages = require('../database/pages')
const constants = require('../constants/pages')
const { ALL_TIME, LAST_7_DAYS, LAST_30_DAYS } = require('../constants/dateRange')

const response = (entry) => ({
	type: 'page',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'pages',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting, dateRange = LAST_7_DAYS.value } = req.query

	const sortings = [
		constants.PAGES_SORTING_TOP,
		constants.PAGES_SORTING_RECENT
	]

	const dateRanges = [ ALL_TIME.value, LAST_7_DAYS.value, LAST_30_DAYS.value ]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (dateRanges.includes(dateRange) === false) throw createError(400, 'Unknown date range')

	const entries = await pages.get(domainId, sorting, dateRange)

	return responses(entries)

}

module.exports = {
	get
}