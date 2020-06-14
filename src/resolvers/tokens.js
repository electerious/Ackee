const tokens = require('../database/tokens')

module.exports = {
	Mutation: {
		createToken: async (parent, { input }) => {

			const { username, password } = input

			if (process.env.ACKEE_USERNAME == null) throw new Error('Ackee username missing in environment')
			if (process.env.ACKEE_PASSWORD == null) throw new Error('Ackee password missing in environment')

			if (username !== process.env.ACKEE_USERNAME) return { success: false }
			if (password !== process.env.ACKEE_PASSWORD) return { success: false }

			return {
				payload: await tokens.add(),
				success: true
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