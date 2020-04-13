'use strict'

const { send, json, createError } = require('micro')

const ranges = require('../constants/ranges')
const domains = require('../database/domains')
const events = require('../database/events')
const identifier = require('../utils/identifier')
const messages = require('../utils/messages')

const response = (entry) => ({
	type: 'event',
	data: {
		id: entry.id,
		category: entry.category,
		action: entry.action,
		label: entry.label,
		value: entry.value,
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
	const { range = ranges.RANGES_LAST_7_DAYS.value } = req.query

	if (ranges.toValues().includes(range) === false) throw createError(400, 'Unknown date range')

	const entries = await events.get(domainId, range)

	return responses(entries)

}

module.exports = {
	add,
	get
}