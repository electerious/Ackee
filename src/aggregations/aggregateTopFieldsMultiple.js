'use strict'

const dateRangeOffset = require('../utils/dateRangeOffset')

module.exports = (id, properties, dateRange) => {

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
			$limit: 40
		}
	]

	properties.forEach((property) => {
		aggregate[0].$match[property] = { $ne: null }
		aggregate[1].$group._id[property] = `$${ property }`
	})

	const createdDateRange = dateRangeOffset(dateRange)
	if (createdDateRange) {
		aggregate[0].$match.created = { $gte: createdDateRange }
	}

	return aggregate

}