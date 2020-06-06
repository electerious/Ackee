'use strict'

const { subSeconds } = require('date-fns')

const matchDomainId = require('../stages/matchDomainId')

module.exports = (id) => {

	const aggregation = [
		matchDomainId(id),
		{
			$count: 'count'
		}
	]

	aggregation[0].$match.updated = {
		$gte: subSeconds(new Date(), 30)
	}

	return aggregation

}