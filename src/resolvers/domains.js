'use strict'

const domains = require('../database/domains')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth_new')
const blockDemo = require('../middlewares/blockDemo_new')

const response = (entry) => ({
	id: entry.id,
	title: entry.title,
	created: entry.created,
	updated: entry.updated
})

module.exports = {
	Query: {
		domain: async (parent, { id }) => {

			const entry = await domains.get(id)

			return entry == null ? null : response(entry)

		},
		domains: async (parent, { ids }) => {

			// Filter by ids
			const entries = await domains.all()

			return entries.map(response)

		}
	},
	Mutation: {
		createDomain: pipe(requireAuth, blockDemo, async (parent, { input }) => {

			let entry

			try {

				entry = await domains.add(input)

			} catch (err) {

				if (err.name === 'ValidationError') {
					// Log error
					// throw createError(400, messages(err.errors), err)
					return {
						success: false
					}
				}

				// Log error
				// throw err
				return {
					success: false
				}

			}

			return {
				payload: response(entry),
				success: true
			}

		}),
		updateDomain: pipe(requireAuth, blockDemo, async (parent, { id, input }) => {

			let entry

			try {

				entry = await domains.update(id, input)

			} catch (err) {

				if (err.name === 'ValidationError') {
					// Log error
					// throw createError(400, messages(err.errors), err)
					return {
						success: false
					}
				}

				// Log error
				// throw err
				return {
					success: false
				}

			}

			if (entry == null) {
				// Log error
				// throw createError(404, 'Unknown domain')
				return {
					success: false
				}
			}

			return {
				payload: response(entry),
				success: true
			}

		}),
		deleteDomain: pipe(requireAuth, blockDemo, async (parent, { id }) => {

			await domains.del(id)

			return {
				success: true
			}

		})
	}
}