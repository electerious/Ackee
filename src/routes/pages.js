'use strict'

const { createError } = require('micro')

const pages = require('../database/pages')

const {
	PAGES_SORTING_TOP,
	PAGES_SORTING_RECENT
} = require('../constants/pages')

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
	const { sorting } = req.query

	const entries = await pages.get(domainId, sorting)

	switch (sorting) {
		case PAGES_SORTING_TOP: return responses(entries)
		case PAGES_SORTING_RECENT: return responses(entries)
		default: throw createError(400, 'Unknown sorting')
	}

}

module.exports = {
	get
}