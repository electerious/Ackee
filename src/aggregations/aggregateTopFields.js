'use strict'

const { subDays } = require('date-fns')

const zeroDate = require('../utils/zeroDate')

module.exports = (id, property) => [
	{
		$match: {
			domainId: id,
			[property]: {
				$ne: null
			},
			created: {
				$gte: subDays(zeroDate(), 6)
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