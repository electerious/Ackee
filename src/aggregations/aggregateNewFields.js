'use strict'

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
		$sort: {
			created: -1
		}
	},
	{
		$limit: 25
	}
]