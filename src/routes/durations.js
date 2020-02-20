'use strict'

const { createError } = require('micro')

const durations = require('../database/durations')
const constants = require('../constants/durations')

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

	const types = [
		constants.DURATIONS_TYPE_AVERAGE,
		constants.DURATIONS_TYPE_DETAILED
	]

	if (types.includes(type) === false) throw createError(400, 'Unknown type')

	const entries = await durations.get(domainId, type)

	return responses(entries)

}

module.exports = {
	get
}