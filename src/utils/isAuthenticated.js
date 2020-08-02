'use strict'

const { Bearer } = require('permit')

const KnownError = require('../utils/KnownError')
const ttl = require('../utils/ttl')
const tokens = require('../database/tokens')

const permit = new Bearer({ query: 'token' })

module.exports = async (req) => {

	const token = permit.check(req)

	// Token not in request
	if (token == null) {
		return new KnownError('Token missing')
	}

	const entry = await tokens.get(token)

	// Token not in database
	if (entry == null) {
		return new KnownError('Token invalid')
	}

	const valid = ttl(entry.updated, process.env.ACKEE_TTL)

	// Token too old
	if (valid === false) {
		return new KnownError('Token invalid')
	}

	await tokens.update(token)

	return true

}