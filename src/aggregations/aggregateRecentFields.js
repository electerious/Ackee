'use strict'

const matchDomains = require('../stages/matchDomains')

module.exports = (ids, properties, limit) => {

	const aggregation = [
		matchDomains(ids),
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