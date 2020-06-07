'use strict'

const { subSeconds, subMilliseconds } = require('date-fns')

const matchDomainId = require('../stages/matchDomainId')
const { DURATIONS_LIMIT } = require('../constants/durations')

module.exports = (id) => {

	const aggregation = [
		matchDomainId(id),
		{
			$count: 'count'
		}
	]

	aggregation[0].$match.created = {
		$gte: subMilliseconds(new Date(), DURATIONS_LIMIT)
	}

	aggregation[0].$match.updated = {
		$gte: subSeconds(new Date(), 30)
	}

	return aggregation

}