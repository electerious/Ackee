'use strict'

const { createError } = require('micro')

const pages = require('../database/pages')
const constants = require('../constants/pages')
const ranges = require('../constants/ranges')

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
	const { sorting, range = ranges.RANGES_LAST_7_DAYS } = req.query

	const sortings = [
		constants.PAGES_SORTING_TOP,
		constants.PAGES_SORTING_RECENT
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (ranges.toArray().includes(range) === false) throw createError(400, 'Unknown range')

	const entries = await pages.get(domainId, sorting, range)

	return responses(entries)

}

module.exports = {
	get
}