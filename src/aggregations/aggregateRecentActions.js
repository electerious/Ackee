'use strict'

const matchEvents = require('../stages/matchEvents')

module.exports = (ids, limit) => {

	const aggregation = [
		matchEvents(ids),
		{
			$sort: {
				created: -1
			}
		},
		{
			$project: {
				_id: {},
				created: '$created'
			}
		},
		{
			$limit: limit
		}
	]

	aggregation[0].$match.key = { $ne: null }
	aggregation[2].$group._id.key = '$key'

	return aggregation

}