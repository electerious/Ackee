'use strict'

const { createError } = require('micro')

const views = require('../database/views')
const constants = require('../constants/views')
const intervals = require('../constants/intervals')

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
	const { type, interval = intervals.INTERVALS_DAILY } = req.query

	const types = [
		constants.VIEWS_TYPE_UNIQUE,
		constants.VIEWS_TYPE_TOTAL
	]

	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (intervals.toArray().includes(interval) === false) throw createError(400, 'Unknown interval')

	const entries = await views.get(domainId, type, interval)

	return responses(entries)

}

module.exports = {
	get
}