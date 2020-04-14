'use strict'

const { send, json, createError } = require('micro')

const ranges = require('../constants/ranges')
const domains = require('../database/domains')
const events = require('../database/events')
const identifier = require('../utils/identifier')
const messages = require('../utils/messages')
const constants = require('../constants/events')

const response = (entry) => ({
	type: 'event',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'events',
	data: entries.map(response)
})

const add = async (req, res) => {

	const { domainId } = req.params
	const clientId = identifier(req, domainId)
	const data = { ...await json(req), clientId, domainId }

	const domain = await domains.get(domainId)

	if (domain == null) throw createError(404, 'Unknown domain')

	let entry

	try {

		entry = await events.add(data)

	} catch (err) {

		if (err.name === 'ValidationError') {
			throw createError(400, messages(err.errors), err)
		}

		throw err

	}

	return send(res, 201, response(entry))

}

const get = async (req) => {

	const { domainId } = req.params
	const { type, range = ranges.RANGES_LAST_7_DAYS } = req.query

	const types = [
		constants.EVENTS_TYPE_ACTIONS,
		constants.EVENTS_TYPE_CATEGORIES,
		constants.EVENTS_TYPE_COMBINED
	]

	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (ranges.toArray().includes(range) === false) throw createError(400, 'Unknown date range')

	const entries = await events.get(domainId, type, range)

	return responses(entries)

}

module.exports = {
	add,
	get
}