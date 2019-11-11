'use strict'

const { createError } = require('micro')

const durations = require('../database/durations')

const {
	DURATIONS_TYPE_AVERAGE,
	DURATIONS_TYPE_DETAILED
} = require('../constants/durations')

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
	const { type } = req.query

	const entries = await durations.get(domainId, type)

	switch (type) {
		case DURATIONS_TYPE_AVERAGE: return responses(entries)
		case DURATIONS_TYPE_DETAILED: return responses(entries)
		default: throw createError(400, 'Unknown type')
	}

}

module.exports = {
	get
}