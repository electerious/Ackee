'use strict'

const { createError } = require('micro')

const browsers = require('../database/browsers')
const constants = require('../constants/browsers')
const ranges = require('../constants/ranges')

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
	const { sorting, type, range = ranges.RANGES_LAST_7_DAYS.value } = req.query

	const sortings = [
		constants.BROWSERS_SORTING_TOP,
		constants.BROWSERS_SORTING_RECENT
	]

	const types = [
		constants.BROWSERS_TYPE_WITH_VERSION,
		constants.BROWSERS_TYPE_NO_VERSION
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (ranges.toValues().includes(range) === false) throw createError(400, 'Unknown date range')

	const entries = await browsers.get(domainId, sorting, type, range)

	return responses(entries)

}

module.exports = {
	get
}