'use strict'

const { api } = require('../_utils')

const getStats = async ({ base, token, eventId, fragment }) => {
	const body = {
		query: `
			query fetchStatistics($id: ID!) {
				event(id: $id) {
					statistics {
						id
						${ fragment }
					}
				}
			}
		`,
		variables: {
			id: eventId,
		},
	}

	const { json } = await api(base, body, token)

	if (json.errors != null) {
		throw new Error(json.errors[0].message)
	}

	return json.data.event.statistics
}

module.exports = {
	getStats,
}