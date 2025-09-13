'use strict'

const constants = require('../constants/durations')
const matchDomains = require('../stages/matchDomains')

module.exports = (ids, dateDetails) => {
	const aggregation = [
		matchDomains(ids),
		{
			$count: 'count',
		},
	]

	// A user that navigates between pages will increase the counter temporary.
	// It's therefore importend to count unique views only.
	aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null,
	}

	// Ignore users that are on the page for too long
	aggregation[0].$match.created = { $gte: dateDetails.lastMilliseconds(constants.DURATIONS_LIMIT) }

	// Ignore users that aren't active anymore
	aggregation[0].$match.updated = { $gte: dateDetails.lastMilliseconds(constants.DURATIONS_INTERVAL * 2) }

	return aggregation
}