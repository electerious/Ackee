'use strict'

const KnownError = require('../utils/KnownError')
const isExpired = require('../utils/isExpired')
const tokens = require('../database/tokens')
const permanentTokens = require('../database/permanentTokens')

module.exports = async (authorization, ttl) => {

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

	const tokenEntry = await tokens.get(token)
	const permanentTokenEntry = await permanentTokens.get(token)

	if (tokenEntry != null) {
		// Tokens can expire
		const valid = isExpired(tokenEntry.updated, ttl) === false

		// Token too old
		if (valid === false) {
			return new KnownError('Token invalid')
		}

		// Update token to ensure that the token stays valid
		await tokens.update(token)

		return true
	}

	if (permanentTokenEntry != null) {
		// Update token to indicate the last time it was used
		await permanentTokens.update(token, {
			title: permanentTokenEntry.title
		})

		return true
	}

	// Token not in database
	return new KnownError('Token invalid')

}