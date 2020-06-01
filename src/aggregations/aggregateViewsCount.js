'use strict'

const { startOfDay, startOfMonth, startOfYear } = require('date-fns')

const intervals = require('../constants/intervals')

module.exports = (id, unique, interval) => {

	const aggregation = [
		{
			$match: {
				created: {}
			}
		},
		{
			$count: 'count'
		}
	]

	if (id != null) {
		aggregation[0].$match.domainId = id
	}

	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	if (interval === intervals.INTERVALS_DAILY) {
		aggregation[0].$match.created.$gt = startOfDay(new Date())
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[0].$match.created.$gt = startOfMonth(new Date())
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[0].$match.created.$gt = startOfYear(new Date())
	}

	return aggregation

}