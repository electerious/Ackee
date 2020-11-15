'use strict'

const { api } = require('../_utils')

const getStats = async ({ base, token, domainId, fragment }) => {

	const body = {
		query: `
			query fetchStatistics($id: ID!) {
				domain(id: $id) {
					statistics {
						${ fragment }
					}
				}
			}
		`,
		variables: {
			id: domainId
		}
	}

	const { json } = await api(base, body, token)

	return json.data.domain.statistics

}

module.exports = {
	getStats
}