'use strict'

const { Bearer } = require('permit')

const ttl = require('../utils/ttl')
const tokens = require('../database/tokens')

const permit = new Bearer({ query: 'token' })

module.exports = async (req) => {

	const token = permit.check(req)

	// Token not in request
	if (token == null) {
		return new Error('Token missing')
	}

	const entry = await tokens.get(token)

	// Token not in database
	if (entry == null) {
		return new Error('Token invalid')
	}

	const valid = ttl(entry.updated, process.env.ACKEE_TTL)

	// Token too old
	if (valid === false) {
		return new Error('Token invalid')
	}

	await tokens.update(token)

	return true

}