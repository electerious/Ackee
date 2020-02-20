'use strict'

const { createError } = require('micro')

const pages = require('../database/pages')
const constants = require('../constants/pages')

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

	const sortings = [
		constants.PAGES_SORTING_TOP,
		constants.PAGES_SORTING_RECENT
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')

	const entries = await pages.get(domainId, sorting)

	return responses(entries)

}

module.exports = {
	get
}