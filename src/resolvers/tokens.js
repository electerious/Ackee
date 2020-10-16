'use strict'

const tokens = require('../database/tokens')
const KnownError = require('../utils/KnownError')

const response = (entry) => ({
	id: entry.id,
	created: entry.created,
	updated: entry.updated
})

const getCookieDomain = (req) => {
	if (process.env.ACKEE_ALLOW_ORIGIN == null || process.env.ACKEE_ALLOW_ORIGIN === '*') {
		return '';
	}

	// find a host among the ACKEE_ALLOW_ORIGIN that is the parent of the ackee UI subdomain
	const origins = process.env.ACKEE_ALLOW_ORIGIN.split(',')
	let result = '';
	origins.forEach((origin) => {
		const domainParts = origin.match(/https?:\/\/([^/]+)/)
		if (domainParts && req.headers.host.includes(domainParts[1])) {
			result = domainParts[1]
		} 
	})

	return result
}

const cookieMaxAge = 365*24*60*60

module.exports = {
	Mutation: {
		createToken: async (parent, { input }, { req, res }) => {

			const { username, password } = input

			if (process.env.ACKEE_USERNAME == null) throw new KnownError('Ackee username missing in environment')
			if (process.env.ACKEE_PASSWORD == null) throw new KnownError('Ackee username missing in environment')

			if (username !== process.env.ACKEE_USERNAME) throw new KnownError('Username or password incorrect')
			if (password !== process.env.ACKEE_PASSWORD) throw new KnownError('Username or password incorrect')

			const entry = await tokens.add()

			// set cockie for 1 year to avoid reporting own visits
			res.setHeader('Set-Cookie', `ackee_login=1; SameSite=None; Secure; Max-Age=${cookieMaxAge}; Domain=${getCookieDomain(req)}`)

			return {
				success: true,
				payload: response(entry)
			}

		},
		deleteToken: async (parent, { id }, { req, res }) => {

			await tokens.del(id)

			res.setHeader('Set-Cookie', `ackee_login=0; SameSite=None; Secure; Max-Age=-1; Domain=${getCookieDomain(req)}`)

			return {
				success: true
			}

		}
	}
}