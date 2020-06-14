'use strict'

const tokens = require('../database/tokens')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth_new')

const response = (entry) => ({
	id: entry.id,
	created: entry.created,
	updated: entry.updated
})

module.exports = {
	Mutation: {
		createToken: async (parent, { input }) => {

			const { username, password } = input

			if (process.env.ACKEE_USERNAME == null) {
				// Log error
				// throw new Error('Ackee username missing in environment')
				return {
					success: false
				}
			}
			if (process.env.ACKEE_PASSWORD == null) {
				// Log error
				// throw new Error('Ackee password missing in environment')
				return {
					success: false
				}
			}

			if (username !== process.env.ACKEE_USERNAME) {
				// Log error
				// throw createError(400, 'Username or password incorrect')
				return { success: false }
			}
			if (password !== process.env.ACKEE_PASSWORD) {
				// Log error
				// throw createError(400, 'Username or password incorrect')
				return { success: false }
			}

			const entry = await tokens.add()

			return {
				payload: response(entry),
				success: true
			}

		},
		deleteToken: pipe(requireAuth, async (parent, { id }) => {

			await tokens.del(id)

			return {
				success: true
			}

		})
	}
}