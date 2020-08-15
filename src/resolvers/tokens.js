'use strict'

const tokens = require('../database/tokens')
const KnownError = require('../utils/KnownError')

const response = (entry) => ({
	id: entry.id,
	created: entry.created,
	updated: entry.updated
})

module.exports = {
	Mutation: {
		createToken: async (parent, { input }) => {

			const { username, password } = input

			if (process.env.ACKEE_USERNAME == null) throw new KnownError('Ackee username missing in environment')
			if (process.env.ACKEE_PASSWORD == null) throw new KnownError('Ackee username missing in environment')

			if (username !== process.env.ACKEE_USERNAME) throw new KnownError('Username or password incorrect')
			if (password !== process.env.ACKEE_PASSWORD) throw new KnownError('Username or password incorrect')

			const entry = await tokens.add()

			return {
				success: true,
				payload: response(entry)
			}

		},
		deleteToken: async (parent, { id }) => {

			await tokens.del(id)

			return {
				success: true
			}

		}
	}
}