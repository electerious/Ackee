'use strict'

const matchDomainId = require('../stages/matchDomainId')

module.exports = (id, properties) => {

	const aggregation = [
		matchDomainId(id),
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

	properties.forEach((property) => {
		aggregation[0].$match[property] = { $ne: null }
		aggregation[1].$group._id[property] = `$${ property }`
	})

	return aggregation

}