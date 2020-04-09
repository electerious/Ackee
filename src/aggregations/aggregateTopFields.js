'use strict'

const getDateRange = require('../utils/getDateRange')

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
			$limit: 25
		}
	]

	const createdDateRange = getDateRange(dateRange)
	if (createdDateRange) {
		aggregate[0].$match.created = createdDateRange
	}

	return aggregate
}