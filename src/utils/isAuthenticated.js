'use strict'

const KnownError = require('../utils/KnownError')
const ttl = require('../utils/ttl')
const tokens = require('../database/tokens')

module.exports = async (authorization) => {

	// Token not in request
	if (authorization == null) {
		return new KnownError('Token missing')
	}

	const key = authorization.split(' ')[0]
	const token = authorization.split(' ')[1]

	// Token not in header
	if (key !== 'Bearer' || token == null) {
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