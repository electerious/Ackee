'use strict'

const records = require('../database/records')
const domains = require('../database/domains')
const KnownError = require('../utils/KnownError')
const messages = require('../utils/messages')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')
const blockDemoMode = require('../middlewares/blockDemoMode')

module.exports = {
	Domain: {
		facts: (parent) => parent,
		statistics: (parent) => parent,
	},
	Query: {
		domain: pipe(requireAuth, (parent, { id }) => {
			return domains.get(id)
		}),
		domains: pipe(requireAuth, () => {
			return domains.all()
		}),
	},
	Mutation: {
		createDomain: pipe(requireAuth, blockDemoMode, async (parent, { input }) => {
			let entry

			try {
				entry = await domains.add(input)
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
		updateDomain: pipe(requireAuth, blockDemoMode, async (parent, { id, input }) => {
			let entry

			try {
				entry = await domains.update(id, input)
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
		deleteDomain: pipe(requireAuth, blockDemoMode, async (parent, { id }) => {
			await records.del(id)
			await domains.del(id)

			return {
				success: true,
			}
		}),
	},
}