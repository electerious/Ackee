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
		count: entry.count
	}
})

const responses = (entries) => ({
	type: 'referrers',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting } = req.query

	const isKnownSorting = [
		REFERRERS_SORTING_TOP,
		REFERRERS_SORTING_RECENT
	].includes(sorting) === true

	if (isKnownSorting === false) throw createError(400, 'Unknown sorting')

	const entries = await referrers.get(domainId, sorting)

	return responses(entries)

}

module.exports = {
	get
}