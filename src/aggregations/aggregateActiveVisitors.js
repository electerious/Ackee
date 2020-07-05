'use strict'

const { subMilliseconds } = require('date-fns')

const { DURATIONS_LIMIT, DURATIONS_INTERVAL } = require('../constants/durations')
const matchDomains = require('../stages/matchDomains')

module.exports = (ids) => {

	const aggregation = [
		matchDomains(ids),
		{
			$count: 'count'
		}
	]

	aggregation[0].$match.created = { $gte: subMilliseconds(new Date(), DURATIONS_LIMIT) }
	aggregation[0].$match.updated = { $gte: subMilliseconds(new Date(), DURATIONS_INTERVAL * 2) }

	return aggregation

}