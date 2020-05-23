'use strict'

const { createError } = require('micro')

const durations = require('../database/durations')
const constants = require('../constants/durations')
const ranges = require('../constants/ranges')
const intervals = require('../constants/intervals')

const response = (entry) => ({
	type: 'duration',
	data: {
		id: entry._id,
		average: entry.average,
		count: entry.count
	}
})

const responses = (entries) => ({
	type: 'durations',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { type, range = ranges.RANGES_LAST_7_DAYS, interval = intervals.INTERVALS_DAILY } = req.query

	const types = [
		constants.DURATIONS_TYPE_AVERAGE,
		constants.DURATIONS_TYPE_DETAILED
	]

	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (ranges.toArray().includes(range) === false) throw createError(400, 'Unknown range')
	if (intervals.toArray().includes(interval) === false) throw createError(400, 'Unknown interval')

	const entries = await durations.get(domainId, type, range, interval)

	return responses(entries)

}

module.exports = {
	get
}