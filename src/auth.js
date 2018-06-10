'use strict'

const { createError } = require('micro')
const { Bearer } = require('permit')

const context = require('./context')
const ttl = require('./ttl')
const tokens = require('./database/tokens')

const permit = new Bearer({ query: 'token' })

module.exports = async (req, res) => {

	const token = permit.check(req)

	if (token == null) {
		permit.fail(res)
		throw createError(400, 'Token missing')
	}

	const entry = await tokens.get(token)

	if (entry == null) {
		permit.fail(res)
		throw createError(400, 'Token unknown')
	}

	const valid = ttl(entry.updated, process.env.TTL)

	if (valid === false) {
		permit.fail(res)
		throw createError(400, 'Token invalid')
	}

	await tokens.update(token)

	context(req, 'token', token)

}