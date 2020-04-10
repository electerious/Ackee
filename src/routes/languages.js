'use strict'

const { createError } = require('micro')

const languages = require('../database/languages')
const constants = require('../constants/languages')
const { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } = require('../constants/dateRange')

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
	const { sorting, dateRange = LAST_7_DAYS.value } = req.query

	const sortings = [
		constants.LANGUAGES_SORTING_TOP,
		constants.LANGUAGES_SORTING_RECENT
	]

	const dateRanges = [
		LAST_7_DAYS.value,
		LAST_30_DAYS.value,
		ALL_TIME.value
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (dateRanges.includes(dateRange) === false) throw createError(400, 'Unknown date range')

	const entries = await languages.get(domainId, sorting, dateRange)

	return responses(entries)

}

module.exports = {
	get
}