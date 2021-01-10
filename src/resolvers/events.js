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
		statistics: (obj) => obj
	},
	Query: {
		event: pipe(requireAuth, async (parent, { id }) => {

			return events.get(id)

		}),
		events: pipe(requireAuth, async () => {

			return events.all()

		})
	},
	Mutation: {
		createEvent: pipe(requireAuth, blockDemoMode, async (parent, { input }) => {

			let entry

			try {

				entry = await events.add(input)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new KnownError(messages(err.errors))
				}

				throw err

			}

			return {
				payload: entry,
				success: true
			}

		}),
		updateEvent: pipe(requireAuth, blockDemoMode, async (parent, { id, input }) => {

			let entry

			try {

				entry = await events.update(id, input)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new KnownError(messages(err.errors))
				}

				throw err

			}

			if (entry == null) {
				throw new KnownError('Unknown event')
			}

			return {
				payload: entry,
				success: true
			}

		}),
		deleteEvent: pipe(requireAuth, blockDemoMode, async (parent, { id }) => {

			await actions.del(id)
			await events.del(id)

			return {
				success: true
			}

		})
	}
}