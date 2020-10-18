'use strict'

const tokens = require('../database/tokens')
const KnownError = require('../utils/KnownError')

const response = (entry) => ({
	id: entry.id,
	created: entry.created,
	updated: entry.updated
})

const cookieMaxAge = 365*24*60*60

module.exports = {
	Mutation: {
		createToken: async (parent, { input }, { res }) => {

			const { username, password } = input

			if (process.env.ACKEE_USERNAME == null) throw new KnownError('Ackee username missing in environment')
			if (process.env.ACKEE_PASSWORD == null) throw new KnownError('Ackee username missing in environment')

			if (username !== process.env.ACKEE_USERNAME) throw new KnownError('Username or password incorrect')
			if (password !== process.env.ACKEE_PASSWORD) throw new KnownError('Username or password incorrect')

			const entry = await tokens.add()

			// set cockie for 1 year to avoid reporting own visits
			res.setHeader('Set-Cookie', `ackee_login=1; SameSite=None; Secure; Max-Age=${cookieMaxAge}`)

			return {
				success: true,
				payload: response(entry)
			}

		},
		deleteToken: async (parent, { id }, { res }) => {

			await tokens.del(id)

			res.setHeader('Set-Cookie', 'ackee_login=0; SameSite=None; Secure; Max-Age=-1')

			return {
				success: true
			}

		}
	}
}