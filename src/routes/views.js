'use strict'

const { createError } = require('micro')

const views = require('../database/views')

const {
	VIEWS_TYPE_TOTAL,
	VIEWS_TYPE_UNIQUE
} = require('../constants/views')

const response = (entry) => ({
	type: 'view',
	data: {
		id: {
			day: entry._id.day,
			month: entry._id.month,
			year: entry._id.year
		},
		count: entry.count
	}
})

const responses = (entries) => ({
	type: 'views',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { type } = req.query

	const isKnownType = [
		VIEWS_TYPE_TOTAL,
		VIEWS_TYPE_UNIQUE
	].includes(type) === true

	if (isKnownType === false) throw createError(400, 'Unknown type')

	const entries = await views.get(domainId, type)

	return responses(entries)

}

module.exports = {
	get
}