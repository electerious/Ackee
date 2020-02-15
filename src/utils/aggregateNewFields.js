'use strict'

const dateWithOffset = require('./dateWithOffset')

module.exports = (id, property) => [
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
			},
			created: {
				$first: '$created'
			}
		}
	},
	{
		$match: {
			created: {
				$gte: dateWithOffset(-6)
			}
		}
	},
	{
		$sort: {
			created: -1
		}
	},
	{
		$limit: 25
	}
]