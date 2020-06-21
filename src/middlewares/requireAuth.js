'use strict'

// TODO: Delete this file

const { createError } = require('micro')
const { Bearer } = require('permit')

const ttl = require('../utils/ttl')
const tokens = require('../database/tokens')

const permit = new Bearer({ query: 'token' })

module.exports = async (req, res) => {

	const token = permit.check(req)

	// Token not in request
	if (token == null) {
		permit.fail(res)
		throw createError(400, 'Token missing')
	}

	const entry = await tokens.get(token)

	// Token not in database
	if (entry == null) {
		permit.fail(res)
		throw createError(400, 'Token invalid')
	}

	const valid = ttl(entry.updated, process.env.ACKEE_TTL)

	// Token too old
	if (valid === false) {
		permit.fail(res)
		throw createError(400, 'Token invalid')
	}

	await tokens.update(token)

}