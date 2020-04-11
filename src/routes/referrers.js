'use strict'

const { createError } = require('micro')

const referrers = require('../database/referrers')
const constants = require('../constants/referrers')
const ranges = require('../constants/ranges')

const response = (entry) => ({
	type: 'referrer',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'referrers',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting, range } = req.query

	const sortings = [
		constants.REFERRERS_SORTING_TOP,
		constants.REFERRERS_SORTING_NEW,
		constants.REFERRERS_SORTING_RECENT
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (ranges.toValues().includes(range) === false) throw createError(400, 'Unknown date range')

	const entries = await referrers.get(domainId, sorting, range)

	return responses(entries)

}

module.exports = {
	get
}