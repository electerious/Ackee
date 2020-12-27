'use strict'

const matchEvents = require('../stages/matchEvents')

module.exports = (ids, limit) => {

	const aggregation = [
		matchEvents(ids),
		{
			$group: {
				_id: {
					key: '$key'
				},
				count: {
					$sum: '$value'
				},
				created: {
					$first: '$created'
				}
			}
		},
		{
			$sort: {
				created: -1
			}
		},
		{
			$limit: limit
		}
	]

	aggregation[0].$match.key = { $ne: null }

	return aggregation

}