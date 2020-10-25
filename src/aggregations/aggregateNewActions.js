'use strict'

const matchEvents = require('../stages/matchEvents')

module.exports = (ids, limit) => {

	const aggregation = [
		matchEvents(ids),
		{
			$group: {
				_id: {},
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
	aggregation[1].$group._id.key = '$key'

	return aggregation

}