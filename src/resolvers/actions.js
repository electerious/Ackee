'use strict'

const KnownError = require('../utils/KnownError')
const messages = require('../utils/messages')
const events = require('../database/events')
const actions = require('../database/actions')

const polish = (obj) => {

	return Object.entries(obj).reduce((acc, [ key, value ]) => {

		value = typeof value === 'string' ? value.trim() : value
		value = value == null ? undefined : value
		value = value === '' ? undefined : value

		acc[key] = value
		return acc

	}, {})

}

module.exports = {
	Mutation: {
		createAction: async (parent, { recordId, input }) => {

			const data = polish({ ...input, recordId })

			const event = await events.get(recordId)

			if (event == null) throw new KnownError('Unknown event')

			let entry

			try {

				entry = await actions.add(data)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new KnownError(messages(err.errors))
				}

				throw err

			}

			return {
				success: true,
				payload: entry
			}

		},
		updateAction: async (parent, { id, input }) => {

			let entry

			try {

				entry = await actions.update(id, input)

			} catch (err) {

				if (err.name === 'ValidationError') {
					throw new KnownError(messages(err.errors))
				}

				throw err

			}

			if (entry == null) {
				throw new KnownError('Unknown action')
			}

			return {
				success: true
			}

		}
	}
}