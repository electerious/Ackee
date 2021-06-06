'use strict'

const { api } = require('../_utils')

const getStats = async ({ base, token, domainId, fragment }) => {
	const body = {
		query: `
			query fetchStatistics($id: ID!) {
				domain(id: $id) {
					statistics {
						id
						${ fragment }
					}
				}
			}
		`,
		variables: {
			id: domainId,
		},
	}

	const { json } = await api(base, body, token)

	if (json.errors != null) {
		throw new Error(json.errors[0].message)
	}

	return json.data.domain.statistics
}

module.exports = {
	getStats,
}