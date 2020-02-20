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
			'_id.day': -1
		}
	},
	{
		$limit: 14
	}
]