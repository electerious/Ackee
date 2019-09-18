'use strict'

const { createError } = require('micro')

const languages = require('../database/languages')

const {
	LANGUAGES_SORTING_TOP,
	LANGUAGES_SORTING_RECENT
} = require('../constants/languages')

const response = (entry) => ({
	type: 'language',
	data: {
		id: entry._id,
		count: entry.count
	}
})

const responses = (entries) => ({
	type: 'languages',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting } = req.query

	const entries = await languages.get(domainId, sorting)

	switch (sorting) {
		case LANGUAGES_SORTING_TOP: return responses(entries)
		case LANGUAGES_SORTING_RECENT: return responses(entries)
		default: throw createError(400, 'Unknown sorting')
	}

}

module.exports = {
	get
}