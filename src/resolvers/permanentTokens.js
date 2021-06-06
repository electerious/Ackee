'use strict'

const permanentTokens = require('../database/permanentTokens')
const KnownError = require('../utils/KnownError')
const messages = require('../utils/messages')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')
const blockDemoMode = require('../middlewares/blockDemoMode')

module.exports = {
	Query: {
		permanentToken: pipe(requireAuth, (parent, { id }) => {
			return permanentTokens.get(id)
		}),
		permanentTokens: pipe(requireAuth, () => {
			return permanentTokens.all()
		}),
	},
	Mutation: {
		createPermanentToken: pipe(requireAuth, blockDemoMode, async (parent, { input }) => {
			let entry

			try {
				entry = await permanentTokens.add(input)
			} catch (error) {
				if (error.name === 'ValidationError') {
					throw new KnownError(messages(error.errors))
				}

				throw error
			}

			return {
				payload: entry,
				success: true,
			}
		}),
		updatePermanentToken: pipe(requireAuth, blockDemoMode, async (parent, { id, input }) => {
			let entry

			try {
				entry = await permanentTokens.update(id, input)
			} catch (error) {
				if (error.name === 'ValidationError') {
					throw new KnownError(messages(error.errors))
				}

				throw error
			}

			if (entry == null) {
				throw new KnownError('Unknown domain')
			}

			return {
				payload: entry,
				success: true,
			}
		}),
		deletePermanentToken: pipe(requireAuth, blockDemoMode, async (parent, { id }) => {
			await permanentTokens.del(id)

			return {
				success: true,
			}
		}),
	},
}