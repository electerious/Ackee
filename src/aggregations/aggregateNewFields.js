'use strict'

module.exports = (id, properties) => {

	const aggregation = [
		{
			$match: {}
		},
		{
			$group: {
				_id: {},
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
			$limit: 30
		}
	]

	if (id != null) {
		aggregation[0].$match.domainId = id
	}

	properties.forEach((property) => {
		aggregation[0].$match[property] = { $ne: null }
		aggregation[1].$group._id[property] = `$${ property }`
	})

	return aggregation

}