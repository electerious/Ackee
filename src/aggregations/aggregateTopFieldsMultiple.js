'use strict'

const { subDays } = require('date-fns')

const zeroDate = require('../utils/zeroDate')

module.exports = (id, properties) => {

	const aggregate = [
		{
			$match: {
				domainId: id,
				created: {
					$gte: subDays(zeroDate(), 6)
				}
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

	return aggregate

}