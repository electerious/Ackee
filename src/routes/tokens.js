'use strict'

const { send, json, createError } = require('micro')

const tokens = require('../database/tokens')

const response = (entry) => ({
	type: 'token',
	data: {
		id: entry.id,
		created: entry.created,
		updated: entry.updated
	}
})

const add = async (req, res) => {

	const { username, password } = await json(req)

	if (username == null) throw createError(400, 'Username missing')
	if (password == null) throw createError(400, 'Password missing')

	if (process.env.USERNAME == null) throw createError(500, 'Ackee username missing in environment')
	if (process.env.PASSWORD == null) throw createError(500, 'Ackee password missing in environment')

	if (username !== process.env.USERNAME) throw createError(400, 'Username or password incorrect')
	if (password !== process.env.PASSWORD) throw createError(400, 'Username or password incorrect')

	const entry = await tokens.add()

	return send(res, 201, response(entry))

}

const del = async (req, res) => {

	const { tokenId } = req.params

	await tokens.del(tokenId)

	send(res, 204)

}

module.exports = {
	add,
	del
}