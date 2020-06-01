'use strict'

const { subSeconds } = require('date-fns')

module.exports = (id) => {

	const aggregation = [
		{
			$match: {
				updated: {
					$gte: subSeconds(new Date(), 30)
				}
			}
		},
		{
			$count: 'count'
		}
	]

	if (id != null) {
		aggregation[0].$match.domainId = id
	}

	return aggregation

}