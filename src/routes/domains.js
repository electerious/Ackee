'use strict'

const { send, json, createError } = require('micro')

const messages = require('../messages')
const domains = require('../database/domains')

const response = (entry) => ({
	type: 'domain',
	data: {
		id: entry.id,
		title: entry.title,
		created: entry.created,
		updated: entry.updated
	}
})

const responses = (entries) => ({
	type: 'domains',
	data: entries.map(response)
})

const add = async (req, res) => {

	const data = await json(req)

	let entry

	try {

		entry = await domains.add(data)

	} catch (err) {

		if (err.name === 'ValidationError') {
			throw createError(400, messages(err.errors))
		}

		throw err

	}

	return send(res, 201, response(entry))

}

const all = async () => {

	const entries = await domains.all()

	return responses(entries)

}

const update = async (req) => {

	const { domainId } = req.params
	const data = await json(req)

	let entry

	try {

		entry = await domains.update(domainId, data)

	} catch (err) {

		if (err.name === 'ValidationError') {
			throw createError(400, messages(err.errors))
		}

		throw err

	}

	if (entry == null) throw createError(404, 'Unknown domain')

	return response(entry)

}

const del = async (req, res) => {

	const { domainId } = req.params

	await domains.del(domainId)

	send(res, 204)

}

module.exports = {
	add,
	all,
	update,
	del
}