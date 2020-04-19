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
		$sort: {
			created: -1
		}
	},
	{
		$project: {
			_id: `$${ property }`,
			created: '$created'
		}
	},
	{
		$limit: 30
	}
]