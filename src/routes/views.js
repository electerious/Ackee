'use strict'

const { createError } = require('micro')

const views = require('../database/views')

const {
	VIEWS_TYPE_UNIQUE,
	VIEWS_TYPE_TOTAL,
	VIEWS_TYPE_PAGES
} = require('../constants/views')

const chartResponse = (entry) => ({
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

const chartResponses = (entries) => ({
	type: 'chart_views',
	data: entries.map(chartResponse)
})

const pageResponse = (entry) => ({
	type: 'page_view',
	data: {
		id: entry._id,
		count: entry.count
	}
})

const pageResponses = (entries) => ({
	type: 'page_views',
	data: entries.map(pageResponse)
})

const get = async (req) => {

	const { domainId } = req.params
	const { type } = req.query

	const entries = await views.get(domainId, type)

	switch (type) {
		case VIEWS_TYPE_UNIQUE: return chartResponses(entries)
		case VIEWS_TYPE_TOTAL: return chartResponses(entries)
		case VIEWS_TYPE_PAGES: return pageResponses(entries)
		default: throw createError(400, 'Unknown type')
	}

}

module.exports = {
	get
}