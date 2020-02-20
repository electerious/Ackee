'use strict'

module.exports = (id, unique) => [
	{
		$match: {
			clientId: unique === true ? {
				$exists: true,
				$ne: null
			} : undefined,
			domainId: id
		}
	},
	{
		$group: {
			_id: {
				month: {
					$month: '$created'
				},
				year: {
					$year: '$created'
				}
			},
			count: {
				$sum: 1
			}
		}
	},
	{
		$sort: {
			'_id.year': -1,
			'_id.month': -1
		}
	},
	{
		$limit: 14
	}
]