'use strict'

const matchDomains = require('../stages/matchDomains')

module.exports = (ids, properties, limit) => {

	const aggregation = [
		matchDomains(ids),
		{
			$group: {
				_id: {},
				count: {
					$sum: 1
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

	properties.forEach((property) => {
		aggregation[0].$match[property] = { $ne: null }
		aggregation[1].$group._id[property] = `$${ property }`
	})

	return aggregation

}