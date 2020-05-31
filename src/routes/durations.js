'use strict'

const { createError } = require('micro')

const durations = require('../database/durations')
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
	const { interval = intervals.INTERVALS_DAILY } = req.query

	if (intervals.toArray().includes(interval) === false) throw createError(400, 'Unknown interval')

	const entries = await durations.get(domainId, interval)

	return responses(entries)

}

module.exports = {
	get
}