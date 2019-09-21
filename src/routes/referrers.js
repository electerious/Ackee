'use strict'

const { createError } = require('micro')

const referrers = require('../database/referrers')

const {
	REFERRERS_SORTING_TOP,
	REFERRERS_SORTING_RECENT
} = require('../constants/referrers')

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

	const entries = await referrers.get(domainId, sorting)

	switch (sorting) {
		case REFERRERS_SORTING_TOP: return responses(entries)
		case REFERRERS_SORTING_RECENT: return responses(entries)
		default: throw createError(400, 'Unknown sorting')
	}

}

module.exports = {
	get
}