'use strict'

const { subDays } = require('date-fns')

module.exports = (id, property) => [
	{
		$match: {
			domainId: id,
			[property]: {
				$ne: null
			},
			created: {
				$gte: subDays(new Date(), 6)
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