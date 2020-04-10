'use strict'

const { subDays } = require('date-fns')

const zeroDate = require('../utils/zeroDate')

module.exports = (id, properties) => {

	const aggregate = [
		{
			$match: {
				domainId: id,
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
			$project: {
				_id: {},
				created: '$created'
			}
		},
		{
			$limit: 25
		}
	]

	properties.forEach((property) => {
		aggregate[0].$match[property] = { $ne: null }
		aggregate[2].$project._id[property] = `$${ property }`
	})

	return aggregate

}