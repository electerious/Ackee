'use strict'

const { subMilliseconds } = require('date-fns')

const { DURATIONS_LIMIT, DURATIONS_INTERVAL } = require('../constants/durations')
const matchDomains = require('../stages/matchDomains')

module.exports = (ids, dateDetails) => {

	const aggregation = [
		matchDomains(ids),
		{
			$count: 'count'
		}
	]

	// Ignore users that are on the page for too long
	aggregation[0].$match.created = { $gte: subMilliseconds(dateDetails.zonedDate, DURATIONS_LIMIT) }

	// Ignore users that aren't active anymore
	aggregation[0].$match.updated = { $gte: subMilliseconds(dateDetails.zonedDate, DURATIONS_INTERVAL * 2) }

	return aggregation

}