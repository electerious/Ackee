'use strict'

const { createError } = require('micro')

const countries = require('../database/countries')
const constants = require('../constants/countries')
const ranges = require('../constants/ranges')

const response = (entry) => ({
	type: 'country',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'countries',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting, range = ranges.RANGES_LAST_7_DAYS } = req.query

	const sortings = [
		constants.COUNTRIES_SORTING_TOP,
		constants.COUNTRIES_SORTING_RECENT
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (ranges.toArray().includes(range) === false) throw createError(400, 'Unknown range')

	const entries = await countries.get(domainId, sorting, range)

	return responses(entries)

}

module.exports = {
	get
}