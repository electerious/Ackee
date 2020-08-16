'use strict'

const intervals = require('../constants/intervals')
const matchDomains = require('../stages/matchDomains')

module.exports = (ids, unique, interval, limit, dateDetails) => {

	const aggregation = [
		matchDomains(ids),
		{
			$group: {
				_id: {},
				count: {
					$sum: 1
				}
			}
		}
	]


	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	const dateExpression = { date: '$created', timezone: dateDetails.userTimeZone }

	if (interval === intervals.INTERVALS_DAILY) {
		aggregation[0].$match.created = { $gte: dateDetails.includeDays(limit) }
		aggregation[1].$group._id.day = { $dayOfMonth: dateExpression }
		aggregation[1].$group._id.month = { $month: dateExpression }
		aggregation[1].$group._id.year = { $year: dateExpression }
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[0].$match.created = { $gte: dateDetails.includeMonths(limit) }
		aggregation[1].$group._id.month = { $month: dateExpression }
		aggregation[1].$group._id.year = { $year: dateExpression }
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[0].$match.created = { $gte: dateDetails.includeYears(limit) }
		aggregation[1].$group._id.year = { $year: dateExpression }
	}

	return aggregation

}