'use strict'

const { send, json, createError } = require('micro')

const messages = require('../utils/messages')
const events = require('../database/events')

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

	const data = await json(req)

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

const all = async () => {

	const entries = await events.all()

	return responses(entries)

}


module.exports = {
	add,
	all
}