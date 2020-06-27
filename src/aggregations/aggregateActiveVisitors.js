'use strict'

const { subMilliseconds } = require('date-fns')

const matchDomainId = require('../stages/matchDomainId')
const { DURATIONS_LIMIT, DURATIONS_INTERVAL } = require('../constants/durations')

module.exports = (id) => {

	const aggregation = [
		matchDomainId(id),
		{
			$count: 'count'
		}
	]

	aggregation[0].$match.created = { $gte: subMilliseconds(new Date(), DURATIONS_LIMIT) }
	aggregation[0].$match.updated = { $gte: subMilliseconds(new Date(), DURATIONS_INTERVAL * 2) }

	return aggregation

}