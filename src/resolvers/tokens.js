'use strict'

const tokens = require('../database/tokens')
const KnownError = require('../utils/KnownError')
const ignoreCookie = require('../utils/ignoreCookie')

const response = (entry) => ({
	id: entry.id,
	created: entry.created,
	updated: entry.updated
})

module.exports = {
	Mutation: {
		createToken: async (parent, { input }, { setCookies }) => {

			const { username, password } = input

			if (process.env.ACKEE_USERNAME == null) throw new KnownError('Ackee username missing in environment')
			if (process.env.ACKEE_PASSWORD == null) throw new KnownError('Ackee username missing in environment')

			if (username !== process.env.ACKEE_USERNAME) throw new KnownError('Username or password incorrect')
			if (password !== process.env.ACKEE_PASSWORD) throw new KnownError('Username or password incorrect')

			const entry = await tokens.add()

			// Set cookie to avoid reporting your own visits
			setCookies.push(ignoreCookie.on)

			return {
				success: true,
				payload: response(entry)
			}

		},
		deleteToken: async (parent, { id }, { setCookies }) => {

			await tokens.del(id)

			// Remove cookie to report your own visits, again
			setCookies.push(ignoreCookie.off)

			return {
				success: true
			}

		}
	}
}