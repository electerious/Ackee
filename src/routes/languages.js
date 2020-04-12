'use strict'

const { createError } = require('micro')

const languages = require('../database/languages')
const constants = require('../constants/languages')
const ranges = require('../constants/ranges')

const response = (entry) => ({
	type: 'language',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'languages',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting, range = ranges.RANGES_LAST_7_DAYS } = req.query

	const sortings = [
		constants.LANGUAGES_SORTING_TOP,
		constants.LANGUAGES_SORTING_RECENT
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (ranges.toValues().includes(range) === false) throw createError(400, 'Unknown date range')

	const entries = await languages.get(domainId, sorting, range)

	return responses(entries)

}

module.exports = {
	get
}