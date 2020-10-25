'use strict'

const matchDomains = require('../stages/matchDomains')

module.exports = (ids, properties, limit, or) => {

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
		if (or === true) {
			aggregation[0].$match['$or'] = [
				...(aggregation[0].$match['$or'] || []),
				{ [property]: { $ne: null } }
			]
		} else {
			aggregation[0].$match[property] = { $ne: null }
		}
		aggregation[1].$group._id[property] = `$${ property }`
	})

	return aggregation

}