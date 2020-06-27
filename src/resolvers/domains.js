'use strict'

const records = require('../database/records')
const domains = require('../database/domains')
const pipe = require('../utils/pipe')
const messages = require('../utils/messages')
const requireAuth = require('../middlewares/requireAuth')
const blockDemo = require('../middlewares/blockDemo')

module.exports = {
	Domain: {
		facts: (obj) => obj,
		statistics: (obj) => obj
	},
	Query: {
		domain: pipe(requireAuth, async (parent, { id }) => {

			return domains.get(id)

		}),
		domains: pipe(requireAuth, async () => {

			return domains.all()

		})
	},
	Mutation: {
		createDomain: pipe(requireAuth, blockDemo, async (parent, { input }) => {

			let entry

			try {

				entry = await domains.add(input)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new Error(messages(err.errors))
				}

				throw err

			}

			return {
				payload: entry,
				success: true
			}

		}),
		updateDomain: pipe(requireAuth, blockDemo, async (parent, { id, input }) => {

			let entry

			try {

				entry = await domains.update(id, input)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new Error(messages(err.errors))
				}

				throw err

			}

			if (entry == null) {
				throw new Error('Unknown domain')
			}

			return {
				payload: entry,
				success: true
			}

		}),
		deleteDomain: pipe(requireAuth, blockDemo, async (parent, { id }) => {

			await records.del(id)
			await domains.del(id)

			return {
				success: true
			}

		})
	}
}