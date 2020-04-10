'use strict'

const getDateRange = require('../utils/getDateRange')

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
			$limit: 25
		}
	]

	properties.forEach((property) => {
		aggregate[0].$match[property] = { $ne: null }
		aggregate[1].$group._id[property] = `$${ property }`
	})

	const createdDateRange = getDateRange(dateRange)
	if (createdDateRange) {
		aggregate[0].$match.created = createdDateRange
	}

	return aggregate
}