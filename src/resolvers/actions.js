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
		createAction: async (parent, { eventId, input }, { isIgnored }) => {

			// Ignore your own actions when logged in
			if (isIgnored === true) {
				return {
					success: true,
					payload: {
						id: '88888888-8888-8888-8888-888888888888'
					}
				}
			}

			const data = polish({ ...input, eventId })

			const event = await events.get(eventId)

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
		updateAction: async (parent, { id, input }, { isIgnored }) => {

			// Ignore your own actions when logged in
			if (isIgnored === true) {
				return {
					success: true
				}
			}

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