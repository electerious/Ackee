'use strict'

const { createError } = require('micro')

const referrers = require('../database/referrers')
const constants = require('../constants/referrers')

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
	const { sorting } = req.query

	const sortings = [
		constants.REFERRERS_SORTING_TOP,
		constants.REFERRERS_SORTING_NEW,
		constants.REFERRERS_SORTING_RECENT
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')

	const entries = await referrers.get(domainId, sorting)

	return responses(entries)

}

module.exports = {
	get
}