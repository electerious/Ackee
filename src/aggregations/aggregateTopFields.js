'use strict'

const offsetByRange = require('../utils/offsetByRange')

module.exports = (id, property, range) => {

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
			$limit: 30
		}
	]

	const dateOffset = offsetByRange(range)
	if (dateOffset != null) {
		aggregate[0].$match.created = { $gte: dateOffset }
	}

	return aggregate

}