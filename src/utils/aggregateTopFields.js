'use strict'

const dateWithOffset = require('./dateWithOffset')

module.exports = (id, property) => [
	{
		$match: {
			domainId: id,
			[property]: {
				$ne: null
			},
			created: {
				$gte: dateWithOffset(-6)
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