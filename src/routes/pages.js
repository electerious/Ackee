'use strict'

const { createError } = require('micro')

const pages = require('../database/pages')
const constants = require('../constants/pages')
const { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } = require('../constants/dateRange')

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

	const dateRanges = [
		LAST_7_DAYS.value,
		LAST_30_DAYS.value,
		ALL_TIME.value
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (dateRanges.includes(dateRange) === false) throw createError(400, 'Unknown date range')

	const entries = await pages.get(domainId, sorting, dateRange)

	return responses(entries)

}

module.exports = {
	get
}