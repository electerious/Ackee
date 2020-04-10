'use strict'

const dateRangeOffset = require('../utils/dateRangeOffset')

module.exports = (id, property, dateRange) => {

	const aggregate = [
		{
			$match: {
				domainId: id,
				[property]: {
					$ne: null
				}
			}
		},
		{
			$group: {
				_id: `$${ property }`,
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

	const createdDateRange = dateRangeOffset(dateRange)
	if (createdDateRange) {
		aggregate[0].$match.created = { $gte: createdDateRange }
	}

	return aggregate

}