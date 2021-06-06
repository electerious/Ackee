'use strict'

const actions = require('../database/actions')
const events = require('../database/events')
const KnownError = require('../utils/KnownError')
const messages = require('../utils/messages')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')
const blockDemoMode = require('../middlewares/blockDemoMode')

module.exports = {
	Event: {
		statistics: (parent) => parent,
	},
	Query: {
		event: pipe(requireAuth, (parent, { id }) => {
			return events.get(id)
		}),
		events: pipe(requireAuth, () => {
			return events.all()
		}),
	},
	Mutation: {
		createEvent: pipe(requireAuth, blockDemoMode, async (parent, { input }) => {
			let entry

			try {
				entry = await events.add(input)
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
		updateEvent: pipe(requireAuth, blockDemoMode, async (parent, { id, input }) => {
			let entry

			try {
				entry = await events.update(id, input)
			} catch (error) {
				if (error.name === 'ValidationError') {
					throw new KnownError(messages(error.errors))
				}

				throw error
			}

			if (entry == null) {
				throw new KnownError('Unknown event')
			}

			return {
				payload: entry,
				success: true,
			}
		}),
		deleteEvent: pipe(requireAuth, blockDemoMode, async (parent, { id }) => {
			await actions.del(id)
			await events.del(id)

			return {
				success: true,
			}
		}),
	},
}