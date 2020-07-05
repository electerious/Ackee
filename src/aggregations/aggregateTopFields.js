'use strict'

const matchDomains = require('../stages/matchDomains')
const offsetByRange = require('../utils/offsetByRange')

module.exports = (ids, properties, range, limit) => {

	const aggregation = [
		matchDomains(ids),
		{
			$group: {
				_id: {},
				count: {
					$sum: 1
				}
			}
		},
		{
			$sort: {
				count: -1
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

	const dateOffset = offsetByRange(range)
	if (dateOffset != null) {
		aggregation[0].$match.created = { $gte: dateOffset }
	}

	return aggregation

}