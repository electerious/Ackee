'use strict'

const matchDomainId = require('../stages/matchDomainId')

module.exports = (id, properties, limit) => {

	const aggregation = [
		matchDomainId(id),
		{
			$sort: {
				created: -1
			}
		},
		{
			$project: {
				_id: {},
				created: '$created'
			}
		},
		{
			$limit: limit
		}
	]

	properties.forEach((property) => {
		aggregation[0].$match[property] = { $ne: null }
		aggregation[2].$project._id[property] = `$${ property }`
	})

	return aggregation

}