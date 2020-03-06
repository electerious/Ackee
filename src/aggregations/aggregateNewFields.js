'use strict'

const { subDays } = require('date-fns')

const zeroDate = require('../utils/zeroDate')

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
				$gte: subDays(zeroDate(), 6)
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