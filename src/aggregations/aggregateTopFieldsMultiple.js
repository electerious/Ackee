'use strict'

const offsetByRange = require('../utils/offsetByRange')

module.exports = (id, properties, range) => {

	const aggregate = [
		{
			$match: {
				domainId: id
			}
		},
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
			$limit: 30
		}
	]

	properties.forEach((property) => {
		aggregate[0].$match[property] = { $ne: null }
		aggregate[1].$group._id[property] = `$${ property }`
	})

	const dateOffset = offsetByRange(range)
	if (dateOffset != null) {
		aggregate[0].$match.created = { $gte: dateOffset }
	}

	return aggregate

}