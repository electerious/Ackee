'use strict'

const { createError } = require('micro')

const languages = require('../database/languages')
const constants = require('../constants/languages')

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
	const { sorting } = req.query

	const sortings = [
		constants.LANGUAGES_SORTING_TOP,
		constants.LANGUAGES_SORTING_RECENT
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')

	const entries = await languages.get(domainId, sorting)

	return responses(entries)

}

module.exports = {
	get
}