'use strict'

const { createError } = require('micro')

const views = require('../database/views')

const {
	VIEWS_TYPE_UNIQUE,
	VIEWS_TYPE_TOTAL
} = require('../constants/views')

const response = (entry) => ({
	type: 'chart_view',
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
	type: 'chart_views',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { type } = req.query

	const entries = await views.get(domainId, type)

	switch (type) {
		case VIEWS_TYPE_UNIQUE: return responses(entries)
		case VIEWS_TYPE_TOTAL: return responses(entries)
		default: throw createError(400, 'Unknown type')
	}

}

module.exports = {
	get
}